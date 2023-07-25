const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const post = 3000;

app.use(bodyParser.json());

const dbPath = './backend/db.json';
let dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

app.get('/api/v1/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = dbData.users.find(user => user.id === userId);

    if (!user) {
        res.status(404).json({ error: 'User not found' });
    } else {
        res.json(user);
    }
});

app.get('/api/v1/users', (req, res) => {
    res.json(dbData.users);
});

app.post('/api/v1/users', (req, res) => {
    const newUser = req.body;
    newUser.id = dbData.users.length + 1;
    dbData.users.push(newUser);

    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    res.json(newUser);
});

app.put('/api/v1/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;
    const index = dbData.users.findIndex(user => user.id === userId);

    if (index === -1) {
        res.status(404).json({ error: 'User not found' });
    } else {
        dbData.users[index] = { ...dbData.users[index], ...updatedUser };
        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
        res.json(dbData.users[index]);
    }
});

app.delete('/api/v1/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const index = dbData.users.findIndex(user => user.id === userId);

    if (index === -1) {
        res.status(404).json({ error: 'User not found' });
    } else {
        dbData.users.splice(index, 1);
        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
        res.json({ message: 'User deleted successfully' });
    }
});

app.get('/api/v1/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = dbData.posts.find(post => post.id === postId);

    if (!post) {
        res.status(404).json({ error: 'Post not found' });
    } else {
        res.json(post);
    }
});

app.get('/api/v1/posts', (req, res) => {
    res.json(dbData.posts);
});

app.post('/api/v1/posts', (req, res) => {
    const newPost = req.body;
    newPost.id = dbData.posts.length + 1;
    dbData.posts.push(newPost);

    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    res.json(newPost);
});

app.put('/api/v1/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const updatedPost = req.body;
    const index = dbData.posts.findIndex(post => post.id === postId);

    if (index === -1) {
        res.status(404).json({ error: 'Post not found' });
    } else {
        dbData.posts[index] = { ...dbData.posts[index], ...updatedPost };
        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
        res.json(dbData.posts[index]);
    }
});

app.delete('/api/v1/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const index = dbData.posts.findIndex(post => post.id === postId);

    if (index === -1) {
        res.status(404).json({ error: 'Post not found' });
    } else {
        dbData.posts.splice(index, 1);
        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
        res.json({ message: 'Post deleted successfully' });
    }
});

app.listen(post, () => {
    console.log(`Server is running on http://localhost:${post}/`);
});
