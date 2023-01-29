const express = require('express');
// const {books} = require('../data/books.json');
// const {users} = require('../data/users.json');

// import models
const {userModels, bookModels} = require('../models');
const {getAllBooks, getAllIssuedBooks, getBookById, addBook, updateBook, deleteBook, issueBook}
    = require("../controllers/book-contoller");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the books
 * Access: Public
 * Parameters: None
 * Response: Array of books
 * Status: 200
 * Error: 500
 */
router.get('/', getAllBooks);

/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all the issued books
 * Access: Public
 * Parameters: None
 * Response: Array of issued books
 * Status: 200
 * Error: 500
 */
router.get('/issued', getAllIssuedBooks);

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get a single book by id
 * Access: Public
 * Parameters: id
 * Response: Single book object
 * Status: 200
 * Error: 500
 */
router.get('/:id', getBookById);

/**
 * Route: /books
 * Method: POST
 * Description: Create a new book
 * Access: Public
 * Parameters: None
 * Response: Success message
 * Status: 200
 * Error: 500
 */
router.post('/', addBook);

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Update a book by id
 * Access: Public
 * Parameters: id
 * Response: Success message
 * Status: 200
 * Error: 500
 */
router.put('/:id', updateBook);

/**
 * Route: /books/:id
 * Method: DELETE
 * Description: Delete a book by id
 * Access: Public
 * Parameters: id
 * Response: Success message
 * Status: 200
 * Error: 500
 */
router.delete('/:id', deleteBook);

/**
 * Route: /books/issue/:id
 * Method: PUT
 * Description: Issue a book by id
 * Access: Public
 * Parameters: id
 * Response: Success message
 * Status: 200
 * Error: 500
 */
router.put('/issue/:id', issueBook);

// default export
module.exports = router;