const express = require('express');

const mongodb = require('./data/database.js');
const app = express();

const port = process.env.PORT || 3003;

app.use('/', require('./routes'));



mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is connected and Node is running on port ${port}`);
        });
    }
});
