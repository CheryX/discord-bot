import Canvas from 'canvas'; 
import textBox from './lib/textBox.mjs';
import skin from './lib/drawSkin.mjs';
import minecraftColors from './lib/colors/minecraft.mjs';
import fs from 'fs';

// Register Minecraft Font
Canvas.registerFont('./assets/fonts/Minecraftia.otf', { family: 'Minecraft' })
Canvas.registerFont('./assets/fonts/MinecraftiaBold.otf', { family: 'Minecraft' })

// Create a new canvas
const canvas = new Canvas.createCanvas(1000, 300);
const ctx = canvas.getContext('2d');

// Create template from template.png
const template = new Canvas.Image();
template.src = fs.readFileSync('./assets/images/template.png');
ctx.drawImage(template, 0, 0);

// Create a new textbox
let username = [
    {
        text: '[MVP',
        color: minecraftColors.aqua,
        shadow: {
            x: 10, y: 10, blur: 0, color: minecraftColors.shadow.aqua,
        }
    },
    {
        text: '+',
        color: minecraftColors.yellow,
        shadow: {
            x: 10, y: 10, blur: 0, color: minecraftColors.shadow.yellow,
        }
    },
    {
        text: '] electropirat.github.io',
        color: minecraftColors.aqua,
        shadow: {
            x: 10, y: 10, blur: 0, color: minecraftColors.shadow.aqua,
        }
    }
];

new textBox(230, 80, 300, 70, username, 90, 'Minecraft').draw(ctx);


ctx.drawImage(new skin(32, 'CheryX'), 500, 500);

// Export the canvas to a file
const out = fs.createWriteStream('./test.png');
const stream = canvas.createPNGStream();
stream.pipe(out);