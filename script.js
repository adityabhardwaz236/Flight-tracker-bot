let chatHistory = [];

async function sendMessage() {
    const userInput = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    if (userInput.value.trim() === "") return;

    // Add user message to chat history
    const userMessage = { user: userInput.value, bot: "" };
    chatHistory.push(userMessage);

    // Display user message
    const userDiv = document.createElement("div");
    userDiv.className = "message user";
    userDiv.innerHTML = `<strong>You:</strong> ${userInput.value}`;
    chatBox.appendChild(userDiv);

    // Fetch response from server
    const response = await fetch("/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userInput.value, chatHistory })
    });

    const data = await response.json();

    // Store bot response in chat history
    userMessage.bot = data.bot;

    // Display bot's response with formatting
    const botDiv = document.createElement("div");
    botDiv.className = "message bot";
    botDiv.innerHTML = `<strong>Bot:</strong> ${data.bot.replace(/\n/g, "<br>")}`;
    chatBox.appendChild(botDiv);

    // Scroll to latest message
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear input field
    userInput.value = "";
}
