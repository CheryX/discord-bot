import Canvas from 'canvas';
import fs from 'fs';

class skin {
    constructor(size, username) {
        this.size = size;
        this.username = username;

        // Create a new canvas
        let canvas = new Canvas.createCanvas(16*this.size, 32*(Math.sqrt(3)/3)*this.size);
        let ctx = canvas.getContext('2d');

        // Ratio between the diagonals = 1/Math.sqrt(3);
        const ratio = 0.5773502691896258;

        // Disable smoothing
        ctx.patternQuality = 'fast';

        // Import skin from skin.png (Temp)
        let skin = new Canvas.Image();
        skin.src = fs.readFileSync('./assets/images/skin.png');
        
        // Draw the top
        ctx.setTransform(1, -ratio, 1, ratio, 0, 0);
        ctx.drawImage(skin, 8, 0, 8, 8, -this.size * 4 - 1, this.size * 4, 8*this.size, 8*this.size + 1.5);
        ctx.drawImage(skin, 32+8, 0, 8, 8, -this.size * 4 - 1, this.size * 4, 8*this.size, 8*this.size + 1.5);

        // Draw the right side
        ctx.setTransform(-1, ratio, 0, 2 * ratio, 8*this.size * 2, 0);
        ctx.drawImage(skin, 8, 8, 8, 8, 0, this.size * 4, 8*this.size, 8*this.size);
        ctx.drawImage(skin, 32+8, 8, 8, 8, 0, this.size * 4, 8*this.size, 8*this.size);

        // Draw the left side
        ctx.setTransform(1, ratio, 0, 2 * ratio, 0, 0);
        ctx.drawImage(skin, 0, 8, 8, 8, 0, this.size * 4, 8*this.size, 8*this.size);
        ctx.drawImage(skin, 32, 8, 8, 8, 0, this.size * 4, 8*this.size, 8*this.size);
        
        return canvas;
    }
}

export default skin;


