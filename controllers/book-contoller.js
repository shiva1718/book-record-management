// import models
const {userModels, bookModels} = require('../models');
const IssuedBook = require('../dtos/book-dto');

/**
 * Retrieves all books from the database
 *
 * @returns {Array} An array containing all books in the database
 */
exports.getAllBooks = async (req, res) => {
    const books = await bookModels.find();
    if (books) return res.status(200).json({
        message: 'Books fetched successfully',
        success: true,
        data: books
    });
    res.status(404).json({
        message: 'No books found',
        success: false
    });
};


/**
 * Retrieves a book by its ID from the database.
 *
 * @param {number} id - The ID of the book to retrieve.
 * @returns {Promise<Book>} A Promise that resolves to the book object.
 * @throws {Error} If the book with the specified ID is not found.
 */
exports.getBookById = async (req, res) => {
    const book = await bookModels.findById(req.params.id);
    if (book) {
        return res.status(200).json({
            message: 'Book fetched successfully',
            success: true,
            data: book
        });
    }
    res.status(404).json({
        message: 'Book not found',
        success: false
    });
};

/**
 * Retrieves a list of all issued books from the database.
 *
 * @returns {Array} An array of all issued books.
 */
exports.getAllIssuedBooks = async (req, res) => {
    const users = await userModels.find({
        issuedBook: {$exists: true}
    }).populate('issuedBook');
    const issuedBooks = users.map((user) => new IssuedBook(user));
    if (issuedBooks.length !== 0) {
        return res.status(200).json({
            message: 'Fetched issued Books successfully',
            success: true,
            data: issuedBooks
        });
    }
    res.status(404).json({
        message: 'No books has been issued',
        success: false
    });
};

/**
 * Adds a book to the library.
 *
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 * @param {string} genre - The genre of the book.
 * @param {number} year - The year the book was published.
 * @returns {boolean} - true if the book was added successfully, false otherwise.
 */
exports.addBook = async (req, res) => {

    if (!req.body) {
        return res.status(400).json({
            message: 'No data was provided for the book',
            success: false
        });
    }
    await bookModels.create(req.body);
    const allBooks = await bookModels.find();
    res.status(200).json({
        message: 'Book Successfully added',
        success: true,
        data: allBooks
    });
};

/**
 * Deletes a book from the system.
 *
 * @param {number} bookId - The ID of the book to be deleted.
 * @returns {Promise<boolean>} - A promise that resolves to true if the book was successfully deleted, or false otherwise.
 */
exports.deleteBook = async (req, res) => {
    const {id} = req.params;
    const deletedBook = await bookModels.findByIdAndDelete(id);
    if (deletedBook) {
        return res.status(200).json({
            message: 'Book deleted successfully',
            success: true,
            data: deletedBook
        });
    }
    res.status(404).json({
        message: 'Book not found',
        success: false
    });
};

/**
 * Updates a book in the database with new information.
 *
 * @param {string} bookId - The unique identifier of the book to be updated.
 * @param {object} updatedBook - The updated book object containing the new information.
 * @returns {Promise} - A promise that resolves when the book is successfully updated.
 * @throws {Error} - If the bookId is not a valid string or the updatedBook is not a valid object.
 */
exports.updateBook = async (req, res) => {
    const {id} = req.params;
    const {name, author, genre, price, publisher} = req.body;
    const updatedBook = await bookModels.findOneAndUpdate({_id: id}, {
        name,
        author,
        genre,
        price,
        publisher
    }, {new: true});
    if (updatedBook) {
        return res.status(200).json({
            message: 'Book updated successfully',
            success: true,
            data: updatedBook
        });
    }
    res.status(404).json({
        message: 'Book not found',
        success: false
    });
};

/**
 * Issues a book to a user.
 *
 * @param {string} bookId - The ID of the book to be issued.
 * @param {string} userId - The ID of the user to whom the book is being issued.
 * @returns {boolean} - Returns true if the book is successfully issued, false otherwise.
 */
exports.issueBook = async (req, res) => {
    const {id} = req.params;
    const {userId, issuedDate, returnDate} = req.body;
    const book = await bookModels.findById(id);
    if (book) {
        const user = await userModels.findByIdAndUpdate(userId, {
            issuedBook: id,
            issuedDate,
            returnDate
        }, {new: true});
        if (user) {
            res.status(200).json({
                message: 'Book issued successfully',
                success: true,
                data: user
            });
        } else {
            res.status(404).json({
                message: 'User not found',
                success: false,
            });
        }
    } else {
        res.status(404).json({
            message: 'Book not found',
            success: false,
        });
    }
};
