const socket = io();

const usernameInput = document.getElementById("username");
const joinBtn = document.getElementById("join-btn");
const chatContainer = document.getElementById("chat-container");
const messages = document.getElementById("messages");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

joinBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();

  if (username) {
    socket.emit("join", username);
    chatContainer.style.display = "block";
    usernameInput.disabled = true;
    joinBtn.disabled = true;
  }
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = messageInput.value.trim();

  if (message) {
    const data = {
      username: usernameInput.value.trim(),
      message: message,
    };
    socket.emit("message", data);
    messageInput.value = "";
  }
});

socket.on("user joined", (username) => {
  const message = document.createElement("div");
  message.innerText = username + " joined the chat";
  messages.appendChild(message);
});
socket.on("user joined", (username) => {
  const messageJoined = document.createElement("div");
  message.innerText = username + " joined the chat";
  messages.appendChild(messageJoined);
});

socket.on("message", (data) => {
  const message = document.createElement("div");
  message.innerHTML =
    "<strong style='color:green; padding:10px;'>" +
    data.username +
    ":</strong>  " +
    " " +
    data.message;
  messages.appendChild(message);
});
