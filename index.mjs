// Import tokens from .env
import dotenv from 'dotenv';
dotenv.config();

// Import the modules
import { Client, Intents, Collection }  from 'discord.js';
import fs from 'fs';
import log from './lib/logging.mjs';

// Create a new client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Set up commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.mjs'));

// Command handler from https://discordjs.guide/creating-your-bot/command-handling.html
for (const file of commandFiles) {
    // Import the command using import
    const command = await import(`./commands/${file}`);

    // Set the command name to the command
    client.commands.set(command.default.data.name, command.default);
}

//Display basic info on ready
client.once('ready', () => {

    // *fancy*
    console.log(`
        \u001b[31m:::    ::: :::   ::: \u001b[39m::::::::::: ::::::::  ::::::::: :::::::::::     :::      ::::::::  
        \u001b[31m:+:    :+: :+:   :+: \u001b[39m    :+:    :+:    :+: :+:    :+:    :+:       :+: :+:   :+:    :+: 
        \u001b[31m+:+    +:+  +:+ +:+  \u001b[39m    +:+    +:+    +:+ +:+    +:+    +:+      +:+   +:+  +:+        
        \u001b[31m+#++:++#++   +#++:   \u001b[39m    +#+    +#+    +:+ +#++:++#+     +#+     +#++:++#++: +#++:++#++ 
        \u001b[31m+#+    +#+    +#+    \u001b[39m    +#+    +#+    +#+ +#+    +#+    +#+     +#+     +#+        +#+ 
        \u001b[31m#+#    #+#    #+#    \u001b[39m    #+#    #+#    #+# #+#    #+#    #+#     #+#     #+# #+#    #+# 
        \u001b[31m###    ###    ###    \u001b[39m    ###     ########  ######### ########### ###     ###  ######## 

        Username: \u001b[31m${client.user.tag}\u001b[39m
        ID: \u001b[31m${client.user.id}\u001b[39m
        Shards: \u001b[31m${client.ws.totalShards}\u001b[39m
    
        Servers: \u001b[31m${client.guilds.cache.size}\u001b[39m | Users: \u001b[31m${client.users.cache.size}\u001b[39m | Channels: \u001b[31m${client.channels.cache.size}\u001b[39m

        ========================================================================================
    `);

});

// On Slash Command
client.on('interactionCreate', async interaction => {

    // [DEBUG] Log commands
    log.debug(`${interaction.user.tag} used command ${interaction}`);

    // If the interaction is a Slash Command
	if (!interaction.isCommand()) return;

    // Get the command name
	const command = client.commands.get(interaction.commandName);
	if (!command) return;

    // Execute the command
	try {
		await command.execute(interaction);
	} catch (error) {
		log.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

// Login to Discord
client.login(process.env.TOKEN);

// Catch errors to console, instead of crashing
process.on('uncaughtException', function (err) {
    log.error(err.message);
});