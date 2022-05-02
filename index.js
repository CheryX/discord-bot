import dotenv from 'dotenv';
dotenv.config();

import { Client, Intents, Collection }  from 'discord.js';
import fs from 'fs';
import log from './lib/logging.js';
import startExpress from './web/index.js';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Command handler from https://discordjs.guide/creating-your-bot/command-handling.html
for (const file of commandFiles) {
	const command = await import(`./commands/${file}`);
	client.commands.set(command.default.data.name, command.default);
}

client.once('ready', () => {

	console.log(`
		\u001b[31m:::    ::: :::   ::: \u001b[39m::::::::::: ::::::::  ::::::::: :::::::::::     :::      :::::::: ™ 
		\u001b[31m:+:    :+: :+:   :+: \u001b[39m    :+:    :+:    :+: :+:    :+:    :+:       :+: :+:   :+:    :+: 
		\u001b[31m+:+    +:+  +:+ +:+  \u001b[39m    +:+    +:+    +:+ +:+    +:+    +:+      +:+   +:+  +:+        
		\u001b[31m+#++:++#++   +#++:   \u001b[39m    +#+    +#+    +:+ +#++:++#+     +#+     +#++:++#++: +#++:++#++ 
		\u001b[31m+#+    +#+    +#+    \u001b[39m    +#+    +#+    +#+ +#+    +#+    +#+     +#+     +#+        +#+ 
		\u001b[31m#+#    #+#    #+#    \u001b[39m    #+#    #+#    #+# #+#    #+#    #+#     #+#     #+# #+#    #+# 
		\u001b[31m###    ###    ###    \u001b[39m    ###     ########  ######### ########### ###     ###  ######## 

		Username: \u001b[31m${client.user.tag}\u001b[39m | ID: \u001b[31m${client.user.id}\u001b[39m
		Servers: \u001b[31m${client.guilds.cache.size}\u001b[39m | Users: \u001b[31m${client.users.cache.size}\u001b[39m | Channels: \u001b[31m${client.channels.cache.size}\u001b[39m | Shards: \u001b[31m${client.ws.totalShards} \u001b[39m

		========================================================================================
	`.replaceAll('	', '')); // Just a fancy console.log

	startExpress();

});

client.on('interactionCreate', async interaction => {

	// [DEBUG] Log commands
	log.debug(`${interaction.user.tag} used command ${interaction}`);

	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		log.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

client.login(process.env.TOKEN);

// Catch errors to console, instead of crashing
process.on('uncaughtException', function (err) {
	log.error(err.message);
});