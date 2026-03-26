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

async function callAI(userQuestion, key) {
  const proxyURL = "https://corsproxy.io/?url=";
  const workersEndpoint =
    "https://api.cloudflare.com/client/v4/accounts/83cf2c15a58cddcc9466f6057963dbf9/ai/run/@cf/meta/llama-3-8b-instruct";
  const url = proxyURL + workersEndpoint;
  //to give context to my AI about my books in inventory.
  const inventoryText = store
    .getAllBooks()
    .map((book) => {
      return `${book.title} by ${book.author}. Genre: ${book.genre}. Price: $${book.price}. Stock: ${book.stock}. Description: ${book.description}`;
    })
    .join(" ");
  const promptBody = {
    messages: [
      {
        role: "system",
        content:
          "You are a bookstore assistant for Next Chapter Books. Only answer questions about the books in the provided inventory. If the answer is not in the inventory, say that you can only answer questions about the books currently in stock. Keep answers short, clear and helpful.",
      },
      {
        role: "user",
        content: `Inventory: ${inventoryText} Customer question: ${userQuestion}`,
      },
    ],
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(promptBody),
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Could not get AI response: ${errorText}`);
  }
  const data = await res.json();
  return data?.result?.response || "I could not find an answer";
}

//need to change this function to async since it is now calling AI and is not just local.
async function handleSubmit(event) {
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

  try {
    await wakeUp();
    const key = await getKey();
    const aiResponse = await callAI(userQuestion, key);
    renderMessage(aiResponse, true);
    renderStatus("Success");
  } catch (error) {
    console.error(error);
    renderMessage(
      "Sorry, the chatbot is unavailable right now. Please try again.",
      true,
    );
    renderStatus("Error: Could not load chatbot response.");
  }
}

function main() {
  renderMessage(
    "Hi! Ask me about our books, authors, genres, prices, or recommendations.",
    true,
  );
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
