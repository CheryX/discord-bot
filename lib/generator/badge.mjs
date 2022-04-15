// Some sort of unit tests
// WARNING! DO NOT TEST HYPIXEL API SINCE THERE IS NO API KEY

import Canvas from 'canvas'; 
import textBox from '../textBox.mjs';
import drawSkin from '../hypixel/createSkin.mjs';
import { getNickname } from '../hypixel/userProfile.mjs';
import profile from '../hypixel/playerData.mjs';
import fs from 'fs';
import mcColors from '../colors/minecraft.mjs';

// Register Minecraft Font
Canvas.registerFont('./assets/fonts/Minecraftia.otf', { family: 'Minecraft' })
Canvas.registerFont('./assets/fonts/MinecraftiaBold.otf', { family: 'MinecraftBold' })

/**
 * 
 * @param {string} username 
 * @returns 
 */
async function generateBadge(username) {

    // Create a new canvas
    const canvas = new Canvas.createCanvas(800, 420);
    const ctx = canvas.getContext('2d');
    
    // Create template from template.png
    const template = new Canvas.Image();
    template.src = fs.readFileSync('./assets/images/template.png');
    ctx.drawImage(template, 0, 0);
    
    // Get Hypixel data
    let userProfile = await profile(username);
    let coloredUsername = await getNickname(username);
    if (userProfile == undefined || coloredUsername == undefined) {
        return;
    }
    
    // Rank with nickname
    new textBox(269, 95, 250, 39, coloredUsername, 80, 'Minecraft', ['bottom', 'left']).draw(ctx);
    
    // Render skin
    let mcSkin = await drawSkin(9, username);
    await ctx.drawImage(mcSkin, 93, 70);
    
    // Bars for the XP and achievements
    let xpPercentage = userProfile.level - Math.floor(userProfile.level);
    ctx.fillStyle = '#BEFFBD';
    ctx.fillRect(265, 147, (xpPercentage * 275), 24);
    
    let badgePercentage = userProfile.badges.length / 7;
    ctx.fillStyle = '#BDDFFF';
    ctx.fillRect(265, 174, (badgePercentage * 207), 24);
    
    // Labels for the XP and achievements
    new textBox(272, 147, 250, 20, [{
        text: `${Math.floor(userProfile.level)} LVL (${(xpPercentage*100).toFixed(2)}% XP)`,
        color: '#ffffff',
        shadow: {
            color: '#555555',
            x: 10,
            y: 10,
            blur: 5
        }
    }], 20, 'MinecraftBold', ['middle', 'left']).draw(ctx);

    new textBox(272, 174, 250, 20, [{
        text: `${userProfile.badges.length} Badges (${(badgePercentage*100).toFixed(2)}%)`,
        color: '#ffffff',
        shadow: {
            color: '#555555',
            x: 10,
            y: 10,
            blur: 5
        }
    }], 20, 'MinecraftBold', ['middle', 'left']).draw(ctx);
    
    // Get online status
    const statusBadge = new Canvas.Image();

    // Get status badge
    let status;
    if (userProfile.status.online) {
        status = 'online';
        if (userProfile.status.mode != 'LOBBY') {
            status = 'playing';
        }
    
        // if someone knows how to check if the player is in limbo, please let me know (e.g. add a comment)
        if (userProfile.status.mode == 'LIMBO') {
            status = 'limbo';
        }
    } else {
        status = 'offline'; 
    }
    
    ctx.patternQuality = 'fast';

    statusBadge.src = fs.readFileSync(`./assets/images/status/${status}.png`);
    ctx.drawImage(statusBadge, 217, 200, 37, 37);

    new textBox(570, 77, 192, 27, [{
            text: `[${userProfile.guild.tag}] ${userProfile.guild.name}`,
            color: mcColors[userProfile.guild.tagColor],
            shadow: {
                color: mcColors.shadow[userProfile.guild.tagColor],
                x: 10,
                y: 10,
                blur: 0
            }
    }], 20, 'Minecraft', ['middle', 'center']).draw(ctx);
    
    new textBox(563, 155, 192, 27, [{
        text: userProfile.friends.length,
        color: mcColors.aqua,
        shadow: {
            color: mcColors.shadow.aqua,
            x: 10,
            y: 10,
            blur: 0
        }
    }], 40, 'Minecraft', ['middle', 'center']).draw(ctx);
    
    new textBox(563, 240, 192, 27, [{
        text: userProfile.karma,
        color: mcColors.light_purple,
        shadow: {
            color: mcColors.shadow.light_purple,
            x: 10,
            y: 10,
            blur: 0
        }
    }], 30, 'Minecraft', ['middle', 'center']).draw(ctx);

    // Display badges
    let allBadges = [
        'experienced',
        'guildMaster',
        'timePlayed',
        'bedwars',
        'skywars',
        'duels',
        'skyblock',
    ]

    for (let i in allBadges) {
        let badge = new Canvas.Image();

        // Check if the user had unlocked the badge
        if (userProfile.badges.includes(allBadges[i])) {
            badge.src = fs.readFileSync(`./assets/images/badges/${i}.png`);
        } else {
            badge.src = fs.readFileSync(`./assets/images/badges/d${i}.png`);
        }

        ctx.drawImage(badge, (i * 88) + 106, 320, 64, 64);
    }

    // Return the image in png
    return canvas.toBuffer();
}

export default generateBadge;