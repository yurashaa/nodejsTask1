const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, 'users.txt');
let users = [];

module.exports = class User {
    constructor(name, email, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }

    static findUser(email, password) {
        if(password)
            return users.find(user => user.email === email && user.password === password);
        return users.find(user => user.email === email);
    }

    addUser(){
        const user = User.findUser(this.email);
        if(!user){
            users.push(this);
            User.updateUsers();
            return true;
        }
        return false;
    }

    static getUsers() {
        return users;
    }

    static fetchUsers() {
        let usersJson = '';
        let readStream = fs.createReadStream(usersFile);
        
        readStream.on('data', chunk => {
            console.log(chunk);
            usersJson += chunk.toString();
        });

        readStream.on('end', () => {
            if (usersJson)
                users = JSON.parse(usersJson);
        })
    }

    static updateUsers() {
        fs.writeFile(usersFile, JSON.stringify(users), err => {
        console.log(err);
    })
    }
};
