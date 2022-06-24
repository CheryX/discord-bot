# discord-bot-example

This is an example for a discord bot made in `JavaScript` using `discord.js` and `express`

The template has:
* Discord bot made in `discord.js`
* A website on a custom port using `express`
* Clean logging system
* Adding custom commands just by adding one file in `/commands`
* Adding custom sites by adding a file in `/web/routes`

## Launching the bot

1. `npm run slash` - Launch it when you want to update slash command.
2. `npm start` - Launches the bot

## Cloning

You need to create `config.js` file in the repo directory.

Created `config.js` should look something like this:

```js
export default {
    token: "your token",
    clientSecret: "client secret",
    clientID: "bot id as a string"
}
```

## How to add a command

In order to add a command, you need to create a new file in `/commands`.

In the file you should have an `export default` with 2 values:
* data - Command data (name, description, options)
* execute - A function that executes the command

Example command:

```js
import { SlashCommandBuilder } from '@discordjs/builders';

const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with pong! (Test command)')

async function execute(interaction) {
	await interaction.reply('Pong!');
};

export default {
	data,
	execute
};
```

## Info about a dashboard

You can also use [this template](https://github.com/CheryX/discord-auth) to create a dashboard.