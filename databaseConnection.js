const mongoose = require('mongoose');

function DbConnection() {
    const dbUrl = process.env.MONGO_URI;
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind("Connection error"));

    db.once('open', () => {
        console.log('Database connected');
    });

}

// CRUD operations => Create, Read, Update, Delete


module.exports = DbConnection;