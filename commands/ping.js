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
