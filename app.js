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

        const books = storedBooks;
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

document.addEventListener('DOMContentLoaded', UI.displayBooks);

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
        // add book to the page
        UI.addBookToList(aBook);
        
        UI.clearFields();
        UI.showAlert('Book added successfully', 'success');
    };


});

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
});