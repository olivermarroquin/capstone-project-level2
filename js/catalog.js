"use strict";

// console.log("catalog.js loaded");

const catalogBooksEl = document.getElementById("catalogBooks");
// console.log(catalogBooksEl);

const books = store.getAllBooks();
// console.log(books);

function renderBookCard(book) {
  const article = document.createElement("article");
  const title = document.createElement("h3");
  title.textContent = book.title;
  article.append(title);
  return article;
}

const firstBookCard = renderBookCard(books[0]);
catalogBooksEl.appendChild(firstBookCard);
