class coloredText {
    constructor(text, x, y, font, shadow) {
        this.text = text; // Custom text schema
        this.x = x;
        this.y = y;
        this.font = font; 
    }

    paint(ctx) {

        let x = this.x;
        let y = this.y;

        ctx.save();

        // Fill text with color 
        this.text.forEach(({ text, color, shadow }) => {

            // Set up properties
            ctx.fillStyle = color;
            ctx.font = this.font;

            if (shadow) {
                let fontSize = parseInt(this.font.split(' ')[0]); 

                // Set up shadow properties
                ctx.shadowColor = shadow.color;
                ctx.shadowOffsetX = shadow.x * fontSize / 100;
                ctx.shadowOffsetY = shadow.y * fontSize / 100;
                ctx.shadowBlur = shadow.blur;
            }
            
            // Fill the text
            ctx.fillText(text, x, y);


            // Add offset
            x += ctx.measureText(text).width;
        });

        ctx.restore();
    }

}

export default coloredText;