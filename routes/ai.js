const express = require("express");
const Chat = require("../models/Chat");
const axios = require("axios");
const auth =
  require("../middleware/auth");
const router = express.Router();

router.post("/chat", auth, async (req, res) => {

  try {

    const { message } = req.body;

    console.log("Message:", message);

    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "system",
            content:
              "You are a medical AI assistant.",
          },

          {
            role: "user",
            content: message,
          },
        ],
      },

      {
        headers: {
          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type":
            "application/json",
        },
      }
    );

    const reply =
      response.data.choices[0]
        .message.content;

  await Chat.create({

  user: req.user.id,

  message,

  reply,
});

res.json({
  success: true,
  reply,
});
  } catch (error) {

    console.log(
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "AI Error",
    });
  }
});
router.get("/history", auth,async (req, res) => {

  try {
const chats =
  await Chat.find({
    user: req.user.id,
  })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      chats,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
    });
  }
});

module.exports = router;
