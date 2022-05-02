import { SlashCommandBuilder } from '@discordjs/builders';
import generateBadge from '../lib/generator/badge.js';
import getArgs from '../lib/getArgs.js';
import fetch from 'node-fetch';

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

async function execute(interaction) {

	// Defer reply
	await interaction.deferReply();
	const args = getArgs(interaction);

	// Check if username is valid
	let uuid;

	if (args.username.length <= 16) {
		let mcResponse = await fetch(`https://api.mojang.com/users/profiles/minecraft/${args.username}`);

		// Check if Mojang API is working
		if (mcResponse.status == 200) {
			let minecraftData = await mcResponse.json();
			
			//If the user doesn't exist 
			if (minecraftData.error == "BadRequestException") {
				return await interaction.editReply('This username is invalid');
			}
			
			uuid = minecraftData.id;
		} else {
			return await interaction.editReply('This username is invalid');
		}
	} else {
		return await interaction.editReply('This username is invalid');
	}

	let png;
	
	// Subcommand handler
	switch (interaction.options._subcommand) {
		case 'badge': {
			png = await generateBadge(args.username);
			break;
		}
		case 'bedwars': {
			//soon^tm
			//const png = await generateBedwars(args.username);
			break;
		}
	}
	

	await interaction.editReply({
		files: [{ attachment: png, name: 'stats.png' }]
	});
};

export default {
	data,
	execute
};
