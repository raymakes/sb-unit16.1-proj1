// requirements
const fs = require('fs');;
const process = require('process');

// reads files at path and prints out
function cat(path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.log("Error reading ${path}");
        } else {
            console.log(data);
        }
    })
}

cat(process.argv[2]);