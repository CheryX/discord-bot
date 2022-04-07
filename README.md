
<div align="center">
    <br>
    <h3><b>WARNING:</b> This project is far from complete, you can always contribute!</h3>
    <br>
    <img src="https://tobiasbot.ovh/images/logo.svg">
    <br>
    <br>
    <p>
        <a href="https://discord.gg/gHBzHTr6JD"><img src="https://img.shields.io/discord/740228240286679101?color=5865F2&logo=discord&logoColor=fff"></a>
        <a href="https://github.com/CheryX/tobiasBot/actions/"><img src="https://github.com/CheryX/tobiasBot/actions/workflows/node.js.yml/badge.svg"/></a>
        <a href="https://github.com/CheryX/tobiasBot/issues"><img src="https://img.shields.io/github/issues/CheryX/tobiasBot/open.svg"/></a>
    </p>
    <br>
    <br>
</div>

An open-source version of the [tobiasBot](https://github.com/CheryX/tobiasBot) written in [Node.js](https://nodejs.org/en/about/) using [discord.js](https://github.com/discordjs/discord.js/) and [node-canvas](https://github.com/Automattic/node-canvas)


# Cloning

1. Clone using [git](https://git-scm.com/):
    ```
    git clone https://github.com/CheryX/tobiasBot.git 
    ```
2. Add `.env` file inside the cloned repository and fill it with the following values:
    ```
    TOKEN=your_token
    CLIENT_SECRET=your_client_secret (not used rn)
    API_KEY=your_hypixel_api_key 
    ```
3. Run the bot using `npm start`

# Docs

## Text schema

There is a custom text schema for the bot, its is made of multiple JSON objects. These objects accepts the following values:

name | description | example | type | required
--- | --- | --- | --- | ---
text | Text to be displayed | Hello world | string | true
color | Color of the text | #FFFFFF | string | true
shadow | Shadow of the text | | shadow | false

### Shadow schema
Shadow is a JSON object with the following values:

name | description | example | type | required
--- | --- | --- | --- | ---
color | Color of the shadow | #FFFFFF | string | true
blur | Blur of the shadow | 5 | number | true
x | X offset of the shadow | 5 | number | true
y | Y offset of the shadow | 5 | number | true

### Example text schema:
```js
    [
        {
            text: "GREEN",
            color: "#00ff00",
        },
        {
            text: "REDshadow",
            color: "#ff0000",
            shadow: {
                color: "#ff0000",
                blur: 5,
                x: 0,
                y: 0,
            },
            }
        },
        {
            text: "BLUE",
            color: "#0000ff",
        }
    ]
```

## Textbox

Texbox is a container for text, it accepts the following values:

name | description | example | type | required
--- | --- | --- | --- | ---
x | X position of the textbox | 0 | number | true
y | Y position of the textbox | 0 | number | true
width | Width of the textbox | 100 | number | true
height | Height of the textbox | 100 | number | true
text | Text to be displayed | Hello world | textSchema | true
maxFont | Max font size of the text | 100 | number | true
font | Font of the text | Arial | string | true

### Example usage of textbox

```js
new textBox(240, 85, 300, 60, text, 90, 'Arial')
    .draw(ctx);
```

## Render Skin

Render skin is a function that takes a minecraft nickname and renders it to a canvas. It accepts the following values:

name | description | example | type | required
--- | --- | --- | --- | ---
nickname | Minecraft nickname | Notch | string | true
size | Size of the skin | 100 | number | true

> The size is defined because of confusing ratio $1:\frac{2\sqrt{3}}{3}$