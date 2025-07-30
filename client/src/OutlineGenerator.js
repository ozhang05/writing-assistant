import { useState, useEffect } from "react";
import TextInput from "./components/TextInput";
import RadioGroup from "./components/RadioGroup";
import './App.css';

export default function OutlineGenerator({promptText}) {
    const [originalText, setOriginalText] = useState("");
    const [context, setContext] = useState("");
    const [fiction, setFiction] = useState(false);
    const [concerns, setConcerns] = useState("");
    const [output, setOutput] = useState("");

    const submitPrompt = async (text) => {
    const promptParts = [
        "Generate a short outline for the following text. Focus on beginning, middle, and end. Make it under 150 words.",
        `Original Text:\n${text}`,
        context && `Context/Goal: ${context}`,
        concerns && `Specific Concerns: ${concerns}`,
    ].filter(Boolean).join("\n\n");

    const res = await fetch("http://localhost:3000/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId: "outline", userInput: promptParts }),
    });

    const data = await res.json();
        setOutput(data.text || "No output returned.");
    }

    const submitButton = async (e) => {
        e.preventDefault();

        submitPrompt(originalText);
    };

    useEffect(() => {
        if (promptText) {
        setOriginalText(promptText);
        console.log("Received promptText:", promptText);
        submitPrompt(promptText);
        }
    }, [promptText]);

    return (
        <main className="container">
        <h1>Outline Generator</h1>

        <form onSubmit={submitButton}>
            <label>Prompt</label>
            <textarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            rows={10}
            cols={80}
            placeholder="Paste your writing here..."
            />

            {/* <RadioGroup
            label="Fiction/Nonfiction"
            name="theme" options={["Fiction", "Nonfiction"]} selected={fiction ? "Fiction" : "Nonfiction"} onChange={setFiction(!fiction)} /> */}

            <TextInput
            label="Additional Context"
            name="context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            />

            <TextInput
            label="Specific Concerns (e.g. Focus on beginning/middle/end)"
            name="concerns"
            value={concerns}
            onChange={(e) => setConcerns(e.target.value)}
            />

            <button type="submit" className="submit-btn">Generate An Outline</button>
        </form>

        {output && (
            <>
            <h2>Revision Output:</h2>
            <pre>{output}</pre>
            </>
        )}
        </main>
    );
}
