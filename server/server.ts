import * as next from "next";
import * as express from "express";
import { Test, Upload } from './api/dbutils';

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.get('/api/db', async (req, res) => {
        console.log(req.path)
        res.send(await Test());
    });

    server.get('/api/upload', async (req, res) => {
        console.log(req.path)
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
