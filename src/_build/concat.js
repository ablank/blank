const path = require('path');
const fs = require('fs');
const concat = require('concat');


const read = (fName) => new Promise((res, rej) => {
    fs.readFile(path.resolve(fName), (err, str) => {
        if (err)
            rej(err);
        res(str);
    });
});

const write = (fName, str) => new Promise((res, rej) => {
    fs.writeFile(path.resolve(fName), str, (err) => {
        if (err)
            return rej(err);
        return res(str);
    });
});

