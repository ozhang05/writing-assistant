import { useState } from "react";
import TextInput from "./components/TextInput";
import SelectInput from "./components/SelectInput";
import CheckboxGroup from "./components/CheckboxGroup";
import RadioGroup from "./components/RadioGroup";
import './App.css';
import RevisionAssistant from "./RevisionAssistant";

const WRITING_TYPE = ["essay", "poem", "short story", "Other"];
const PURPOSE_TONE = ["informative", "humor", "persuasion", "uplifting", "Other"]
const THEMES = ["self-identity", "climate change", "technology", "grief", "love", "Other"];
const POV_OPTIONS = ["1st", "2nd", "3rd", "Other"];

export default function App() {
const [formData, setFormData] = useState({
  writingType: "",
  writingTypeOther: "",
  purpose: "",
  purposeOther: "",
  audience: "",
  theme: [],
  themeOther: "",
  pointOfView: "",
  pointOfViewOther: "",
  thirdPersonStyle: "",
  wordCount: "",
  setting: "",
  characterPerspective: "",
  specificConsiderations: "",
  revisionGuidance: [],
});


  const [output, setOutput] = useState("");
  const [showRevisionAssistant, setShowRevisionAssistant] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      if (type === "checkbox") {
        const list = prev[name];
        return {
          ...prev,
          [name]: checked
            ? [...list, value]
            : list.filter((item) => item !== value),
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promptParts = [
      `Generate a writing prompt based off the following inputs. Return the prompt only, under 100 words.`,
      `Writing Type: ${formData.writingType}`,
      `Purpose/Tone: ${formData.purpose}`,
      `Audience: ${formData.audience}`,
      `Themes: ${formData.theme.join(", ")}`,
      `Point of View: ${formData.pointOfView}`,
      formData.pointOfView === "3rd" ? `Third-Person Style: ${formData.thirdPersonStyle}` : null,
      `Length Constraint: ${formData.lengthConstraint} ${formData.wordCount}`,
      `Setting/Context: ${formData.setting}`,
      `Character Perspective: ${formData.characterPerspective}`,
      `Specific Considerations: ${formData.specificConsiderations}`,
    ].filter(Boolean).join("\n");

    const res = await fetch("http://localhost:3000/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formId: "prompt", userInput: promptParts }),
    });

    const data = await res.json();
    setOutput(data.text || "No output returned.");
  };

  return (
    <main className="container">
      <button
        onClick={() => setShowRevisionAssistant((prev) => !prev)}
        className="toggle-btn"
        style={{ marginBottom: '1rem' }}
      >
        {showRevisionAssistant ? "Go to Prompt Generator" : "Go to Revision Assistant"}
      </button>

      {showRevisionAssistant ? (
        <RevisionAssistant />
      ) : (
        <>
          <h1>Writing Assistant</h1>

          <form onSubmit={handleSubmit}>
            <SelectInput label="Writing Type" name="writingType" options={WRITING_TYPE} onChange={handleChange} />
            {formData.writingType === "Other" && (
              <TextInput label="Insert text here" name="writingTypeOther" value={formData.writingTypeOther} onChange={handleChange} />
            )}
            <SelectInput label="Purpose/Tone" name="purpose" options={["informative", "humor", "persuasion", "uplifting", "Other"]} value={formData.purpose} onChange={handleChange} />
            {formData.purpose === "Other" && (
              <TextInput label="Specify Purpose/Tone" name="purposeOther" value={formData.purposeOther} onChange={handleChange} />
            )}

            <TextInput label="Audience" name="audience" value={formData.audience} onChange={handleChange} />
            <CheckboxGroup label="Theme/Topics" name="theme" options={THEMES} selected={formData.theme} onChange={handleChange} />
            {formData.theme.includes("Other") && (
              <TextInput label="Specify Theme" name="themeOther" value={formData.themeOther} onChange={handleChange} />
            )}
            {formData.lengthConstraint !== "freeform" && (
              <TextInput label="Words/Characters" name="wordCount" value={formData.wordCount} onChange={handleChange} />
            )}
            <TextInput label="Setting/Context" name="setting" value={formData.setting} onChange={handleChange} />
            <TextInput label="Character Perspective" name="characterPerspective" value={formData.characterPerspective} onChange={handleChange} />
            <TextInput label="Specific Considerations" name="specificConsiderations" value={formData.specificConsiderations} onChange={handleChange} />

            <button type="submit" className="submit-btn">Generate Prompt</button>
          </form>

          <h2>Output:</h2>
          <pre>{output}</pre>
        </>
      )}
    </main>
  );
}
