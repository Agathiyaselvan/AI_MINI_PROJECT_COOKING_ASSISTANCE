async function sendMessage() {
    let input = document.getElementById("user-input");
    let message = input.value.trim();

    if (!message) return;

    let chatBox = document.getElementById("chat-box");

    // USER MESSAGE
    let userDiv = document.createElement("div");
    userDiv.className = "message user";
    userDiv.innerText = message;
    chatBox.appendChild(userDiv);

    input.value = "";

    // LOADING
    let loading = document.createElement("div");
    loading.className = "message bot";
    loading.innerText = "Thinking...";
    chatBox.appendChild(loading);

    chatBox.scrollTop = chatBox.scrollHeight;

    // API CALL
    let response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: message })
    });

    let data = await response.json();

    chatBox.removeChild(loading);

    // FORMAT RESPONSE
    let formatted = formatResponse(data.answer);

    let botDiv = document.createElement("div");
    botDiv.className = "message bot";
    botDiv.innerHTML = formatted;

    chatBox.appendChild(botDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}

// FORMAT RESPONSE INTO HEADINGS
function formatResponse(text) {
    let steps = extract(text, "Steps");

    // Convert list → bullets
    if (steps.includes("[") && steps.includes("]")) {
        try {
            let arr = JSON.parse(steps.replace(/'/g, '"'));
            steps = "<ul>" + arr.map(s => `<li>${s}</li>`).join("") + "</ul>";
        } catch {
            steps = steps;
        }
    }

    return `
        <b>Recipe Name:</b><br>${extract(text, "Recipe Name")}<br><br>
        <b>Steps:</b><br>${steps}<br><br>
        <b>Missing Ingredients:</b><br>${extract(text, "Missing Ingredients")}
    `;
}

// SIMPLE EXTRACT FUNCTION
function extract(text, key) {
    let start = text.indexOf(key + ":");
    if (start === -1) return "Not available";

    let sub = text.substring(start + key.length + 1);

    // Stop at next section
    let end = sub.search(/Recipe Name:|Steps:|Missing Ingredients:/);

    if (end !== -1) {
        sub = sub.substring(0, end);
    }

    return sub.trim();
}