// Some sort of unit tests
// WARNING! DO NOT TEST HYPIXEL API SINCE THERE IS NO API KEY

import Canvas from 'canvas'; 
import textBox from './lib/textBox.mjs';
import drawSkin from './lib/hypixel/drawSkin.mjs';
import { getNickname } from './lib/hypixel/userProfile.mjs';
import profile from './lib/hypixel/playerData.mjs';
import fs from 'fs';
import mcColors from './lib/colors/minecraft.mjs';

// Register Minecraft Font
Canvas.registerFont('./assets/fonts/Minecraftia.otf', { family: 'Minecraft' })
Canvas.registerFont('./assets/fonts/MinecraftiaBold.otf', { family: 'MinecraftBold' })

// Create a new canvas
const canvas = new Canvas.createCanvas(800, 600);
const ctx = canvas.getContext('2d');

ctx.patternQuality = 'fast';

// Create template from template.png
const template = new Canvas.Image();
template.src = fs.readFileSync('./assets/images/template.png');
ctx.drawImage(template, 0, 0);


// Just to make sure that it won't test the API (advanced tests coming soon)
if (true) {

    // Set up nickname
    let username = 'cheryx';
    let coloredUsername = await getNickname(username);

    if (coloredUsername == undefined) {
        coloredUsername = await getNickname(username);
    }
    console.log(coloredUsername);
    
    // Create a new textbox
    new textBox(269, 95, 250, 39, coloredUsername, 80, 'Minecraft', ['bottom', 'left']).draw(ctx);

    // Test drawSkin
    let mcSkin = await drawSkin(9, username);
    await ctx.drawImage(mcSkin, 93, 70);
    
    let userProfile = await profile(username);

    // Bars for the XP and achievements
    let xpPercentage = userProfile.level - Math.floor(userProfile.level);
    ctx.fillStyle = '#BEFFBD';
    ctx.fillRect(265, 147, (xpPercentage * 275), 24);

    let badgePercentage = userProfile.badges.length / 20;
    ctx.fillStyle = '#BDDFFF';
    ctx.fillRect(265, 174, (badgePercentage * 207), 24);
    
    let xpFormatted = [
        {
            text: `${Math.floor(userProfile.level)} LVL (${(xpPercentage*100).toFixed(2)}% XP)`,
            color: '#ffffff',
            shadow: {
                color: '#555555',
                x: 10,
                y: 10,
                blur: 5
            }
        }
    ]
    
    let achievements = [
        {
            text: `${userProfile.badges.length} Badges (${(badgePercentage*100).toFixed(2)}%)`,
            color: '#ffffff',
            shadow: {
                color: '#555555',
                x: 10,
                y: 10,
                blur: 5
            }
        }
    ]
    

    // Labels for the XP and achievements
    new textBox(272, 147+8, 250, 20, xpFormatted, 20, 'MinecraftBold', ['middle', 'left']).draw(ctx);
    new textBox(272, 174+8, 250, 20, achievements, 20, 'MinecraftBold', ['middle', 'left']).draw(ctx);
    
    // Get online status
    const statusBadge = new Canvas.Image();

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

    statusBadge.src = fs.readFileSync(`./assets/images/status/${status}.png`);
    
    let guild = [
        {
            text: `[${userProfile.guild.tag}] ${userProfile.guild.name}`,
            color: mcColors[userProfile.guild.tagColor],
            shadow: {
                color: mcColors.shadow[userProfile.guild.tagColor],
                x: 10,
                y: 10,
                blur: 0
            }
        }
    ]
    new textBox(570, 77, 192, 27, guild, 20, 'Minecraft', ['middle', 'center']).draw(ctx);

    let friends = [
        {
            text: userProfile.friends.length,
            color: mcColors.aqua,
            shadow: {
                color: mcColors.shadow.aqua,
                x: 10,
                y: 10,
                blur: 0
            }
        }
    ]
    new textBox(563, 171, 192, 27, friends, 40, 'Minecraft', ['middle', 'center']).draw(ctx);

    let karma = [
        {
            text: userProfile.karma,
            color: mcColors.light_purple,
            shadow: {
                color: mcColors.shadow.light_purple,
                x: 10,
                y: 10,
                blur: 0
            }
        }
    ]
    new textBox(563, 247, 192, 27, karma, 30, 'Minecraft', ['middle', 'center']).draw(ctx);

    //set shadow
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 5;
    ctx.drawImage(statusBadge, 217, 200, 37, 37);

    // Export the canvas to a file
    const out = fs.createWriteStream('./test.png');
    const stream = canvas.createPNGStream();
    stream.pipe(out);

}