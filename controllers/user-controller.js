const {userModels, bookModels} = require('../models');

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


