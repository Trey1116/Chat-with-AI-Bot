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
        // Make API call to Grok API
        const response = await fetch("https://api.xai.com/v1/grok", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "grok-beta",
                prompt: userMessage,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(`Error: ${errorData.error.message}`);
            return;
        }

        const data = await response.json();
        const botReply = data.reply; // Assuming the response has a 'reply' field

        // Display bot's response
        const botPara = document.createElement("p");
        botPara.classList.add("bot");
        botPara.textContent = `Bot: ${botReply}`;
        chatWindow.appendChild(botPara);

        chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to latest message
    } catch (error) {
        alert("Error communicating with the bot. Check your network or API key.");
        console.error(error);
    }

    document.getElementById("userMessage").value = ""; // Clear input field
});
