const express = require('express');
const {users} = require('../data/users.json');

// import models
const {userModels, bookModels} = require('../models');

const {getAllUsers, getUserById, addUser, updateUser, deleteUser, returnBook, subscriptionDetails}
    = require("../controllers/user-controller");

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all the users
 * Access: Public
 * Parameters: None
 * Response: Array of users
 * Status: 200
 * Error: 500
 **/
router.get('/', getAllUsers);

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get a single user by id
 * Access: Public
 * Parameters: id
 * Response: Single user object
 * Status: 200
 * Error: 500
 */
router.get('/:id', getUserById);

/**
 * Route: /users
 * Method: POST
 * Description: Create a new user
 * Access: Public
 * Parameters: None
 * Response: Success message
 * Status: 200
 * Error: 500
 */
router.post('/', addUser);

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Update a user by id
 * Access: Public
 * Parameters: id
 * Response: Success message
 * Status: 200
 * Error: 500
 */
router.put('/:id', updateUser);

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Delete a user by id
 * Access: Public
 * Parameters: id
 * Response: Success message
 * Status: 200
 * Error: 500
 */
router.delete('/:id', deleteUser);

/**
 * Route: /users/return/:id
 * Method: PUT
 * Description: Return a book by id
 * Access: Public
 * Parameters: id
 * Response: Success message
 * Status: 200
 * Error: 500
 */
router.put('/return/:id', returnBook);

/**
 * Route: /users/subscriptions-details/:id
 * Method: GET
 * Description: Get subscription details of a user by id
 * Access: Public
 * Parameters: id
 * Response: Subscription details
 * Status: 200
 * Error: 500
 */
router.get('/subscription-details/:id', subscriptionDetails);

// default export
module.exports = router;