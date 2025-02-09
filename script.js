let books = document.querySelector('#books')
let showModal = document.querySelector('#addModal')
let formModal = document.querySelector('#addBookModal')
let closeModal = document.querySelector('#closeModal')
let submitNewBook = document.querySelector('#submitNewBook')

const myLibrary = [];
let bookCount = 0

class Book{
    constructor(title, author, pages, read, bookCount){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.bookNumber = bookCount
    }
    info(){
        return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`
    }
}

addBookToLibrary('To Kill a Mockingbird', "Harper Lee", 384, 'read')
addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, 'read')

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
    readElement.textContent = book.read
    visualBook.appendChild(readElement)

    let deleteButton = document.createElement('button')
    deleteButton.textContent = 'delete'
    deleteButton.classList.add('deleteButton')
    deleteButton.addEventListener('click', e=>{
        e.preventDefault();
        /* target specific book you pressed delete button on, and find its position in the library array */
        let uniqueBookIdentifier = e.target.parentElement.getAttribute('data-book-number')
        let bookPosition = myLibrary.findIndex(book=>book.bookNumber===uniqueBookIdentifier)+1
        /* remove book from library array by reassigning a new array using splice to the variable */
        myLibrary.splice(bookPosition, 1)
        /* remove book card from books container */
        e.target.parentElement.remove()
    })
    visualBook.appendChild(deleteButton)

    let changeReadStatus = document.createElement('button')
    changeReadStatus.textContent= "Read?"
    changeReadStatus.addEventListener("click", e=>{
        e.preventDefault()
        let uniqueBookIdentifier = e.target.parentElement.getAttribute('data-book-number')
        let bookPosition = myLibrary.findIndex(book=>book.bookNumber===uniqueBookIdentifier)+1
        /* change read status on array object */
        myLibrary[bookPosition].read = myLibrary[bookPosition].read === 'read' ? 'not read' : 'read';
        /* change read status visually on page */
        e.target.parentElement.children[3].textContent = myLibrary[bookPosition].read
    })
    visualBook.appendChild(changeReadStatus)

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