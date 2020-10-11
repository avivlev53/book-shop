'use strict'
const STORAGE_KEY = 'booksDB'
var gBooks = []

_createBooks()

function getBooks() {
    return gBooks
}

function removeBook(bookId) {
    var bookIdx = _getBookIdx(bookId);
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}
function addBook(name, price) {
    var book = _createBook(name)
    book.price = price + '$'
    gBooks.push(book)
    _saveBooksToStorage()
}
function updateBook(bookId, bookPrice) {
    var bookIdx = _getBookIdx(bookId);
    gBooks[bookIdx].price = bookPrice
    _saveBooksToStorage()
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return book
}



function _createBook(name) {
    return {
        id: makeId(3),
        name: name,
        price: 100 + '$',
        desc: makeLorem(),
        rate: 0
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createBook('Twilight'))
        books.push(_createBook('Twilight 2'))
        books.push(_createBook('A Song of Ice and Fire'))
    }
    gBooks = books
    _saveBooksToStorage();
}

function _getBookIdx(id) {
    return gBooks.findIndex(function (book) {
        return book.id === bookId
    })
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}
