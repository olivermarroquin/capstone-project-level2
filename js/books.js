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
    ];
  }
}

// this is what my app will use later... 'store'
const store = new BookStore();
console.log(store);
