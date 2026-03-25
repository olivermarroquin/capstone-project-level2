"use strict";

// console.log("home.js loaded");

const featuredBooksEl = document.getElementById("featuredBooks");
const featuredBooks = store.getFeaturedBooks();
console.log(featuredBooksEl);
console.log(featuredBooks);

function renderBookTitle(book) {
  const heading = document.createElement("h3");
  heading.textContent = book.title;
  return heading;
}

const firstBookTitle = renderBookTitle(featuredBooks[0]);
featuredBooksEl.appendChild(firstBookTitle);
