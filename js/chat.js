"use strict";

// console.log("chat.js loaded");

const outputEl = document.getElementById("output");
const inputAreaEl = document.getElementById("inputArea");
const promptEl = document.getElementById("prompt");
const chatStatusEl = document.getElementById("chatStatus");

console.log(outputEl);
console.log(inputAreaEl);
console.log(promptEl);
console.log(chatStatusEl);

function renderMessage(message, isBot) {
  const p = document.createElement("p");
  if (isBot) {
    p.textContent = `Bot: ${message}`;
  } else {
    p.textContent = `You: ${message}`;
  }
  outputEl.appendChild(p);
}
renderMessage("Hi! Ask me about our books", true);

function handleSubmit(event) {
  event.preventDefault();
  const userQuestion = promptEl.value.trim();
  if (!userQuestion) {
    chatStatusEl.textContent = "Please Enter a Question.";
    return;
  }
  renderMessage(userQuestion, false);
  promptEl.value = "";
  chatStatusEl.textContent = "Message sent.";
}
