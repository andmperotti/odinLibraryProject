let books = document.querySelector("#books");
let showModal = document.querySelector("#addModal");
let formModal = document.querySelector("#addBookModal");
let closeModal = document.querySelector("#closeModal");
let submitNewBook = document.querySelector("#submitNewBook");
let newBookTitle = document.querySelector("#newTitle");
let newBookAuthor = document.querySelector("#newAuthor");
let newBookPages = document.querySelector("#newPages");
let newBookReadStatus =
  document.querySelector("#newRead").checked === true ? "read" : "not read";

const myLibrary = [];
let bookCount = 0;

class Book {
  constructor(title, author, pages, read, bookCount) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.bookNumber = bookCount;
  }
  //just in case method to look at a Book instances information
  info() {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
  }
}

addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 384, "read");
addBookToLibrary(
  "Harry Potter and the Sorcerer's Stone",
  "J.K. Rowling",
  309,
  "read",
);

function addBookToLibrary(title, author, pages, read) {
  bookCount++;
  myLibrary.push(new Book(title, author, pages, read, bookCount));
}

function displayMyLibraryBooks() {
  for (let book of myLibrary) {
    buildBookCard(book);
  }
}
displayMyLibraryBooks();

function buildBookCard(book) {
  let visualBook = document.createElement("div");
  visualBook.classList.add("book");

  visualBook.setAttribute("data-book-number", book.bookNumber);

  let titleElement = document.createElement("h2");
  titleElement.textContent = "Title: " + book.title;
  visualBook.appendChild(titleElement);

  let authorElement = document.createElement("p");
  authorElement.textContent = "By Author: " + book.author;
  visualBook.appendChild(authorElement);

  let pagesElement = document.createElement("p");
  pagesElement.textContent = book.pages + " pages";
  visualBook.appendChild(pagesElement);

  let readElement = document.createElement("span");
  readElement.textContent = book.read;
  visualBook.appendChild(readElement);

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "delete";
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    /* target specific book you pressed delete button on, and find its position in the library array */
    let uniqueBookIdentifier =
      e.target.parentElement.getAttribute("data-book-number");
    let bookPosition =
      myLibrary.findIndex((book) => book.bookNumber === uniqueBookIdentifier) +
      1;
    /* remove book from library array by reassigning a new array using splice to the variable */
    myLibrary.splice(bookPosition, 1);
    /* remove book card from books container */
    e.target.parentElement.remove();
  });
  visualBook.appendChild(deleteButton);

  let changeReadStatus = document.createElement("button");
  changeReadStatus.textContent = "Read?";
  changeReadStatus.addEventListener("click", (e) => {
    e.preventDefault();
    let uniqueBookIdentifier =
      e.target.parentElement.getAttribute("data-book-number");
    let bookPosition =
      myLibrary.findIndex((book) => book.bookNumber === uniqueBookIdentifier) +
      1;
    /* change read status on array object */
    myLibrary[bookPosition].read =
      myLibrary[bookPosition].read === "read" ? "not read" : "read";
    /* change read status visually on page */
    e.target.parentElement.children[3].textContent =
      myLibrary[bookPosition].read;
  });
  visualBook.appendChild(changeReadStatus);

  books.appendChild(visualBook);
}

showModal.addEventListener("click", () => {
  formModal.classList.toggle("hideModal");
});

closeModal.addEventListener("click", () => {
  formModal.classList.toggle("hideModal");
  //wipe input fields
  newBookTitle.value = "";
  newBookAuthor.value = "";
  newBookPages.value = "";
});

submitNewBook.addEventListener("click", () => {
  //validation restricts submittance until inputs are valid
  //if all required input fields are valid, then process entry into application
  if (
    newBookTitle.validity.valid &&
    newBookAuthor.validity.valid &&
    newBookPages.validity.valid
  ) {
    //create new Book object instance in application
    addBookToLibrary(
      newBookTitle.value,
      newBookAuthor.value,
      newBookPages.value,
      newBookReadStatus,
    );
    //create bookCard for this book and display it
    buildBookCard(myLibrary[myLibrary.length - 1]);

    //hide modal
    formModal.className = "hideModal";
    //wipe the input fields of modal
    newBookTitle.value = "";
    newBookAuthor.value = "";
    newBookPages.value = "";
  }
  //otherwise don't process entry, which will trigger constraint validation api validityMessage's to be displayed on inputs that are not valid
});
