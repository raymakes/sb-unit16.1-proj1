// requirements
const fs = require('fs');;
const process = require('process');
const axios = require('axios');

// reads files at path and prints out
function cat(path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.log(`Error reading ${path}`);
        } else {
            console.log(data);
        }
    })
}

// reads URL and prints out page

async function webCat(url) {
    try {
        let resp = await axios.get(url);
        console.log(resp.data)
    } catch (err) {
        console.log(`Error getting ${url}`);
        process.exit(1);
    }
}

// determines if to use cat or webcat
let path = process.argv[2];

if (path.slice(0, 4) === 'http') {
    webCat(path);
} else {
    cat(path);
}