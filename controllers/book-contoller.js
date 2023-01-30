// import models
const {userModels, bookModels} = require('../models');
const IssuedBook = require('../dtos/book-dto');

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

exports.addBook = async (req, res) => {

    if (!req.body) {
        return res.status(400).json({
            message: 'No data was provided for the book',
            success: false
        });
    }
    await bookModels.create(req.body);
    const allBooks = await bookModels.find();
    // if (book) {
    //     return res.status(200).send({
    //         message: 'Book already exist',
    //         success: true,
    //         data: book
    //     });
    // }
    res.status(200).json({
        message: 'Book Successfully added',
        success: true,
        data: allBooks
    });
};

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
    // await bookModels.findByIdAndUpdate(id, {
    //     name,
    //     author,
    //     genre,
    //     price,
    //     publisher
    // });
};

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
