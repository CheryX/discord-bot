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
            fontSize *= this.width / textWidth;
        }
        ctx.font = fontSize + "px " + fontName;
        
        // Center text
        ctx.textBaseline = 'middle'; 

        let textHeight = this.getTotalHeight(ctx);
        textWidth = this.getTotalWidth(ctx);

        // Calculate the position of the text
        if (this.align[1] === 'center') {
            this.x += this.width / 2 - textWidth / 2;
        } else if (this.align[1] === 'right') {
            this.x += this.width - textWidth;
        }

        if (this.align[0] === 'top') {
            this.y += this.height / 2 - textHeight / 2;
        } else if (this.align[0] === 'bottom') {
            this.y += this.height;
        } else if (this.align[0] === 'middle') {
            this.y += ( this.height / 2 - textHeight / 2 + this.height) / 2;
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

    getTotalHeight(ctx) {

        // Add text together to get the total height
        let words = "";
        this.text.forEach(({ text }) => {
            words += text;
        });

        let metrics = ctx.measureText(words);
        let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

        return actualHeight;
    }
    
}

export default textBox;
