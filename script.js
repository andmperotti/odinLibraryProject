let books = document.querySelector('#books')

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
        // console.log(book)
        buildBookCard(book)
    }
}
displayMyLibraryBooks()


function buildBookCard(book){
    let visualBook = document.createElement('div')
    visualBook.classList.add('book')

    let titleElement = document.createElement('h2')
    titleElement.textContent = book.title
    visualBook.appendChild(titleElement)

    let authorElement = document.createElement('p')
    authorElement.textContent= 'by ' + book.author
    visualBook.appendChild(authorElement)

    let pagesElement = document.createElement('p')
    pagesElement.textContent = book.pages + ' pages'
    visualBook.appendChild(pagesElement)

    let readElement = document.createElement('span')
    readElement.textContent = 'have ' + book.read
    visualBook.appendChild(readElement)

    books.appendChild(visualBook)
}