import { SlashCommandBuilder } from '@discordjs/builders';
import generateBadge from '../lib/generator/badge.js';
import getArgs from '../lib/getArgs.js';
import fetch from 'node-fetch';

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
