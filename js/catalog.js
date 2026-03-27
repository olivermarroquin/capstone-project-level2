"use strict";

// console.log("catalog.js loaded");

const catalogBooksEl = document.getElementById("catalogBooks");
// console.log(catalogBooksEl);
const filterFormEl = document.getElementById("filterForm");
const genreSelectEl = document.getElementById("genreSelect");
const catalogStatusEl = document.getElementById("catalogStatus");
const searchInputEl = document.getElementById("searchInput");
const books = store.getAllBooks();
// console.log(books);

function renderStatus(message) {
  catalogStatusEl.textContent = message;
}

function renderBookCard(book) {
  const article = document.createElement("article");
  article.className =
    "bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition";

  const title = document.createElement("h3");
  title.textContent = book.title;
  title.className = "text-lg font-semibold mb-2";

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

  article.append(title, author, genre, price, stock, description);
  return article;
}

// const firstBookCard = renderBookCard(books[0]);
// catalogBooksEl.appendChild(firstBookCard);

function renderBooks(bookList) {
  catalogBooksEl.textContent = "";

  if (!bookList.length === 0) {
    renderStatus("No books found.");
    return;
  }

  renderStatus(`Showing ${bookList.length} book(s).`);

  bookList.forEach((book) => {
    const card = renderBookCard(book);
    catalogBooksEl.appendChild(card);
  });
}

function getFilteredBooks() {
  const selectedGenre = genreSelectEl.value;
  //   return store.filterByGenre(selectedGenre);
  const searchValue = searchInputEl.value.trim().toLowerCase();
  //i want to get filtered books first and then filter down further by the searchValue
  let filteredBooks = store.filterByGenre(selectedGenre);

  //filter again by the searchValue in the searchInput
  if (searchValue) {
    filteredBooks = filteredBooks.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchValue) ||
        book.author.toLowerCase().includes(searchValue)
      );
    });
  }
  return filteredBooks;
}

function handleFilter(event) {
  event.preventDefault();
  const filteredBooks = getFilteredBooks();
  renderBooks(filteredBooks);
}

function main() {
  renderBooks(books);
  filterFormEl.addEventListener("submit", handleFilter);
}

main();
