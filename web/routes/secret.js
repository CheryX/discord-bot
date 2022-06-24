import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
    res.send("<h1>Secret website</h1> <hr> <p>That's a secret!</p>");
});

export default {
    path: '/secret',
    router
}