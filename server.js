// Leverage as async to not block requests
const express = require('express');
const fs = require('fs');
const cors = require('cors');
var app = express();
const PORT = 3000;

function readJSONFile(path, cb) {
    fs.readFile(path, (err, fileData) => {
        if(err) {
            console.log(err);
            return cb && cb(err);
        }
    
        try {
            console.log('Trying to read the data');
            obj = JSON.parse(fileData);
            console.log('Successfully read the data')
            return cb && cb(null, obj);
        } catch(err) {
            return cb && cb(err);
        }
    });
}

app.use(cors());

let server = app.listen(PORT, () => {
    console.log(`Server running at http://${server.address().address}:${server.address().port}`);
});

app.get('/weight_data', async (req, res) => {
    console.log(`Request: ${req}`);
    readJSONFile('./config/weight-mock-data.json', (err, weightData) => {
        if (err) {
            console.log(err);
            throw Error('Could not properly load the file');
        }

        console.log(weightData);
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.write(JSON.stringify(weightData));
        res.end();
    });

});
