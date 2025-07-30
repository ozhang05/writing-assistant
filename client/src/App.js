import { useState } from "react";
import './App.css';
import PromptGenerator from "./PromptGenerator";
import RevisionAssistant from "./RevisionAssistant";
import OutlineGenerator from "./OutlineGenerator";

export default function App() {
  const [displayObject, setDisplayObject] = useState('prompt')
  const [promptText, setPromptText] = useState('')

  let content;
  if (displayObject === 'prompt') {
    content = <PromptGenerator setDisplayObject={setDisplayObject} setPromptText={setPromptText}/>;
  } else if (displayObject === 'revision') {
    content = <RevisionAssistant />;
  } else if (displayObject === 'outline') {
    content = <OutlineGenerator promptText={promptText}/>;
  }

  return (
  <main className="container">
    {/* {
      displayObject != 'prompt' && 
      <button onClick={() => setDisplayObject('prompt')} className="toggle-btn">
        {"Go to Prompt Generator"}
      </button>
    }
    {
      displayObject != 'revision' && 
      <button onClick={() => setDisplayObject('revision')} className="toggle-btn">
        {"Go to Revision Assistant"}
      </button>
    }
    {
      displayObject != 'outline' && 
      <button onClick={() => setDisplayObject('outline')} className="toggle-btn">
        {"Go to Outline Generator"}
      </button>
    } */}
    
    <button onClick={() => setDisplayObject('prompt')} className="toggle-btn">
      {"Prompt Generator"}
    </button>
    <button onClick={() => setDisplayObject('revision')} className="toggle-btn">
      {"Revision Assistant"}
    </button>
    <button onClick={() => setDisplayObject('outline')} className="toggle-btn">
      {"Outline Generator"}
    </button>

    <div className="main-content">
      {content}
    </div>
  </main>
);
}
