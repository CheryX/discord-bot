import Canvas from 'canvas'; 
import textBox from './lib/textBox.mjs';
import fs from 'fs';

// Create a new canvas
const canvas = new Canvas.createCanvas(500, 100);
const ctx = canvas.getContext('2d');

// Create background
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

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
        text: 'WORKING!',
        color: '#0000ff',
    }
];

new textBox(0, 0, 500, 100, username, 100, 'Arial').draw(ctx);

// Export the canvas to a file
const out = fs.createWriteStream('./test.png');
const stream = canvas.createPNGStream();
stream.pipe(out);