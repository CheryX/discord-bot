import { SlashCommandBuilder } from '@discordjs/builders';
import generateBadge from '../lib/generator/badge.mjs';
import getArgs from '../lib/getArgs.mjs';

const data = new SlashCommandBuilder()
	.setName('stats')
	.setDescription('Replies with statistics about your Hypixel Profile')
	.addSubcommand(subcommand => subcommand
		.setName('badge')
		.setDescription('A badge with basic statistics')
		.addStringOption(option => option
			.setName('username')
			.setDescription('Your Hypixel username')
			.setRequired(true)
		)
	)
	.addSubcommand(subcommand => subcommand
		.setName('bedwars')
		.setDescription('Bedwars statistics')
		.addStringOption(option => option
			.setName('username')
			.setDescription('Your Hypixel username')
			.setRequired(true)
		)
	)

export default {
	data,
	async execute(interaction) {
		await interaction.deferReply();

		const args = getArgs(interaction);
		const png = await generateBadge(args.username);

		await interaction.editReply({
			files: [{ attachment: png, name: 'stats.png' }]
		});
	},
};
