import express from 'express';
import generateBadge from '../../lib/generator/badge.js';
import fetch from 'node-fetch';
const router = express.Router();

router.get("/:username", async (req, res) => {

    // Check if username is valid
    const username = req.params.username;
	let uuid;

    if (username != undefined) {

        if (username.length <= 16) {
            let mcResponse = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
    
            // Check if Mojang API is working
            if (mcResponse.status == 200) {
                let minecraftData = await mcResponse.json();
                
                //If the user doesn't exist 
                if (minecraftData.error == "BadRequestException") {
                    return res.status(400).send("Invalid username")
                }
                
                uuid = minecraftData.id;
            } else {
                return res.status(400).send("Mojang API is not working")
            }
        } else {
            return res.status(400).send("Too long username")
        }

    } else {
        return res.status(400).send("Username is not defined")
    }

	let png = await generateBadge(username);
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': png.length
    });
    res.end(png); 
});

export default {
    path: '/api/badge/',
    router
}