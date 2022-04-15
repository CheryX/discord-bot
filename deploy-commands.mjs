// Import tokens from .env
import dotenv from 'dotenv';
dotenv.config();

// Import the modules
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import log from './lib/logging.mjs';
import fs from 'fs';

const guildId = '740228240286679101';

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.mjs'));

for (const file of commandFiles) {

	// Import the command using import
	const command = await import(`./commands/${file}`);

	// Set the command name to the command
	commands.push(command.default.data.toJSON());
}


const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.put(
	//Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), // Guild Commands
	Routes.applicationCommands(process.env.CLIENT_ID), // Application Commands
	{ body: commands })
	.then(() => log.success('Successfully registered application commands.'))
	.catch((e) => log.error(e));
