import { useState } from "react";
import TextInput from "./components/TextInput";
import './App.css';

export default function RevisionAssistant() {
  const [originalText, setOriginalText] = useState("");
  const [context, setContext] = useState("");
  const [concerns, setConcerns] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const promptParts = [
        `Provide constructive feedback on the following text. Focus on specific, actionable suggestions the writer can use to revise it themselves.`,
        `Original Text:\n${originalText}`,
        context && `Context/Goal: ${context}`,
        concerns && `Specific Concerns: ${concerns}`,
    ].filter(Boolean).join("\n\n");

    const res = await fetch("http://localhost:3000/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formId: "revision", userInput: promptParts }),
    });

    const data = await res.json();
    setOutput(data.text || "No output returned.");
  };

  return (
    <main className="container">
      <h1>Writing Revision Assistant</h1>

      <form onSubmit={handleSubmit}>
        <label>Original Writing</label>
        <textarea
          value={originalText}
          onChange={(e) => setOriginalText(e.target.value)}
          rows={10}
          cols={80}
          placeholder="Paste your writing here..."
        />

        <TextInput
          label="Context/Goal of the Writing"
          name="context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />

        <TextInput
          label="Specific Concerns (e.g., tone, clarity, structure)"
          name="concerns"
          value={concerns}
          onChange={(e) => setConcerns(e.target.value)}
        />

        <button type="submit" className="submit-btn">Revise My Writing</button>
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
