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

async function wakeUp() {
  try {
    // i put this in here to send a lightweight request to the proxy service.
    await fetch("https://proxy-key-yquj.onrender.com");
  } catch (error) {
    console.error("Wake up request failed.");
  }
}

async function getKey() {
  try {
    const url = "https://proxy-key-yquj.onrender.com/get-key";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(url, options);
    // console.log(res);
    if (!res.ok) {
      throw new Error("Could not get API key");
    }
    const data = await res.json();
    // console.log(data);
    // console.log(data.key);
    return data.key;
  } catch (error) {
    throw new Error("Could not get secure API Key");
  }
}
// getKey();

function handleSubmit(event) {
  event.preventDefault();
  const userQuestion = promptEl.value.trim();
  if (!userQuestion) {
    renderStatus("Please enter a question.");
    return;
  }
  renderMessage(userQuestion, false);
  //   renderMessage("I can help answer questions about our books.", true);
  promptEl.value = "";
  renderStatus("Loading...");
}

function main() {
  renderMessage("Hi! Ask me about our books", true);
  inputAreaEl.addEventListener("submit", handleSubmit);

  // practicing my .then() functions to test the getKey() function.
  getKey()
    .then((key) => {
      console.log("API key received: ", key);
    })
    .catch((error) => {
      console.error(error);
      //   });
    });
}

main();
