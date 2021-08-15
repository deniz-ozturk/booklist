class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    };   
    
    static clearFields() {
        document.querySelector('#titleField').value = '';
        document.querySelector('#authorField').value = '';
        document.querySelector('#isbnField').value = '';
    };

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

    static deleteBook(element) {
        // only delete if what is being clicked contains class 'delete' i.e. is a delete button
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
            UI.showAlert('Book removed successfully', 'danger');
        }
    };

    static showAlert(text, alertType) {
        const div = document.createElement('div');
        div.className = `alert alert-${alertType}`;
        const textNode = document.createTextNode(text);
        div.appendChild(textNode);
        const container = document.querySelector('#main');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // vanish
        setTimeout(() => document.querySelector('.alert').remove(), 3000)
    };

}

class Store {
    static getBooks() {
        let books; // initialise variable called books
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }   
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Add Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get values from fields
    const title = document.querySelector('#titleField').value;
    const author = document.querySelector('#authorField').value;
    const isbn = document.querySelector('#isbnField').value;

    // check that they aren't empty before continuing
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('One or more fields are empty', 'danger');
    } else {
        // instantiate book
        const aBook = new Book(title, author, isbn);
        // add book to the page (UI)
        UI.addBookToList(aBook);

        UI.clearFields();
        UI.showAlert('Book added successfully', 'success');

        // add book to local storage
        Store.addBook(aBook);
        

    };


});

// Remove Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    // remove book from UI
    UI.deleteBook(e.target);
    // remove book from local storage
    const targetISBN = e.target.parentElement.previousElementSibling.textContent; 
    console.log(targetISBN);
    Store.removeBook(targetISBN);

});