"use strict";

// console.log("chat.js loaded");

const outputEl = document.getElementById("output");
const inputAreaEl = document.getElementById("inputArea");
const promptEl = document.getElementById("prompt");
const chatStatusEl = document.getElementById("chatStatus");

// console.log(outputEl);
// console.log(inputAreaEl);
// console.log(promptEl);
// console.log(chatStatusEl);

function renderStatus(message) {
  chatStatusEl.textContent = message;
}

function renderMessage(message, isBot) {
  const p = document.createElement("p");
  if (isBot) {
    p.textContent = `Bot: ${message}`;
  } else {
    p.textContent = `You: ${message}`;
  }
  outputEl.appendChild(p);
}

function handleSubmit(event) {
  event.preventDefault();
  const userQuestion = promptEl.value.trim();
  if (!userQuestion) {
    renderStatus("Please enter a question.");
    return;
  }
  renderMessage(userQuestion, false);
  renderMessage("I can help answer questions about our books.", true);
  promptEl.value = "";
  renderStatus("Message sent.");
}

function main() {
  renderMessage("Hi! Ask me about our books", true);
  inputAreaEl.addEventListener("submit", handleSubmit);
}
