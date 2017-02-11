let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
let app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('*', function (req, res) {

    let fileName = (new Date().toISOString()).replace(/[^a-z0-9]/gi, '-').toLowerCase();
    let data = JSON.stringify(req.body, null, '\t');

    fs.writeFileSync('./public/' + fileName, data);

    res.send('<pre>' + data + '</pre>');
});

app.get('*', function (req, res) {
    res.send('Hello World!');
});

app.listen(process.env.PORT, function () {
    console.log('Example app listening on port 3000!')
});