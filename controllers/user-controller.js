const {userModels, bookModels} = require('../models');

/**
 * Retrieves all users from the database.
 *
 * @returns {Promise<Array<User>>} A promise that resolves to an array of User objects representing all users.
 */
exports.getAllUsers = async (req, res) => {
    const users = await userModels.find();
    if (users) return res.status(200).json({
        message: 'Users fetched successfully',
        success: true,
        data: users
    });
    res.status(404).json({
        message: 'No users found',
        success: false
    });
};

/**
 * Retrieves a user by their ID.
 *
 * @param {number} id - The ID of the user to retrieve.
 * @returns {object} - The user object matching the given ID.
 * @throws {Error} - If no user is found with the given ID.
 */
exports.getUserById = async (req, res) => {
    const user = await userModels.findById(req.params.id);
    if (user) {
        return res.status(200).json({
            message: 'User fetched successfully',
            success: true,
            data: user
        });
    }
    res.status(404).json({
        message: 'User not found',
        success: false
    });
};

/**
 * Adds a user to the system.
 *
 * @param {string} username - The username of the user being added.
 * @param {string} password - The password of the user being added.
 * @param {string} email - The email of the user being added.
 * @returns {boolean} - True if the user was successfully added, false otherwise.
 */
exports.addUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: 'No data was provided for the user',
            success: false
        });
    }
    await userModels.create(req.body);
    const allUsers = await userModels.find();
    if (allUsers) return res.status(200).json({
        message: 'User added successfully',
        success: true,
        data: allUsers
    });
    res.status(404).json({
        message: 'No users found',
        success: false
    });
};

/**
 * Updates the user information.
 *
 * @param {string} userId - The ID of the user to be updated.
 * @param {Object} userInfo - The updated user information.
 * @param {string} userInfo.name - The updated name of the user.
 * @param {string} userInfo.email - The updated email of the user.
 * @param {string} userInfo.address - The updated address of the user.
 * @returns {boolean} - Returns true if the user information was successfully updated, otherwise false.
 * @throws {Error} - Throws an error if the userId parameter is not a string or userInfo is not an object.
 *
 * @example
 * const userId = "123456789";
 * const updatedUserInfo = {
 *   name: "John Doe",
 *   email: "johndoe@example.com",
 *   address: "123 Main St"
 * };
 * const result = updateUser(userId, updatedUserInfo);
 * console.log(result); // true
 */
exports.updateUser = async (req, res) => {
    const {id} = req.params;
    const {body} = req;
    userModels.findByIdAndUpdate(id, body, {new: true}, (err, user) => {
        if (err) {
            return res.status(500).json({
                message: 'Error updating user',
                success: false
            });
        }
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }
        res.status(200).json({
            message: 'User updated successfully',
            success: true,
            data: user
        });
    });
};

/**
 * Deletes a user from the system.
 *
 * @param {string} id - The unique identifier of the user to be deleted.
 * @returns {boolean} - True if the user was successfully deleted, false otherwise.
 *
 * @throws {Error} - If the id parameter is missing or invalid.
 *
 * @example
 * // Delete user with id "12345"
 * const deleted = deleteUser("12345");
 * if (deleted) {
 *   console.log("User deleted!");
 * } else {
 *   console.log("Failed to delete user.");
 * }
 */
exports.deleteUser = async (req, res) => {
    const {id} = req.params;
    userModels.findByIdAndDelete(id, (err, user) => {
        if (err) {
            return res.status(500).json({
                message: 'Error deleting user',
                success: false
            });
        }
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }
        res.status(200).json({
            message: 'User deleted successfully',
            success: true,
            data: user
        });
    });
}


/**
 * Returns a book that was borrowed.
 *
 * @param {string} bookId - The ID of the book to be returned.
 * @returns {boolean} - Returns true if the book was successfully returned, false otherwise.
 *
 * @example
 * const bookId = "12345";
 * const success = exports.returnBook(bookId);
 * if(success) {
 *   console.log("Book returned successfully");
 * } else {
 *   console.log("Failed to return book");
 * }
 */
exports.returnBook = async (req, res) => {
    const {id} = req.params;
    userModels.findByIdAndUpdate(id, {
        $unset: {
            issuedBook: 1,
            issuedDate: 1,
            returnDate: 1
        }
    }, {new: true}, (err, user) => {
        if (err) {
            return res.status(500).json({
                message: 'Error returning book',
                success: false
            });
        }
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }
        res.status(200).json({
            message: 'Book returned successfully',
            success: true,
            data: user
        });
    });
};

/**
 * Retrieves the details of a subscription.
 *
 * @param {string} subscriptionId - The ID of the subscription.
 * @returns {Object} - An object containing the details of the subscription.
 *                    The object has the following properties:
 *                    - id: The ID of the subscription.
 *                    - name: The name of the subscription.
 *                    - startDate: The start date of the subscription.
 *                    - endDate: The end date of the subscription.
 *                    - isActive: A boolean indicating whether the subscription is active or not.
 *                    - price: The price of the subscription.
 * @throws {Error} - If the subscription ID is not provided or is invalid.
 */
exports.subscriptionDetails = async (req, res) => {
    const {id} = req.params;
    userModels.findById(id, (err, user) => {
        if (err) {
            return res.status(500).json({
                message: 'Error fetching subscription details',
                success: false
            });
        }
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }
        const {id, name, surname, email, issuedBook, issuedDate, returnDate, subscriptionType, subscriptionDate} = user;
        let subscriptionExpirationDate = new Date(subscriptionDate);
        subscriptionExpirationDate.setFullYear(subscriptionExpirationDate.getFullYear() + 1);
        let subscriptionExpired = subscriptionExpirationDate < new Date();
        let daysLeft = Math.floor((subscriptionExpirationDate - new Date()) / (1000 * 60 * 60 * 24));
        const subscriptionDetails = {
            id,
            name,
            surname,
            email,
            issuedBook,
            issuedDate,
            returnDate,
            subscriptionType,
            subscriptionDate,
            subscriptionExpirationDate,
            subscriptionExpired,
            daysLeft
        };
        res.status(200).json({
            message: 'Subscription details fetched successfully',
            success: true,
            data: subscriptionDetails
        });
    });
}


