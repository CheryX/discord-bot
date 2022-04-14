// Import tokens from .env
import dotenv from 'dotenv';
dotenv.config();

// Import the modules
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import log from './lib/logging.mjs';

const guildId = '740228240286679101';

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), { body: commands })
	.then(() => log.success('Successfully registered application commands.'))
	.catch((e) => log.error(e));