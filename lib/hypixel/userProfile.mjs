import fetch from 'node-fetch';
import minecraftColors from '../colors/minecraft.mjs';
import { getRank } from './playerData.mjs';

// Import api key from .env
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.API_KEY;

/**
 * 
 * @param {string} username 
 * @returns canvas
 */
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
    
    let mcResponse = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);

    // Check if Mojang API is working
    if (mcResponse.status == 200) {
        let minecraftData = await mcResponse.json();
        
        //If the user doesn't exist 
        if (minecraftData.error == "BadRequestException") {
            return 0;
        }
        
        let uuid = minecraftData.id;
        
        let response = await fetch(`https://api.hypixel.net/player?key=${apiKey}&uuid=${uuid}`);
        let data = await response.json();

        // Check if Hypixel API is working and if the user exists
        if (data.success && data.player != undefined) {
            
            // Get rank info using getRank()
            let rankInfo = getRank(data);

            let formattedRank = rankInfo.rank;
            let color = rankInfo.color;
            let plusColor = rankInfo.plusColor;

            // Separate plusses since they might have a different color
            let splitPlace = formattedRank.search(/\+/);
            let plusCount = formattedRank.split("+").length-1;
            
            // Create textObject
            let textObject = [
                {
                    text: formattedRank.substring(0, splitPlace),
                    color: minecraftColors[color],
                    shadow: {
                        color: minecraftColors.shadow[color],
                        x: 10,
                        y: 10,
                        blur: 0
                    }
                },
                {
                    text: formattedRank.substring(splitPlace, splitPlace+plusCount),
                    color: minecraftColors[`${plusColor}`],
                    shadow: {
                        color: minecraftColors.shadow[plusColor],
                        x: 10,
                        y: 10,
                        blur: 0
                    }
                },
                {
                    text: formattedRank.substring(splitPlace+plusCount) + " ",
                    color: minecraftColors[color],
                    shadow: {
                        color: minecraftColors.shadow[color],
                        x: 10,
                        y: 10,
                        blur: 0
                    }
                },
                {
                    text: data.player.displayname,
                    color: minecraftColors[color],
                    shadow: {
                        color: minecraftColors.shadow[color],
                        x: 10,
                        y: 10,
                        blur: 0
                    }
                }
            ]

            return textObject;

        }
    }

}

export {
    getSkin,
    getNickname
};