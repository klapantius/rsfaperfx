const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const { Test, Upload } = require('./api/db');

app.prepare().then(() => {
    const server = express();

    server.get('/api/db', async (req, res) => {
        res.send(await Test());
    });

    server.get('/api/upload', async (req, res) => {
        res.send(await Upload());
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });
    const port = process.env.PORT || 3000;

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on port ${port}...`);
    });
});