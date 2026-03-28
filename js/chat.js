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
    p.className =
      "max-w-[75%] mr-auto bg-gray-200 text-black px-3 py-2 rounded-lg mb-2 shadow-lg hover:shadow-2xl";
  } else {
    p.textContent = `You: ${message}`;
    //outputEl.querySelector("p");
    p.className =
      "max-w-[75%] ml-auto bg-blue-600 text-white px-3 py-2 rounded-lg mb-2 shadow-lg hover:shadow-2xl";
  }
  outputEl.appendChild(p);

  outputEl.scrollTop = outputEl.scrollHeight;
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
// getKey(); -- moved the getKey() test to the main function.

async function callAI(userQuestion, key) {
  const proxyURL = "https://corsproxy.io/?url=";
  const workersEndpoint =
    "https://api.cloudflare.com/client/v4/accounts/83cf2c15a58cddcc9466f6057963dbf9/ai/run/@cf/meta/llama-3-8b-instruct";
  const url = proxyURL + workersEndpoint;
  //to give context to my AI about my books in inventory since the AI cannot read JS array of objects but can read strings. I used a map so that I could loop through each book and transform it.
  const inventoryText = store
    .getAllBooks()
    .map((book) => {
      return `${book.title} by ${book.author}. Genre: ${book.genre}. Price: $${book.price}. Stock: ${book.stock}. Description: ${book.description}`;
    })
    .join(" "); // takes my array of single book information/interpolations and combines it into one string with a space separating them.
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
  console.log(data);
  //   return data.result.response;
  return data?.result?.response || "I could not find an answer"; //i used optional chaining, so that it would return undefined instead of crashing if 'result' does not exist. and || to say if left side is undefined, then use this fallback message.
}

//need to change this function to async since it is now calling AI and is not just local.
async function handleSubmit(event) {
  event.preventDefault();
  const userQuestion = promptEl.value.trim(); //I remove any deadspaces so that if spaces were entered in the input field, it would make it empty and say: Please enter a question.
  if (!userQuestion) {
    renderStatus("Please enter a question.");
    chatStatusEl.classList.add("text-red-600");
    return;
  }
  renderMessage(userQuestion, false);
  //   renderMessage("I can help answer questions about our books.", true);
  promptEl.value = "";
  chatStatusEl.classList.remove("text-red-600");
  chatStatusEl.classList.remove("text-green-600");
  chatStatusEl.classList.add("text-black-600");
  renderStatus("Loading...");

  try {
    await wakeUp();
    const key = await getKey();
    const aiResponse = await callAI(userQuestion, key);
    renderMessage(aiResponse, true);
    renderStatus("Success!");
    chatStatusEl.classList.add("text-green-600");
  } catch (error) {
    console.error(error);
    renderMessage(
      "Sorry, the chatbot is unavailable right now. Please try again.",
      true,
    );
    renderStatus("Error: Could not load chatbot response.");
    chatStatusEl.classList.remove("text-green-600");
    chatStatusEl.classList.add("text-red-600");
  }
}

async function main() {
  renderMessage(
    "Hi! Ask me about our books, authors, genres, prices, or recommendations....",
    true,
  );
  inputAreaEl.addEventListener("submit", handleSubmit);

  // practicing my promise based syntax .then() functions to test the getKey() function. .then() runs when promise succeeds.
  getKey()
    .then((key) => {
      console.log("API key received: ", key);
    })
    .catch((error) => {
      console.error(error);
      //   });
    });

  // try {
  //   const key = await getKey();
  //   console.log(key);
  // } catch (error) {
  //   console.error(error);
  // }
}

main();
