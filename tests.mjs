import Canvas from 'canvas'; 
import textBox from './lib/textBox.mjs';
import drawSkin from './lib/drawSkin.mjs';
import fs from 'fs';

// Register Minecraft Font
Canvas.registerFont('./assets/fonts/Minecraftia.otf', { family: 'Minecraft' })
Canvas.registerFont('./assets/fonts/MinecraftiaBold.otf', { family: 'Minecraft' })

// Create a new canvas
const canvas = new Canvas.createCanvas(1920, 1080);
const ctx = canvas.getContext('2d');

// Create background
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Create a rectangle
ctx.fillStyle = '#000000';
ctx.strokeRect(550, 50, 500, 100);

// Create a new textbox
let username = [
    {
        text: 'THIS',
        color: '#000000',
    },
    {
        text: ' IS ',
        color: '#ff0000',
    },
    {
        text: 'AMERICA',
        color: '#0000ff',
    }
];

new textBox(550, 50, 500, 100, username, 100, 'Minecraft').draw(ctx);
ctx.drawImage(new drawSkin(32, 'CheryX'), 500, 500);

// Export the canvas to a file
const out = fs.createWriteStream('./test.png');
const stream = canvas.createPNGStream();
stream.pipe(out);