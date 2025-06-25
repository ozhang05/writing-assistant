require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/gemini', async (req, res) => {
    const prompt = req.body.prompt;
    if (!prompt) return res.status(400).send( "Bad prompt" );

    const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
        {
        contents: [{ parts: [{ text: prompt }] }]
        },
        {
        headers: { "Content-Type": "application/json" }
        }
    );

    console.log(JSON.stringify(response.data));

    const candidates = response.data?.candidates;
    const first = candidates?.[0];
    const content = first?.content;
    const parts = content?.parts;
    const firstPart = parts?.[0];
    const text = firstPart?.text;

    res.json({ text });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});