// Some sort of unit tests

import Canvas from 'canvas'; 
import textBox from './lib/textBox.mjs';
import drawSkin from './lib/drawSkin.mjs';
import { getNickname } from './lib/userProfile.mjs';
import fs from 'fs';

// Register Minecraft Font
Canvas.registerFont('./assets/fonts/Minecraftia.otf', { family: 'Minecraft' })
Canvas.registerFont('./assets/fonts/MinecraftiaBold.otf', { family: 'Minecraft' })

// Create a new canvas
const canvas = new Canvas.createCanvas(1000, 300);
const ctx = canvas.getContext('2d');

// Create template from template.png
const template = new Canvas.Image();
template.src = fs.readFileSync('./assets/images/template2.png');
ctx.drawImage(template, 0, 0);

// Set up nickname
let username = 'gdcolon';
let coloredUsername = await getNickname(username);

// Create a new textbox
new textBox(238, 100, 280, 40, coloredUsername, 90, 'Minecraft', 'center').draw(ctx);

// Draw outline
ctx.strokeStyle = '#000000';
ctx.lineWidth = 2;
ctx.strokeRect(238, 100, 280, 40);

// Test drawSkin
let mcSkin = await drawSkin(8, username);
await ctx.drawImage(mcSkin, 75, 77);

// Export the canvas to a file
const out = fs.createWriteStream('./test.png');
const stream = canvas.createPNGStream();
stream.pipe(out);