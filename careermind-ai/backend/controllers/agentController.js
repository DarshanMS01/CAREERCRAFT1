const axios = require('axios');

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    
    try {
      const response = await axios.post('https://api.deepseek.com/chat/completions', {
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are CareerMind AI, an expert career advisor for engineering students. Keep responses brief, encouraging, and helpful." },
          { role: "user", content: message }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY || 'sk-mock-key-replace-me'}`,
          'Content-Type': 'application/json'
        }
      });
      
      const reply = response.data.choices[0].message.content;
      return res.json({ reply });
    } catch (apiError) {
      console.error("Deepseek API Error:", apiError?.response?.data || apiError.message);
      // Fallback response if API key is not valid or fails
      const reply = "I'm currently offline (API key required). Let's review some basic notes instead!";
      return res.json({ reply });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Agent failed to respond" });
  }
};
