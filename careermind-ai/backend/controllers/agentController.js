const axios = require('axios');

// ─── Career Advisor System Prompt ────────────────────────────────────────────
const SYSTEM_PROMPT = `You are CareerMind AI, an expert career advisor for engineering students.
You help with:
- Mock technical interviews (DSA, System Design, Web Dev, ML)
- Resume and portfolio review
- Career roadmaps and skill-gap analysis
- Job search strategies and internship tips
- Soft skills and interview confidence

Rules:
- Keep responses concise and structured with bullet points or numbered lists when appropriate
- Be encouraging, professional, and specific
- If asked for a mock interview, start directly with a question
- Use emojis sparingly for warmth`;

// ─── Smart Fallback (no API key needed) ──────────────────────────────────────
const getFallbackResponse = (message) => {
  const msg = message.toLowerCase();
  if (msg.includes('interview') || msg.includes('mock')) {
    return "🎯 Let's do a mock interview! Here's your first question:\n\n**Q: Explain the difference between a stack and a queue. When would you use each?**\n\nTake your time and walk me through your answer!";
  }
  if (msg.includes('resume') || msg.includes('cv')) {
    return "📄 Great question! Key resume tips:\n\n1. **Lead with impact** — use action verbs + numbers (e.g., 'Reduced load time by 40%')\n2. **Tailor for ATS** — include keywords from the job description\n3. **Keep it 1 page** for students/freshers\n4. **Top sections**: Skills → Projects → Experience → Education\n\nWould you like me to review a specific section?";
  }
  if (msg.includes('roadmap') || msg.includes('learn') || msg.includes('skill')) {
    return "🗺️ Recommended roadmap for software engineers:\n\n**Phase 1 (Foundations):** DSA, Git, Linux basics\n**Phase 2 (Core):** Choose a stack (Web/ML/Cloud)\n**Phase 3 (Projects):** Build 2-3 strong portfolio projects\n**Phase 4 (Job Prep):** LeetCode + Mock interviews + Networking\n\nWhich phase are you currently at?";
  }
  if (msg.includes('internship') || msg.includes('job')) {
    return "💼 Internship hunting tips:\n\n1. Apply **early** — most top companies open 4-6 months in advance\n2. Use **LinkedIn, Internshala, Unstop, AngelList**\n3. Cold email — 30% of opportunities come from direct outreach\n4. Build a strong **GitHub profile** with pinned projects\n5. Get referrals — they 10x your chances!\n\nWhat type of role are you targeting?";
  }
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return "👋 Hello! I'm CareerMind AI, your personal career advisor.\n\nI can help you with:\n• 🎯 Mock technical interviews\n• 📄 Resume review and tips\n• 🗺️ Career roadmaps\n• 💼 Internship & job search strategy\n\nWhat would you like to work on today?";
  }
  return "I'm here to help with your career journey! Ask me about:\n\n• Mock interviews (DSA, System Design)\n• Resume tips\n• Career roadmaps\n• Internship strategies\n\nWhat's on your mind?";
};

// ─── Gemini API ───────────────────────────────────────────────────────────────
const callGemini = async (message, history) => {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === 'your-gemini-api-key-here') throw new Error('No Gemini key');

  const contents = [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT + '\n\nUser: ' + (history[0]?.content || message) }] },
    { role: 'model', parts: [{ text: 'Understood! I am CareerMind AI, ready to help.' }] },
    ...history.slice(1).map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }]
    })),
    { role: 'user', parts: [{ text: message }] }
  ];

  const res = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
    { contents },
    { headers: { 'Content-Type': 'application/json' }, timeout: 15000 }
  );

  return res.data.candidates?.[0]?.content?.parts?.[0]?.text;
};

// ─── OpenAI (ChatGPT) API ─────────────────────────────────────────────────────
const callOpenAI = async (message, history) => {
  const key = process.env.OPENAI_API_KEY;
  if (!key || key === 'your-openai-api-key-here') throw new Error('No OpenAI key');

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.map(h => ({ role: h.role === 'assistant' ? 'assistant' : 'user', content: h.content })),
    { role: 'user', content: message }
  ];

  const res = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    { model: 'gpt-3.5-turbo', messages, max_tokens: 600, temperature: 0.75 },
    { headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, timeout: 20000 }
  );

  return res.data.choices?.[0]?.message?.content;
};

// ─── DeepSeek API ─────────────────────────────────────────────────────────────
const callDeepSeek = async (message, history) => {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key || key === 'your-deepseek-api-key-here') throw new Error('No DeepSeek key');

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.map(h => ({ role: h.role === 'assistant' ? 'assistant' : 'user', content: h.content })),
    { role: 'user', content: message }
  ];

  const res = await axios.post(
    'https://api.deepseek.com/chat/completions',
    { model: 'deepseek-chat', messages, max_tokens: 600, temperature: 0.75 },
    { headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, timeout: 20000 }
  );

  return res.data.choices?.[0]?.message?.content;
};

// ─── Groq API ─────────────────────────────────────────────────────────────
const callGroq = async (message, history) => {
  const key = process.env.GROQ_API_KEY;
  if (!key || key === 'your-groq-api-key-here') throw new Error('No Groq key');

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.map(h => ({ role: h.role === 'assistant' ? 'assistant' : 'user', content: h.content })),
    { role: 'user', content: message }
  ];

  const res = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    { model: 'llama-3.3-70b-versatile', messages, max_tokens: 1024, temperature: 0.7 },
    { headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, timeout: 20000 }
  );

  return res.data.choices?.[0]?.message?.content;
};

// ─── Main chat handler ────────────────────────────────────────────────────────
exports.chat = async (req, res) => {
  try {
    const { message, history = [], provider = 'auto' } = req.body;

    // Try the selected provider first, then cascade through others
    const providerOrder = provider === 'auto'
      ? ['groq', 'gemini', 'openai', 'deepseek']
      : [provider, ...['groq', 'gemini', 'openai', 'deepseek'].filter(p => p !== provider)];

    for (const p of providerOrder) {
      try {
        let reply;
        if (p === 'groq')     reply = await callGroq(message, history);
        if (p === 'gemini')   reply = await callGemini(message, history);
        if (p === 'openai')   reply = await callOpenAI(message, history);
        if (p === 'deepseek') reply = await callDeepSeek(message, history);

        if (reply) return res.json({ reply, source: p });
      } catch (err) {
        console.warn(`[${p}] failed:`, err.message);
      }
    }

    // All APIs failed — use smart fallback
    return res.json({ reply: getFallbackResponse(message), source: 'fallback' });
  } catch (error) {
    console.error('Agent error:', error);
    res.status(500).json({ error: 'Agent failed to respond' });
  }
};

// ─── Check which providers are configured ────────────────────────────────────
exports.getProviders = (req, res) => {
  res.json({
    gemini:   !!(process.env.GEMINI_API_KEY   && process.env.GEMINI_API_KEY   !== 'your-gemini-api-key-here'),
    openai:   !!(process.env.OPENAI_API_KEY   && process.env.OPENAI_API_KEY   !== 'your-openai-api-key-here'),
    deepseek: !!(process.env.DEEPSEEK_API_KEY && process.env.DEEPSEEK_API_KEY !== 'your-deepseek-api-key-here'),
    groq:     !!(process.env.GROQ_API_KEY     && process.env.GROQ_API_KEY     !== 'your-groq-api-key-here'),
  });
};
