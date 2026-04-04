const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

function readUsers() {
  const data = fs.readFileSync('./users.json', "utf-8");
  return JSON.parse(data);
}
function writeUsers(users) {
  fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
}

//____________________1__add user____________________//

app.post('/user', (req, res) => {
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
        return res.status(400).json({ message: "Name, email, and age are required" });
    }
    const users = readUsers();
    const emailExists = users.find((u) => u.email === email);
    if (emailExists) {
        return res.status(400).json({ message: "email already exists" });
    }
    const newUser = {
        id: Date.now().toString().slice(-7),
        name,
        email,
        age
    };
    users.push(newUser);
    writeUsers(users);

    res.status(201).json({message: "User added successfully"});
});
//____________________2__edit user____________________//

app.patch('/user/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const users = readUsers();
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    const emailExists = users.find((u) => u.email === email); 
    if (emailExists) {
        return res.status(400).json({ message: "email already exists" });
    }
    if (email) users[userIndex].email = email;
    if (name) users[userIndex].name = name;
    if (age) users[userIndex].age = age;
    writeUsers(users);
    res.json({ message: "User updated successfully" });
});

//____________________3__delete user____________________//

app.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    const users = readUsers();
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    users.splice(userIndex, 1);
    writeUsers(users);
    res.json({ message: "User deleted successfully" });
});

//____________________4__get user by name____________________//

app.get('/user/getByName', (req, res) => {
    const { name } = req.query;
    const users = readUsers();
    const user = users.find((u) => u.name === name);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
});

//____________________5__get all users____________________//

app.get('/users', (req, res) => {
    const users = readUsers();
    res.json(users);
});

//____________________6__filter users with minimum age____________________//

app.get('/users/filter', (req, res) => {
    const { minAge } = req.query;
    const users = readUsers();
    const filteredUsers = users.filter((u) => u.age >= parseInt(minAge));
    if(filteredUsers.length === 0){
        return res.status(404).json({ message: "No users found" });
    }
    res.json(filteredUsers);
});

//____________________7__get user by ID____________________//

app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    const users = readUsers();
    const user = users.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});