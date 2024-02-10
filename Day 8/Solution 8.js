const express = require('express');
const app = express();

function positiveIntegerHandler(req, res, next) {
    const number = parseInt(req.query.number);
    if (Number.isInteger(number) && number > 0) {
        res.send('Success: Number is a positive integer.');
    } else {
        next(new Error('Number must be a positive integer.'));
    }
}

function errorHandler(err, req, res, next) {
    res.status(400).send('Error: ' + err.message);
}

app.use(errorHandler);

app.get('/positive', positiveIntegerHandler);

app.get('/', (req, res) => {
    res.send('Welcome to the Express application!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
