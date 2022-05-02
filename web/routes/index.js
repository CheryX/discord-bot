import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
    res.send("<h1>Main website</h1> <hr> <p>This is the main website</p>");
});

export default {
    path: '/',
    router
}