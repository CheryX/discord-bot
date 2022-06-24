import { Client, Intents, Collection }  from 'discord.js';
import fs from 'fs';
import startExpress from './web/index.js';

import log4js from "log4js"
const logger = log4js.getLogger();

logger.level = "info";

import config from './config.js';
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Command handler from https://discordjs.guide/creating-your-bot/command-handling.html
for (const file of commandFiles) {
	const command = await import(`./commands/${file}`);
	client.commands.set(command.default.data.name, command.default);
}

client.once('ready', () => {

	logger.info(`Logged in as  ${client.user.tag}`);
	startExpress();

});

client.on('interactionCreate', async interaction => {

	// [DEBUG] Log commands
	logger.level = "debug";
	logger.debug(`${interaction.user.tag} used command ${interaction}`);

	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		logger.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

client.login(config.token);

// Catch errors to console, instead of crashing
process.on('uncaughtException', function (err) {
	logger.level = "error";
	logger.error(err.message);
});