require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/gemini', async (req, res) => {
    const formId = req.body.formId;
    const userInput = req.body.userInput;
    if (!formId) return res.status(400).send("Bad form")
    if (!userInput) return res.status(400).send("Bad prompt");

    switch (formId) {
        case "prompt":
            // handle prompt
            console.log("prompt form")
            break;
        case "outline":
            // handle outline
            console.log("outline form")
            break;
        case "revision":
            // handle revision
            console.log("revision form")
            break;
        default:
            return res.status(400).send("Bad formID");
    }

    const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
        {
        contents: [{ parts: [{ text: userInput }] }]
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