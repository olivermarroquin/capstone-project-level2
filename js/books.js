"use strict";

// this is the shared file that all my other pages will use. It will define the data (class and book data)

class BookStore {
  constructor() {
    this.books = [];
  }
}

// this is what my app will use later... 'store'
const store = new BookStore();
console.log(store);
