const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const allowedUrls = [
    { method: 'GET', url: '/html/b.html' },
    { method: 'GET', url: '/html/index.html' },
    { method: 'GET', url: '/favicon.ico' },
];

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    if (allowedUrls.find(url => url.method == req.method && req.url.split('?')[0] == url.url)) {
        next();
        console.log("allowing url: " + req.url + " of type: " + req.method);
    } else {
        res.redirect("/html/b.html");
    }
});

app.use(express.static('public'));

app.listen(port, () => console.log(`App listening on port ${port}!`))
