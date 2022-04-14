// Warning: Do not test Hypixel API calls since you don't have an API key

import Canvas from "canvas";
import textBox from "./lib/textBox.mjs";
import fs from "fs";
import generateBadge from "./lib/generator/badge.mjs";

let canvas = Canvas.createCanvas(800, 600);
let ctx = canvas.getContext('2d');

// Testing textBox
new textBox(0, 0, 800, 600, [{
    text: 'awesome text',
    color: '#fff',
    shadow: {
        color: '#f00',
        x: 0,
        y: 0,
        blur: 5
    }
}], 80, 'Arial', ['middle', 'center']).draw(ctx);

// Output the image to a file
const out = fs.createWriteStream('./output.png');
const stream = canvas.createPNGStream();
stream.pipe(out);