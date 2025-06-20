async function callGemini(prompt) {
    console.log("calling gemini")

    apiKey="AIzaSyCyR0I283Ydl9LT2O8s3ROxfFw-bg-plKY"

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "(No reply)";
}


document.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("output");

    function setupForm(formId, inputId) {
        console.log("setting up form", formId, inputId)
        const form = document.getElementById(formId);
        const input = document.getElementById(inputId);

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const prompt = input.value.trim();
            if (prompt) {
                output.textContent = "Loading...";
                const result = await callGemini(prompt);
                output.textContent = result;
            }
        });
    }

    setupForm("prompt", "promptInput");
    setupForm("outline", "outlineInput");
    setupForm("revision", "revisionInput");
});