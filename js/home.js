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
  // I used createElement and textContent to safely construct DOM elements and avoid potential injection issues. It also makes the structure clearer and easier to debug compared to inserting HTML strings.
  const article = document.createElement("article");
  article.className =
    "bg-white rounded-xl shadow-xl p-4 hover:shadow-2xl transition";

  const title = document.createElement("h3");
  title.textContent = book.title;
  title.className = "text-sm text-gray-600";

  const author = document.createElement("p");
  author.textContent = `Author: ${book.author}`;
  author.className = "text-sm text-gray-600";

  const genre = document.createElement("p");
  genre.textContent = `Genre: ${book.genre}`;
  genre.className = "text-sm text-gray-600";

  const price = document.createElement("p");
  price.textContent = `Price: $${book.price}`;
  price.className = "text-sm text-gray-800 font-medium";

  const stock = document.createElement("p");
  stock.textContent = `In Stock: ${book.stock}`;
  stock.className = "text-sm text-gray-500";

  const description = document.createElement("p");
  description.textContent = book.description;
  description.className = "text-sm mt-2";

  // I used .append() because I can add multiple elements at once instead of multiple appendChild()'s
  article.append(title, author, genre, price, stock, description);

  return article;
}

function renderFeaturedBooks() {
  // const firstBookCard = renderBookCard(featuredBooks[0]);
  // featuredBooksEl.appendChild(firstBookCard);
  featuredBooksEl.textContent = "";

  featuredBooks.forEach((book) => {
    const card = renderBookCard(book);
    featuredBooksEl.appendChild(card);
  });
}

function main() {
  renderFeaturedBooks();
}
main();

// Practicing my render functions:
// function renderBookTitles(books, container) {
//   container.textContent = "";
//   books.forEach((book) => {
//     const p = document.createElement("p");
//     p.textContent = book.title;
//     container.appendChild(p);
//   });
// }

// const featuredBooksContainer = document.getElementById("featuredBooks");
// const books = store.getFeaturedBooks();

// renderBookTitles(books, featuredBooksContainer);
