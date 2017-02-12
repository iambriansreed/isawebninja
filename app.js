let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
let app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/view', function (req, res) {

    let files = fs.readdirSync('./public/');
    let output = files.map(file => '<a href="' + file + '">' + file + '</a>').join('<br>');
    res.send(output);
});

app.post('/hook', function (req, res) {

    let fileName = (new Date().toISOString()).replace(/[^a-z0-9]/gi, '-').toLowerCase();

    let log = {
        xHubSignature: xHubSignature('testOk', JSON.stringify(req.body)),
        headers: req.headers,
        payload: req.body
    };

    fs.writeFileSync('./public/' + fileName + '.json', JSON.stringify(log, null, '\t'));

    res.send('<pre>' + data + '</pre>');
});

app.get('*', function (req, res) {
    res.send('Hello World! GET');
});

app.post('*', function (req, res) {
    res.send('Hello World! POST');
});


app.listen(process.env.PORT, function () {
    console.log('Example app listening on port ' + process.env.PORT + '!')
});

function xHubSignature(secret, data) {
    return 'sha1=' + require('crypto').createHmac('sha1', secret).update(JSON.stringify(data)).digest('hex');
}