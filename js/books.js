"use strict";

// this is the shared file that all my other pages will use. It will define the data (class and book data)

class BookStore {
  constructor() {
    this.books = [
      {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self-help",
        price: 18.99,
        stock: 4,
        description:
          "A practical guide to building good habits and breaking bad ones.",
      },
      {
        id: 2,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        price: 14.99,
        stock: 6,
        description:
          "A fantasy adventure about Bilbo Baggins and a journey to the lonely mountain.",
      },
      {
        id: 3,
        title: "Deep Work",
        author: "Cal Newport",
        genre: "Productivity",
        price: 16.99,
        stock: 3,
        description: "A book about forcused success in a distracted world.",
      },
      {
        id: 4,
        title: "Dune",
        author: "Frank Herbert",
        genre: "Science Fiction",
        price: 19.99,
        stock: 5,
        description:
          "A science fiction novel about power, survival, and destiny on the desert planet Arrakis.",
      },
      {
        id: 5,
        title: "Pride and Prejudice",
        author: "Jave Austen",
        genre: "Classic",
        price: 12.99,
        stock: 2,
        description:
          "A classic novel about love, class, and social expectations.",
      },
      {
        id: 6,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        genre: "Thriller",
        price: 15.99,
        stock: 4,
        description:
          "A psychological thriller about a woman who stops speaking after a violent crime.",
      },
    ];
  }

  getAllBooks() {
    return this.books;
  }
}

// this is what my app will use later... 'store'
const store = new BookStore();
// console.log(store.books);

console.log(store.getAllBooks());
