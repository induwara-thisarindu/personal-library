const toggleButton = document.getElementById("toggle");
const submitButton = document.getElementById("submit-btn");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookGenre = document.getElementById("genre");
const readCheck = document.getElementById("read");
const bookCards = document.getElementById("cards");

let myLibrary = [];

function Book(title, author, genre, hasReadBook) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.hasReadBook = hasReadBook;
}

function loadLibrary() {
    const savedLibrary = localStorage.getItem('myLibrary');
    if (savedLibrary) {
        myLibrary = JSON.parse(savedLibrary);
    }
}

function saveLibrary() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function displayBooks() {
    bookCards.innerHTML = '';
    const hasReadFilter = readCheck.checked;

    for (let i = 0; i < myLibrary.length; i++) {
        const bookCard = document.createElement('div');
        bookCard.classList.add('card');

        bookCard.innerHTML = `
            <h1 id="title-book"><strong>Title - </strong>${myLibrary[i].title}</h1>
            <p id="author-book"><strong>Author - </strong>${myLibrary[i].author}</p>
            <p id="genre-book"><strong>Genre - </strong>${myLibrary[i].genre}</p>
            <p id="has-read"><strong>Have you read the book? - </strong><em id="response">${myLibrary[i].hasReadBook ? 'Yes' : 'No'}</em> <button class="change-btn">change</button></p>
            <button class="delete-btn">Delete</button>
        `;

        bookCard.querySelector('.delete-btn').addEventListener('click', () => {
            myLibrary.splice(i, 1);
            saveLibrary();
            displayBooks();
        });

        bookCard.querySelector('.change-btn').addEventListener('click', () => {
            myLibrary[i].hasReadBook = !myLibrary[i].hasReadBook;
            saveLibrary();
            displayBooks();
        });

        bookCards.appendChild(bookCard);
    }
}

function getBook() {
    const titleValue = bookTitle.value;
    const authorValue = bookAuthor.value;
    const genreValue = bookGenre.value;
    const hasRead = readCheck.checked;

    return new Book(titleValue, authorValue, genreValue, hasRead);
}

function pushToLibrary(book) {
    myLibrary.push(book);
    saveLibrary();
}

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newBook = getBook();
    pushToLibrary(newBook);
    displayBooks();
});

toggleButton.addEventListener('click', () => {
    const form = document.getElementById('form');
    form.classList.toggle('left');
    toggleButton.classList.toggle('toggle-btn');
});

document.addEventListener('DOMContentLoaded', () => {
    loadLibrary();
    displayBooks();
});
