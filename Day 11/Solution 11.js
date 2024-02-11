const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

function authenticationMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        } else {
            req.user = decoded;
            next();
        }
    });
}

app.get('/protected-route', authenticationMiddleware, (req, res) => {
    res.send('Authenticated user!');
});

app.get('/', (req, res) => {
    res.send('Hello Harsh!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
