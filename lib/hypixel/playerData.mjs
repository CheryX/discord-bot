import fetch from 'node-fetch';
import { getRank } from './userProfile.mjs';

// Import api key from .env
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.API_KEY;

async function getPlayerProfile(username) {

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
        if (data.success) {

            let onlineData = await fetch(`https://api.hypixel.net/status?key=${apiKey}&uuid=${uuid}`);
            let guildData = await fetch(`https://api.hypixel.net/guild?key=${apiKey}&player=${uuid}`);
            let friendsData = await fetch(`https://api.hypixel.net/friends?key=${apiKey}&uuid=${uuid}`);
            
            let onlineResponse = await onlineData.json();
            let guildResponse = await guildData.json();
            let friendsResponse = await friendsData.json();

            // Get rank info using getRank()
            let rankInfo = getRank(data);

            // Get network xp
            let networkXp = data.player.networkExp;
            let networkLevel = 0.02 * ( Math.sqrt(2 * networkXp + 30625) - 125)

            // Get guild info
            let guild = {
                name: guildResponse.guild.name,
                tag: guildResponse.guild.tag,
                tagColor: guildResponse.guild.tagColor.toLowerCase(),
                xp: guildResponse.guild.exp,
            }

            // Get online status
            let status = {
                online: onlineResponse.session.online,
                mode: onlineResponse.session.mode,
                game: onlineResponse.session.gameType,
                map: onlineResponse.session.map,
            }

            // Get friends
            let friends = []

            for (let i = 0; i < friendsResponse.records.length; i++) {

                // Get friend's uuid
                let friendUuid = "";

                // Compare sender and receiver to get the correct uuid
                if (friendsResponse.records[i].uuidSender == uuid) {
                    friendUuid = friendsResponse.records[i].uuidReceiver;
                } else {
                    friendUuid = friendsResponse.records[i].uuidSender;
                }

                // Add friend to friends array
                friends.push(friendUuid);

            }

            return {

                username: data.player.displayname,
                uuid: data.player.uuid,
                
                rank: rankInfo,
                xp: data.player.networkExp,
                level: networkLevel,
                achievementPoints: data.player.achievementPoints,
                karma: data.player.karma,

                guild: guild,
                status: status,
                friends: friends,

                badges: ['TODO']
            
            }
        }
    }
}

export default getPlayerProfile;