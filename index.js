const express = require('express');
// import db connection file
const DbConnection = require('./databaseConnection');

// import db
const dotenv = require('dotenv');

// import models
const {userModels, bookModels} = require('./models');

// import routes
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');

dotenv.config();

const app = express();

DbConnection();

const PORT = 8081;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Server is up and running',
        success: true
    });
});

app.use('/users', usersRouter);
app.use('/books', booksRouter);


app.get('*', (req, res) => {
    res.status(404).send({
        message: 'This route does not exist',
        success: false
    });
});

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});

