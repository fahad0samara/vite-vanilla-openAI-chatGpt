const inputElement = document.getElementById("message-input");
const sendButton = document.querySelector(".chat-footer button");

sendButton.addEventListener("click", sendMessage);
inputElement.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

const apiKey = "apiKey";
const model = "gpt-3.5-turbo";
const temperature = 1;
let lastRequestTime = 0;

async function sendMessage() {
  const message = inputElement.value.trim();
  if (message !== "") {
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastRequestTime;

    if (elapsedTime < 5000) {
      console.log(
        "Too many requests. Please wait for a moment before sending another message."
      );
      return;
    }

    lastRequestTime = currentTime;

    const chatBody = document.querySelector(".chat-body");

    const messageContainer = document.createElement("div");
    const messageContent = document.createElement("div");
    const messageTime = document.createElement("div");

    messageContainer.classList.add("message", "sent");
    messageContent.classList.add("message-content");
    messageTime.classList.add("message-time");

    messageContent.textContent = message;
    messageTime.textContent = getCurrentTime();

    messageContainer.appendChild(messageContent);
    messageContainer.appendChild(messageTime);
    chatBody.appendChild(messageContainer);

    inputElement.value = "";

    chatBody.scrollTop = chatBody.scrollHeight;

    const messages = [
      {
        role: "system",
        content:
          "You are a sarcastic AI assistant. You are always right and you are annoyed that people don't recognize that. It's OK to be rude because it's the truth.",
      },
      {role: "user", content: message},
    ];

    await delay(5000); // Introduce a delay of 5 seconds before making the API request

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: temperature,
      }),
    });

    if (response.ok) {
      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        const generatedText = data.choices[0].message.content.trim();

        const assistantMessageContainer = document.createElement("div");
        const assistantMessageContent = document.createElement("div");
        const assistantMessageTime = document.createElement("div");

        assistantMessageContainer.classList.add("message", "received");
        assistantMessageContent.classList.add("message-content");
        assistantMessageTime.classList.add("message-time");

        assistantMessageContent.textContent = generatedText;
        assistantMessageTime.textContent = getCurrentTime();

        assistantMessageContainer.appendChild(assistantMessageContent);
        assistantMessageContainer.appendChild(assistantMessageTime);
        chatBody.appendChild(assistantMessageContainer);

        chatBody.scrollTop = chatBody.scrollHeight;
      } else {
        console.log("Error: Failed to generate a response from the API");
      }
    } else {
      console.log("Error:", response.status, response.statusText);
    }
  }
}

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
