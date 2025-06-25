async function callGemini(prompt) {
    console.log("calling backend");

    const res = await fetch("/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    return data.text ?? "(No reply)";
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