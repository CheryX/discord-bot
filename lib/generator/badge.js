// Some sort of unit tests
// WARNING! DO NOT TEST HYPIXEL API SINCE THERE IS NO API KEY

import Canvas from 'canvas'; 
import { textBox, wrapText } from 'cherry-box';
import drawSkin from '../hypixel/createSkin.js';
import { getNickname } from '../hypixel/userProfile.js';
import profile from '../hypixel/playerData.js';
import fs from 'fs';
import mcColors from '../colors/minecraft.js';

// Register Minecraft Font
Canvas.registerFont('./assets/fonts/Minecraftia.otf', { family: 'Minecraft' })
Canvas.registerFont('./assets/fonts/MinecraftiaBold.otf', { family: 'MinecraftBold' })
const font = 'Minecraft';

/**
 * 
 * @param {string} username 
 * @returns 
 */
async function generateBadge(username) {

	// Create a new canvas
	const canvas = new Canvas.createCanvas(800, 420);
	const ctx = canvas.getContext('2d');
	
	// Create template from template.png
	const template = new Canvas.Image();
	template.src = fs.readFileSync('./assets/images/template.png');
	ctx.drawImage(template, 0, 0);
	
	// Get Hypixel data
	let userProfile = await profile(username);
	let coloredUsername = await getNickname(username);
	if (userProfile == undefined || coloredUsername == undefined) {
		return;
	}
	
	// Rank with nickname
	textBox(ctx, 269, 95, 250, 39, coloredUsername, 80, ['bottom', 'left']);
	
	// Render skin
	let mcSkin = await drawSkin(9, username);
	await ctx.drawImage(mcSkin, 93, 70);
	
	// Bars for the XP and achievements
	let xpPercentage = userProfile.level - Math.floor(userProfile.level);
	ctx.fillStyle = '#BEFFBD';
	ctx.fillRect(265, 147, (xpPercentage * 275), 24);
	
	let badgePercentage = userProfile.badges.length / 7;
	ctx.fillStyle = '#BDDFFF';
	ctx.fillRect(265, 174, (badgePercentage * 207), 24);
	
	// Labels for the XP and achievements
	textBox(ctx, 272, 147, 250, 20, [{
		text: `${Math.floor(userProfile.level)} LVL (${(xpPercentage*100).toFixed(2)}% XP)`,
		color: '#ffffff',
		font: 'MinecraftBold',
		shadow: {
			color: '#555555',
			offset: [10, 10],
			blur: 5
		}
	}], 20, ['middle', 'left']);

	textBox(ctx, 272, 174, 250, 20, [{
		text: `${userProfile.badges.length} Badges (${(badgePercentage*100).toFixed(2)}%)`,
		color: '#ffffff',
		font: 'MinecraftBold',
		shadow: {
			color: '#555555',
			offset: [10, 10],
			blur: 5
		}
	}], 20, ['middle', 'left']);
	
	// Get online status
	const statusBadge = new Canvas.Image();

	// Get status badge
	let status;
	if (userProfile.status.online) {
		status = 'online';
		if (userProfile.status.mode != 'LOBBY') {
			status = 'playing';
		}
	
		// if someone knows how to check if the player is in limbo, please let me know (e.g. add a comment)
		if (userProfile.status.mode == 'LIMBO') {
			status = 'limbo';
		}
	} else {
		status = 'offline'; 
	}
	
	ctx.patternQuality = 'fast';

	statusBadge.src = fs.readFileSync(`./assets/images/status/${status}.png`);
	ctx.drawImage(statusBadge, 217, 200, 37, 37);

	wrapText(ctx, 570, 67, 192, [{
			text: `[${userProfile.guild.tag}] ${userProfile.guild.name}`,
			color: mcColors[userProfile.guild.tagColor],
			font,
			shadow: {
				color: mcColors.shadow[userProfile.guild.tagColor],
				offset: [10, 10],
				blur: 0
			}
	}], 20, 'center');
	
	textBox(ctx, 563, 155, 192, 27, [{
		text: userProfile.friends.length,
		color: mcColors.aqua,
		font,
		shadow: {
			color: mcColors.shadow.aqua,
			offset: [10, 10],
			blur: 0
		}
	}], 40, ['middle', 'center']);
	
	textBox(ctx, 563, 240, 192, 27, [{
		text: userProfile.karma,
		color: mcColors.light_purple,
		font,
		shadow: {
			color: mcColors.shadow.light_purple,
			offset: [10, 10],
			blur: 0
		}
	}], 30, ['middle', 'center']);

	// Display badges
	let allBadges = [
		'experienced',
		'guildMaster',
		'timePlayed',
		'bedwars',
		'skywars',
		'duels',
		'skyblock',
	]

	for (let i in allBadges) {
		let badge = new Canvas.Image();

		// Check if the user had unlocked the badge
		if (userProfile.badges.includes(allBadges[i])) {
			badge.src = fs.readFileSync(`./assets/images/badges/${i}.png`);
		} else {
			badge.src = fs.readFileSync(`./assets/images/badges/d${i}.png`);
		}

		ctx.drawImage(badge, (i * 88) + 106, 320, 64, 64);
	}

	// Return the image in png
	return canvas.toBuffer();
}

export default generateBadge;