"use strict";

// console.log("home.js loaded");

const featuredBooksEl = document.getElementById("featuredBooks");
const featuredBooks = store.getFeaturedBooks();
// console.log(featuredBooksEl);
// console.log(featuredBooks);

// function renderBookTitle(book) {
//   const heading = document.createElement("h3");
//   heading.textContent = book.title;
//   return heading;
// }

// const firstBookTitle = renderBookTitle(featuredBooks[0]);
// featuredBooksEl.appendChild(firstBookTitle);

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

// const firstBookCard = renderBookCard(featuredBooks[0]);
featuredBooksEl.textContent = "";

featuredBooks.forEach((book) => {
  const card = renderBookCard(book);
  featuredBooksEl.appendChild(card);
});

featuredBooksEl.appendChild(firstBookCard);
