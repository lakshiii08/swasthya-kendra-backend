const fetch = require("node-fetch");

const medicalChat = async (req, res) => {

  try {

    const { message } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are a medical AI assistant.
Give short and useful healthcare advice.

User symptoms:
${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data =
      await response.json();

    console.log(
      JSON.stringify(data, null, 2)
    );

    const reply =
      data.candidates?.[0]
        ?.content?.parts?.[0]?.text;

    res.json({
      success: true,
      reply:
        reply || "No AI response",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  medicalChat,
};