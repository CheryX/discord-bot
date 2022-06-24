
// Import the modules
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import fs from "fs";
import config from './config.js';

import log4js from "log4js"
const logger = log4js.getLogger();

logger.level = "info";

// Test server id
const guildId = '740228240286679101';

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {

	const command = await import(`./commands/${file}`);
	commands.push(command.default.data.toJSON());

}


const rest = new REST({ version: '9' }).setToken(config.token);

rest.put(
	//Routes.applicationGuildCommands(config.clientID, guildId), // Guild Commands
	Routes.applicationCommands(config.clientID), // Application Commands
	{ body: commands })
	.then(() => logger.info('Successfully registered application commands.'))
	.catch((e) => logger.error(e));
