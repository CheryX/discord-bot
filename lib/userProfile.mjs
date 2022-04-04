import fetch from 'node-fetch';
import minecraftColors from './colors/minecraft.mjs';

// Import api key from .env
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.API_KEY;

async function getSkin(username) {

    let mcResponse = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);

    // Check if Mojang API is working
    if (mcResponse.status == 200) {
        let minecraftData = await mcResponse.json();
        
        //If the user doesn't exist 
        if (minecraftData.error == "BadRequestException") {
            return 0;
        }
        
        let uuid = minecraftData.id;
        let userProfile = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`); 
        let profileData = await userProfile.json();

        // Doublechecking moment
        if (userProfile.status == 200) {

            // Get the skin data
            let skinData = await profileData.properties[0].value;
            
            // Decode the skin data from base64
            let decodedSkin = JSON.parse(atob(skinData)).textures.SKIN.url;
            
            // Get the skin image from the link
            let skinImage = await fetch(decodedSkin);
            skinImage = await skinImage.buffer();

            return skinImage

        }
    }

    // If the user doesn't exist or Mojang API is not working
    return 0;

}

// Get colored nickname on Hypixel
async function getNickname(username) {
    
    return [
        {
            text: '[MVP',
            color: minecraftColors.aqua,
            shadow: {
                x: 10, y: 10, blur: 0, color: minecraftColors.shadow.aqua,
            }
        },
        {
            text: '+',
            color: minecraftColors.red,
            shadow: {
                x: 10, y: 10, blur: 0, color: minecraftColors.shadow.red,
            }
        },
        {
            text: '] ' + username,
            color: minecraftColors.aqua,
            shadow: {
                x: 10, y: 10, blur: 0, color: minecraftColors.shadow.aqua,
            }
        }
    ];

}

export {
    getSkin,
    getNickname
};