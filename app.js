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

app.get('/view', function (req, res) {

    let files = fs.readdirSync('./public/');
    let output = files.map(file => '<a href="' + file + '">' + file + '</a>').join('<br>');
    res.send(output);
});

app.post('*', function (req, res) {

    let fileName = (new Date().toISOString()).replace(/[^a-z0-9]/gi, '-').toLowerCase();

    let payload = req.body.payload || req.body;

    try {
        payload = JSON.parse(payload);
    } catch (e) {
        console.log("not JSON");
    }

    let data = JSON.stringify(payload, null, '\t');

    fs.writeFileSync('./public/' + fileName + '.json', data);

    res.send('<pre>' + data + '</pre>');
});

app.get('*', function (req, res) {

});

app.listen(process.env.PORT, function () {
    console.log('Example app listening on port ' + process.env.PORT + '!')
});