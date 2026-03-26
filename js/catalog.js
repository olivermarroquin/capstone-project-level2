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

  const author = document.createElement("p");
  author.textContent = `Author: ${book.author}`;

  const genre = document.createElement("p");
  genre.textContent = `Genre: ${book.genre}`;

  const price = document.createElement("p");
  price.textContent = `Price: $${book.price}`;

  const stock = document.createElement("p");
  stock.textContent = `In Stock: ${book.stock}`;

  const description = document.createElement("p");
  description.textContent = book.description;

  article.append(title, author, genre, price, stock, description);
  return article;
}

// const firstBookCard = renderBookCard(books[0]);
// catalogBooksEl.appendChild(firstBookCard);

catalogBooksEl.textContent = "";
books.forEach((book) => {
  const card = renderBookCard(book);
  catalogBooksEl.appendChild(card);
});
