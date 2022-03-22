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
        // pls someone rework this this is garbage
        let textWidth = new coloredText(this.text, 0, 0, font).getTotalWidth(ctx);
        while (this.width < textWidth) {

            // If the text is still too long, resize the font
            fontSize -= 1;
            
            // Update metrics
            textWidth = new coloredText(this.text, 0, 0, font).getTotalWidth(ctx);
            font = fontSize + "px " + this.font;
            
            // Change font to the new size
            ctx.font = font;
        }
        
        // Set up basic settings
        ctx.fillStyle = this.color;
        
        // Center text
        ctx.textBaseline = 'middle'; 

        // Calculate the position of the text
        let x = this.x + this.width / 2 - textWidth / 2;
        let y = this.height / 2;

        // Draw the text and return
        new coloredText(this.text, x, y, ctx.font).paint(ctx);
        ctx.restore();
    }

}

export default textBox;