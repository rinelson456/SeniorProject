const express = require('express');
const request = require('request');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

app.get('/recipes/', (req, res, next) => {
    const ingredients = req.query.i;
    const currentPage = +req.query.page;

    request('http://www.recipepuppy.com/api/?i=chicken' + ingredients + "&page=" + currentPage,
        function(error, response, body) {
            res.send(body)
        });

});

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`From port ${port}`);
});