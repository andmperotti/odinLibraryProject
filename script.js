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
        
    }
}
displayMyLibraryBooks()