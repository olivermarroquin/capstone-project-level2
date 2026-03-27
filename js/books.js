"use strict";

// this is the shared file that all my other pages will use. It will define the data (class and book data). I decided to use a class because i'm grouping data (this.books) and behavior (getAllBooks() into one unit. The way I think of classes is it is like a manager, books array is like the inventory and methods are like the actions the manager can perform. so when i say: store.getAllBooks() that is like saying, 'hey store, give me all your books'.

class BookStore {
  constructor() {
    // this.books is an array of objects, not an object itself.
    this.books = [
      //Each item/book inside this array is a JS object

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
  //syntax for javascript functions/methods = don't need the 'function' keyword. shorthand for this: BookStore.prototype.getAllBooks = function() { ... }
  getAllBooks() {
    return this.books;
  }

  getFeaturedBooks() {
    return this.books.slice(0, 3); //start at index 0 and stop before index 3
  }

  filterByGenre(genre) {
    if (!genre || genre === "All") {
      return this.books;
    }
    // METHOD 1  to get the filter:
    // return this.books.filter(function (book) {
    //   return book.genre === genre;
    // });

    // METHOD 2 to get the filter:
    // const filteredBooks = [];
    // for (let i = 0; i < this.books.length; i++) {
    //   const book = this.books[i];
    //   if (book.genre === genre) {
    //     filteredBooks.push(book);
    //   }
    // }
    // return filteredBooks;

    //METHOD 3 To get the filter:
    return this.books.filter((book) => book.genre === genre);
  }

  searchBooks(searchTerm) {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return this.books;
    }

    return this.books.filter((book) => {
      return (
        //includes() for partial matching
        book.title.toLowerCase().includes(normalizedSearch) ||
        book.author.toLowerCase().includes(normalizedSearch)
      );
    });
  }
}
// this is what my app will use later... 'store' is an object instance of class BookStore
const store = new BookStore();
// console.log(store.books);

// console.log(store.getAllBooks());

// console.log(store.getFeaturedBooks());

// console.log(store.filterByGenre("Fantasy"));

// console.log(store.searchBooks("tolkien"));
// console.log(store.searchBooks("atomic"));

// ! ------PRACTICING MY JS--------

function getAllBookTitles(books) {
  return books.map((book) => book.title);
}

const titles = getAllBookTitles(store.getAllBooks());
console.log(titles);

const fantasyBooks = store
  .getAllBooks()
  .filter((book) => book.genre === "Fantasy");
console.log(fantasyBooks);

//Start at 0, go through each book, keep adding stock.
const totalStock = store.getAllBooks().reduce((sum, book) => {
  return sum + book.stock;
}, 0);
console.log(totalStock);

function normalize(input) {
  return input.trim().toLowerCase();
}
console.log(normalize("  DONE   "));

function tokenize(input) {
  return input.trim().toLowerCase().split(" ");
}
console.log(tokenize("The Hobbit by Tolkien"));

function formatBook(book) {
  return `${book.title} by ${book.author}`;
}
console.log(formatBook(store.getAllBooks()[0]));
