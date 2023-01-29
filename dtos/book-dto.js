// Data Transfer Object for Book

class IssuedBooks {
    _id;
    name;
    author;
    genre;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;
    constructor(user) {
        this._id = user.issuedBook._id;
        this.name = user.issuedBook.name;
        this.author = user.issuedBook.author;
        this.genre = user.issuedBook.genre;
        this.publisher = user.issuedBook.publisher;
        this.issuedDate = user.issuedBook.issuedDate;
        this.returnDate = user.issuedBook.returnDate;
    }
}

module.exports = IssuedBooks;

