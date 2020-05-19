const {
    readdir,
    rename,
    mkdir,
    rmdir,
} = require('fs');
const { join } = require('path');

const buf_path = join(__dirname, 'buf');

function transferFiles(fromP, toP, cb) {
    readdir(fromP, (err, files) => {
        if(err) {
            console.log(err);
            return;
        }
        console.log(files);
        files.forEach(file => {
            console.log(file);
            rename(join(fromP, file), join(toP, file), err => {
                console.log(err);
            });
            console.log("moved");
        });
        console.log('Transfer ended');
        cb();
    });
}

function moveStudents(path1, path2) {
    mkdir(buf_path, err => {
        if(err) {
            console.log(err);
            return
        }
        console.log("Dir created");
        transferFiles(path2, buf_path, () => {
            transferFiles(path1, path2, () => {
                transferFiles(buf_path, path1, () => {
                    rmdir(buf_path, err => {
                        if(err){
                            console.log(err);
                            return;
                        }
                        console.log("Deleting");
                    })
                })
            })
        })
    })
}

module.exports = moveStudents;

