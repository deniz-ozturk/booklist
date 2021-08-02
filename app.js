class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    static displayBooks() {
        const storedBooks = [
            {
                title: 'Book1',
                author: 'John',
                isbn: '12345'
            },
            {
                title: 'Book2',
                author: 'Bob',
                isbn: '54321'
            }
        ];
        
    /*static clearFields() {
        document.querySelector('#titleField').value = '';
        document.querySelector('#authorField').value = '';
        document.querySelector('#isbnField').value = '';
    } */

        const books = storedBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        // add new row
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="btn btn-danger btn-sm delete">Delete</a></td>
        `;

        list.appendChild(row);
    }
}

function addBook() {
    // get values from fields
    const title = document.querySelector('#titleField').value;
    const author = document.querySelector('#authorField').value;
    const isbn = document.querySelector('#isbnField').value;

    // instantiate book
    const aBook = new Book(title, author, isbn);
    // add book to the page
    UI.addBookToList(aBook);
    
    //UI.clearFields();
    
}


document.addEventListener('DOMContentLoaded', UI.displayBooks);
document.querySelector('#book-form').addEventListener('submit', addBook)