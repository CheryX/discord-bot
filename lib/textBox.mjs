import coloredText from './coloredText.mjs'; 

class textBox {
    constructor(x, y, width, height, text, fontSize, font) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text; // Custom text schema
        this.fontSize = fontSize;
        this.font = font;
    }

    draw(ctx) {

        ctx.save();
        
        // Set up the font
        let fontSize = this.fontSize;
        let font = fontSize + "px " + this.font;
        ctx.font = font;

        // Resize the textbox if the text is too long
        let textWidth = this.getTotalWidth(ctx);
 
        // Change font to the new size
        if (textWidth > this.width) {
            fontSize = fontSize * this.width / textWidth;
        }
        ctx.font = fontSize + "px " + this.font;

        // Set up basic settings
        ctx.fillStyle = this.color;
        
        // Center text
        ctx.textBaseline = 'middle'; 

        textWidth = this.getTotalWidth(ctx);

        // Calculate the position of the text
        let x = this.x + this.width / 2 - textWidth / 2;
        let y = this.y + this.height / 2;

        // Draw the text and return
        new coloredText(this.text, x, y, ctx.font).paint(ctx);
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
