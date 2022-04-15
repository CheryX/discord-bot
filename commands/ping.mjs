import { SlashCommandBuilder } from '@discordjs/builders';

export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong! ale zmienione :flushed:'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
