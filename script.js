let books = document.querySelector('#books')
let showModal = document.querySelector('#addModal')
let formModal = document.querySelector('#addBookModal')
let closeModal = document.querySelector('#closeModal')
let submitNewBook = document.querySelector('#submitNewBook')

const myLibrary = [];
let totalBooks = 0;
addBookToLibrary('To Kill a Mockingbird', "Harper Lee", 384, 'read')
addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, 'read')

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
    totalBooks++
}


function displayMyLibraryBooks(){
    for(let i = 0; i<myLibrary.length; i++){
        buildBookCard(myLibrary[i], i)
    }
}
displayMyLibraryBooks()


function buildBookCard(book, index){
    let visualBook = document.createElement('div')
    visualBook.classList.add('book')

    visualBook.setAttribute('data-book-number', index)

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

    let deleteButton = document.createElement('button')
    deleteButton.textContent = 'delete'
    deleteButton.classList.add('deleteButton')
    deleteButton.addEventListener('click', e=>{
        e.preventDefault();
        /* functionality to remove book from array and books container */
    })
    visualBook.appendChild(deleteButton)

    books.appendChild(visualBook);
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
    addBookToLibrary(newBookTitle, newBookAuthor, newBookPages, newBookReadStatus)
    buildBookCard(myLibrary.slice(-1), totalBooks-1)
})