// requirements
const fs = require('fs');;
const process = require('process');
const axios = require('axios');

// reads files at path and prints out
function cat(path, out) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.log(`Error reading ${path}`);
        } else {
            output(data, out);
        }
    })
}

// reads URL and prints out page

async function webCat(url, out) {
    try {
        let resp = await axios.get(url);
        output(resp.data, out);
    } catch (err) {
        console.log(`Error getting ${url}`);
        process.exit(1);
    }
}

function output(text, out) {
    if (out) {
        fs.writeFile(out, text, 'utf8', function (err) {
            if (err) {
                console.error(`Couldn't write ${out}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

// creates arguements to determine what function to use
let path;
let out;

// checks for write flag
if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

// determines if to use cat or webCat
if (path.slice(0, 4) === 'http') {
    webCat(path, out);
} else {
    cat(path, out);
}