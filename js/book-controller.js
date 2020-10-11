'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    var books = getBooks()
    var strHtml = books.map(function (book) {
        return `
        <div class="book-preview">
            <div class="id item"> ${book.id}</div>
            <div class="title item">${book.name}</div>
            <div class="price item">${book.price}</div> 
            <div class ="actions item" > 
            <button class ="read" onclick="onReadBook('${book.id}')" >Read</button>
            <button class="update" onclick="onUpdateBook('${book.id}')">Update</button>
            <button class="delete" onclick="onRemoveBook('${book.id}')" >Delete</button>
            </div>
        </div> 
        `
    })
    document.querySelector('.books-container').innerHTML = strHtml.join(' ')
}
function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}
function onAddBook() {
    var elBookName = document.querySelector('.add-book input[name=newBook-name]');
    var elBookPrice = document.querySelector('.add-book input[name=newBook-price]');
    var name = elBookName.value;
    var price = +elBookPrice.value;
    if (!name || !price) {
        alert('you didn\'t choose name or price')
        return
    }
    addBook(name, price)
    elBookName.value = ''
    elBookPrice.value = ''
    renderBooks()
}
function onUpdateBook(bookId) {
    var newPrice = prompt('what is the new price?') + '$'
    updateBook(bookId, newPrice)
    renderBooks()
}
function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h2').innerText = book.name
    elModal.querySelector('h3').innerText = book.price
    elModal.querySelector('p').innerText = book.desc
    elModal.hidden = false
    var elImg = elModal.querySelector('.img')
    if (book.name === 'Twilight' || book.name === 'Twilight 2' || book.name === 'A Song of Ice and Fire') {
        elImg.innerHTML = `<img src="img/${book.name}.png" >`
    } else {
        elImg.innerHTML = '<p>(No image found)</p>'
        elImg.style.fontSize = '13px'
    }
    renderRate(bookId)
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true

}
function renderRate(bookId) {
    
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    var strHtml = `<button class="rate" name="${book.id}" onclick = "onUpRate(this)">+</button>
    <span class="rate num">${book.rate}</span>
    <button class="rate"  name="${book.id}" onclick="onLowRate(this)">-</button>`
    elModal.querySelector('section.btnRate').innerHTML=strHtml
}
function onUpRate(btn) {
    var id=btn.name
    var book = getBookById(id)
    if (book.rate>=10)return
    book.rate++
    renderRate(id)
    _saveBooksToStorage()
}
function onLowRate(btn) {
    var id=btn.name
    var book = getBookById(id)
    if (book.rate<=0)return
    book.rate--
    renderRate(id)
    _saveBooksToStorage()
}