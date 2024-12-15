document.getElementById("sendButton").addEventListener("click", async () => {
    const apiKey = document.getElementById("apiKey").value;
    const userMessage = document.getElementById("userMessage").value;

    if (!apiKey) {
        alert("Please enter an API key.");
        return;
    }

    if (!userMessage) {
        alert("Please enter a message.");
        return;
    }

    // Display user's message
    const chatWindow = document.getElementById("chatWindow");
    const userPara = document.createElement("p");
    userPara.classList.add("user");
    userPara.textContent = `You: ${userMessage}`;
    chatWindow.appendChild(userPara);

    try {
        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ apiKey, message: userMessage }),
        });
        const data = await response.json();

        // Display bot's response
        const botPara = document.createElement("p");
        botPara.classList.add("bot");
        botPara.textContent = `Bot: ${data.reply}`;
        chatWindow.appendChild(botPara);

        chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to latest message
    } catch (error) {
        alert("Error communicating with the bot.");
    }

    document.getElementById("userMessage").value = ""; // Clear input field
});
