let books = document.querySelector('#books')
let showModal = document.querySelector('#addModal')
let formModal = document.querySelector('#addBookModal')
let closeModal = document.querySelector('#closeModal')
let submitNewBook = document.querySelector('#submitNewBook')

const myLibrary = [];
let bookCount = 0
addBookToLibrary('To Kill a Mockingbird', "Harper Lee", 384, 'read')
addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, 'read')

function Book(title, author, pages, read, bookCount){
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function(){
		return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`
	},
    this.bookNumber = bookCount
}

function addBookToLibrary(title, author, pages, read){
    bookCount++
    myLibrary.push(new Book(title, author, pages, read, bookCount))
}


function displayMyLibraryBooks(){
    for(let book of myLibrary){
        buildBookCard(book)
    }
}
displayMyLibraryBooks()


function buildBookCard(book){
    let visualBook = document.createElement('div')
    visualBook.classList.add('book')

    visualBook.setAttribute('data-book-number', book.bookNumber)

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
        let uniqueBookIdentifier = e.target.parentElement.getAttribute('data-book-number')
        let bookPosition = myLibrary.findIndex(book=>book.bookNumber===uniqueBookIdentifier)
        myLibrary.splice(bookPosition, 1)
        e.target.parentElement.remove()
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
    let newBookTitle = document.querySelector('#newTitle').value 
    let newBookAuthor = document.querySelector('#newAuthor').value 
    let newBookPages = document.querySelector('#newPages').value 
    let newBookReadStatus = document.querySelector('#newRead').checked===true ? 'read' : 'not read'
    addBookToLibrary(newBookTitle, newBookAuthor, newBookPages, newBookReadStatus)
    /*myLibrary.slice(-1) would result in an array with only one element, the last element, using [0] we are specifically passing to this function an object*/
    buildBookCard(myLibrary.slice(-1)[0])
})