let books = document.querySelector('#books')
let showModal = document.querySelector('#addModal')
let formModal = document.querySelector('#addBookModal')
let closeModal = document.querySelector('#closeModal')
let submitNewBook = document.querySelector('#submitNewBook')

const myLibrary = [];

function Book(title, author, pages, read){
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function(){
		return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`
	}
}

function addBookToLibrary(title, author, pages, read){
    myLibrary.push(new Book(title, author, pages, read))
}

addBookToLibrary('To Kill a Mockingbird', "Harper Lee", 384, 'read')
addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, 'read')

function displayMyLibraryBooks(){
    for(let book of myLibrary){
        buildBookCard(book)
    }
}
displayMyLibraryBooks()


function buildBookCard(book){
    let visualBook = document.createElement('div')
    visualBook.classList.add('book')

    let titleElement = document.createElement('h2')
    titleElement.textContent = 'Title: ' +book.title
    visualBook.appendChild(titleElement)

    let authorElement = document.createElement('p')
    authorElement.textContent= 'By Author: ' + book.author
    visualBook.appendChild(authorElement)

    let pagesElement = document.createElement('p')
    pagesElement.textContent = book.pages + ' pages'
    visualBook.appendChild(pagesElement)

    let readElement = document.createElement('span')
    readElement.textContent = 'Have ' + book.read
    visualBook.appendChild(readElement)

    books.appendChild(visualBook)
}

showModal.addEventListener("click", e=>{
    e.preventDefault()
    formModal.classList.toggle('hideModal')
})

closeModal.addEventListener("click", e=>{
    e.preventDefault()
    formModal.classList.toggle('hideModal')
})

submitNewBook.addEventListener('click', e=>{
    e.preventDefault()
    let newBookTitle = document.querySelector('#newTitle').value 
    let newBookAuthor = document.querySelector('#newAuthor').value 
    let newBookPages = document.querySelector('#newPages').value 
    let newBookReadStatus = document.querySelector('#newRead').checked===true ? 'read' : 'not read'
    let newBook = new Book(newBookAuthor, newBookTitle, newBookPages, newBookReadStatus)
    addBookToLibrary(newBook)
    buildBookCard(newBook)
})