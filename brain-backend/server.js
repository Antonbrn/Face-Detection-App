const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const app = express();
app.use(bodyParser.json())
app.use(cors());

const db = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'John@gmail.com',
            password: 'Cookies',
            entries: '0',
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'Sally@123.com',
            password: 'Bananas',
            entries: '0',
            joined: new Date()
        },
    ]
}

app.get('/', (req,res) => {
    res.json(db.users)
})

app.post('/signin', (req,res) => {
    if(req.body.email === db.users[0].email && req.body.password === db.users[0].password){
        res.json(db.users[0]);
    } else {
        res.status(400).json('Error logging in');
    }
})

app.post('/register', (req,res) => {
    const {name, email, password} = req.body;

    bcrypt.hash(password, null, null, function(err, hash) {
       console.log(hash);
    });
    if(name && email && password){
        db.users.push({
            id: '125',
            name: name,
            email: email,
            password: password,
            entries: '0',
            joined: new Date()

        })
        res.json(db.users[db.users.length-1]);
    } else {
        res.status(400).json('Error registering');
    }
    console.log(db.users);
})


app.get('/profile/:id', (req, res ) => {
    const {id} = req.params;
    let found = false;
    db.users.forEach(user => {
        if(user.id === id){
            found = true;
            return res.json(user);
        } 
    })
    if(!found){
        res.status(400).json('User not found!')
    }
})


app.put('/image', (req, res) => {
    const {id} = req.body
    let found = false;
    db.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++
            return res.json(user.entries);
        } 
    })
    if(!found){
        res.status(400).json('User not found!')
    }
})







app.listen('3030', () => {
    console.log('Server started at, http://localhost:3030')
})

