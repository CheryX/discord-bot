import fetch from 'node-fetch';
import minecraftColors from '../colors/minecraft.mjs';

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

// Get rank info on Hypixel
function getRank(data) {

    /*

    How to get the rank:
    
    1. `packageRank` Permanent ranks before 2016 EULA update 
    2. `newPackageRank` New ranks like "VIP_PLUS" after 2016 EULA update
    3. `monthlyPackageRank` for monthly ranks like "MVP++" (aka. "SUPERSTAR")
    4. `data.player.rank` for special ranks like "Admin", "Youtube" etc.
    5. Hardcode if the player has special ranks e.g. "PIG+++", "Slothpixel"
    6. `data.player.rankPlusColor` if the rank has "+" in it.

    Thank you Hypixel :heart:

    */

    let rank = data.player.packageRank;
    let newRank = data.player.newPackageRank;
    let monthlyRank = data.player.monthlyPackageRank;
    let specialRank = data.player.rank;

    // If the user logged in at least once since 2016
    if (newRank != null) {
        rank = newRank;
    }
    
    // If the user has a monthly rank
    if (monthlyRank != null && monthlyRank != "NONE") {
        rank = monthlyRank;
    }
    
    // If the user has a special rank
    if (specialRank != null && specialRank != "NONE") {
        rank = specialRank;
    }
    
    // Get full rank name
    let formattedRank = "";

    switch (rank) {
        
        case "VIP": formattedRank = "[VIP]"; break;
        case "VIP_PLUS": formattedRank = "[VIP+]"; break;
        case "MVP": formattedRank = "[MVP]"; break;
        case "MVP_PLUS": formattedRank = "[MVP+]"; break;
        case "SUPERSTAR": formattedRank = "[MVP++]"; break;
        case "YOUTUBER": formattedRank = "[YOUTUBE]"; break;
        case "ADMIN": formattedRank = "[ADMIN]"; break;
        
    }
    
    // Getting Technoblade's custom rank
    if (data.player.uuid == "b876ec32e396476ba1158438d83c67d4") formattedRank = "[PIG+++]"
    
    // Get color of the rank
    let color = "gray";
    
    switch (formattedRank) {
        
        case "[VIP]": color = "green"; break;
        case "[VIP+]": color = "green"; break;
        case "[MVP]": color = "aqua"; break;
        case "[MVP+]": color = "aqua"; break;
        case "[MVP++]": color = "gold"; break;
        case "[YOUTUBE]": color = "red"; break;
        case "[ADMIN]": color = "red"; break;
        case "[OWNER]": color = "red"; break;
        case "[PIG+++]": color = "light_purple"; break;
        
    }
    
    let plusColor = color;

    // If the rank has a + in it
    if ( formattedRank.includes("+") ) {

        // Get the color of the plusses
        plusColor = data.player.rankPlusColor.toLowerCase();

        
        // If the user has a pig rank
        if ( formattedRank == "[PIG+++]" ) {
            plusColor = "dark_purple";
        }
        
    }

    return {
        rank: formattedRank,
        color: color,
        plusColor: plusColor
    }

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
    getNickname,
    getRank
};