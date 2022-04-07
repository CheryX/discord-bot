import coloredText from './coloredText.mjs'; 
import Canvas from 'canvas';

class textBox {
    constructor(x, y, width, height, text, fontSize, fontName, align="center") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text; // Custom text schema
        this.fontSize = fontSize;
        this.fontName = fontName;
        this.align = align;

        // Create a new canvas
        let canvas = new Canvas.createCanvas(width, height);
        let ctx = canvas.getContext('2d');
        
        // Set up the font
        let font = fontSize + "px " + fontName;
        ctx.font = font;
        
        // Resize the textbox if the text is too long
        let textWidth = this.getTotalWidth(ctx);
    
        // Change font to the new size
        if (textWidth > this.width) {
            fontSize = fontSize * this.width / textWidth;
        }
        ctx.font = fontSize + "px " + fontName;
        
        // Center text
        ctx.textBaseline = 'middle'; 

        textWidth = this.getTotalWidth(ctx);

        // Calculate the position of the text
        this.x = this.x + this.width / 2 - textWidth / 2;

        if (this.align === 'center') {
            this.y = ((this.y + this.height / 2) + (this.y+this.height)) / 2;
        } else if (this.align === 'top') {
            this.y += this.height / 2;
        } else if (this.align === 'bottom') {
            this.y += this.height;
        }

        this.font = ctx.font;
    }

    draw(ctx) {

        ctx.save();
        
        // Draw the text and return
        new coloredText(this.text, this.x, this.y, this.font).paint(ctx);

        ctx.restore();
    }

    getTotalWidth(ctx) {

        let totalWidth = 0;
    
        // Add up the width of each word
        this.text.forEach(({ text }) => {
            totalWidth += ctx.measureText(text).width;
        });
    
        return totalWidth;
    }
    
}

export default textBox;
