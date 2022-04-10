// Some sort of unit tests
// WARNING! DO NOT TEST HYPIXEL API SINCE THERE IS NO API KEY

import Canvas from 'canvas'; 
import textBox from './lib/textBox.mjs';
import drawSkin from './lib/hypixel/drawSkin.mjs';
import { getNickname } from './lib/hypixel/userProfile.mjs';
import profile from './lib/hypixel/playerData.mjs';
import fs from 'fs';

// Register Minecraft Font
Canvas.registerFont('./assets/fonts/Minecraftia.otf', { family: 'Minecraft' })
Canvas.registerFont('./assets/fonts/MinecraftiaBold.otf', { family: 'MinecraftBold' })

// Create a new canvas
const canvas = new Canvas.createCanvas(1000, 300);
const ctx = canvas.getContext('2d');

// Create template from template.png
const template = new Canvas.Image();
template.src = fs.readFileSync('./assets/images/template2.png');
ctx.drawImage(template, 0, 0);

// Just to make sure that it won't test the API (advanced tests coming soon)
if (false) {

    // Set up nickname
    let username = 'electruuu';
    let coloredUsername = await getNickname(username);
    
    // Create a new textbox
    new textBox(238, 95, 290, 38, coloredUsername, 90, 'Minecraft', ['bottom', 'left']).draw(ctx);
    
    // Test drawSkin
    let mcSkin = await drawSkin(8, username);
    await ctx.drawImage(mcSkin, 75, 77);
    
    let userProfile = await profile(username);
    console.log(userProfile)
    
    // Create XP text
    ctx.font = '20px MinecraftBold';
    ctx.fillStyle = '#ffffff';
    
    let xpFormatted = [
        {
            text: `${Math.floor(userProfile.level)} LVL (${(100*userProfile.level - 100*Math.floor(userProfile.level)).toFixed(2)}% XP)`,
            color: '#ffffff',
            shadow: {
                color: '#555555',
                x: 10,
                y: 10,
                blur: 0
            }
        }
    ]
    
    let achievements = [
        {
            text: `${userProfile.badges.length} Badges (-40%)`,
            color: '#ffffff',
            shadow: {
                color: '#555555',
                x: 10,
                y: 10,
                blur: 0
            }
        }
    ]
    
    new textBox(240, 165, 250, 20, xpFormatted, 20, 'MinecraftBold', ['center', 'left']).draw(ctx);
    new textBox(240, 188, 250, 20, achievements, 15, 'MinecraftBold', ['center', 'left']).draw(ctx);
    
    let scaled = new Canvas.createCanvas(4000, 1200);
    let scaledCtx = scaled.getContext('2d');
    scaledCtx.drawImage(canvas, 0, 0, 4000, 1200);
    
    // Export the canvas to a file
    const out = fs.createWriteStream('./test.png');
    const stream = scaled.createPNGStream();
    stream.pipe(out);

}