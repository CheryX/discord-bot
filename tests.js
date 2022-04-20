// Warning: Do not test Hypixel API calls since you don't have an API key

import Canvas from "canvas";
import { textBox } from "cherry-box";
import fs from "fs";

let canvas = Canvas.createCanvas(800, 600);
let ctx = canvas.getContext('2d');

// Testing textBox
textBox(ctx, 0, 0, 800, 600, [{
    text: 'awesome text',
    color: '#fff',
    font: 'Minecraft',
    shadow: {
        color: '#f00',
        offset: [0, 0],
        blur: 5
    }
}], 80, ['middle', 'center']);

// Output the image to a file
const out = fs.createWriteStream('./output.png');
const stream = canvas.createPNGStream();
stream.pipe(out);