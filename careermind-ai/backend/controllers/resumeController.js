const axios = require('axios');

const callGroq = async (prompt) => {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error('No Groq key');

  const messages = [
    { role: 'system', content: 'You are an expert resume writer and career coach. Return ONLY the enhanced text. Do not include introductory or concluding remarks. Format cleanly. For summaries, keep it under 3 sentences. For projects, return 3 punchy bullet points.' },
    { role: 'user', content: prompt }
  ];

  const res = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    { model: 'llama-3.3-70b-versatile', messages, max_tokens: 500, temperature: 0.7 },
    { headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, timeout: 20000 }
  );

  return res.data.choices?.[0]?.message?.content?.trim();
};

exports.enhanceText = async (req, res) => {
  try {
    const { type, text, additionalData } = req.body;
    let prompt = '';

    if (type === 'summary') {
      prompt = `Write a professional resume summary based on this data: ${text}. Role: ${additionalData?.role || 'Software Engineer'}. Keep it concise, professional, and impactful (max 3 sentences).`;
    } else if (type === 'project') {
      prompt = `Improve this project description into 3 professional, impact-driven resume bullet points: ${text}. Use strong action verbs. Format as a bulleted list.`;
    } else if (type === 'skills') {
      prompt = `Based on the role "${text}", suggest 10 relevant technical and soft skills as a comma-separated list.`;
    } else {
      return res.status(400).json({ msg: 'Invalid enhancement type' });
    }

    const enhancedText = await callGroq(prompt);
    res.json({ enhancedText });
  } catch (error) {
    console.error('Resume AI Enhancement Error:', error.message);
    res.status(500).json({ error: 'Failed to enhance text using AI.' });
  }
};

exports.parseText = async (req, res) => {
  try {
    const { rawText, targetCompany } = req.body;
    const key = process.env.GROQ_API_KEY;
    if (!key) throw new Error('No Groq key');

    const prompt = `You are an expert AI Resume Builder. Parse the following user details and output a JSON object representing a resume tailored for a ${targetCompany || 'general'} company.
    
    The JSON MUST EXACTLY match this structure:
    {
      "personal": { "fullName": "", "email": "", "phone": "", "location": "", "linkedin": "", "github": "" },
      "summary": "Write a strong 3-sentence summary tailored for ${targetCompany || 'a tech role'}",
      "education": [{ "id": 1, "degree": "", "college": "", "year": "", "cgpa": "" }],
      "skills": { "technical": "", "soft": "" },
      "experience": [{ "id": 1, "company": "", "role": "", "duration": "", "responsibilities": "3 punchy bullet points" }],
      "projects": [{ "id": 1, "title": "", "description": "3 punchy bullet points", "technologies": "", "link": "" }]
    }

    Raw User Details:
    ${rawText}

    Return ONLY valid JSON. No markdown, no intro/outro text. Make sure to generate strong summary and descriptions based on the input.`;

    const messages = [
      { role: 'system', content: 'You are a strict JSON-only API. You must return only valid JSON matching the requested structure. Ensure the tone is highly professional and ATS-friendly.' },
      { role: 'user', content: prompt }
    ];

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      { model: 'llama-3.3-70b-versatile', messages, max_tokens: 1500, temperature: 0.5 },
      { headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, timeout: 30000 }
    );

    let content = response.data.choices?.[0]?.message?.content?.trim() || "{}";
    
    // Clean up if the AI accidentally wrapped in markdown
    if (content.startsWith('```json')) content = content.substring(7);
    if (content.endsWith('```')) content = content.substring(0, content.length - 3);
    
    const parsedData = JSON.parse(content);
    res.json({ parsedData });
  } catch (error) {
    console.error('Resume AI Parsing Error:', error.message);
    res.status(500).json({ error: 'Failed to parse text using AI.' });
  }
};
