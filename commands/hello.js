import { SlashCommandBuilder } from '@discordjs/builders';
import getArgs from "../lib/getArgs.js"

const data = new SlashCommandBuilder()
	.setName('hello')
	.setDescription('Say hi!')
	.addStringOption(option => option
		.setName('name')
		.setDescription('Your name')
		.setRequired(true)
	)

async function execute(interaction) {

	const args = getArgs(interaction);
	await interaction.reply(`Hi ${args.name}`);

};

export default {
	data,
	execute
};
