import fetch from 'node-fetch';
import getBadges from './getBadges.js';

// Import api key from .env
import dotenv from 'dotenv';
dotenv.config();

// Note: You need to have a valid API key in .env (or just hardcode it)
const apiKey = process.env.API_KEY;

// Get rank info on Hypixel

/**
 * 
 * @param {object} data 
 * @returns 
 */
function getRank(data) {

	/*

	How to get the rank:
	
	1. `packageRank` Permanent ranks before 2016 EULA update 
	2. `newPackageRank` New ranks like "VIP_PLUS" after 2016 EULA update
	3. `monthlyPackageRank` for monthly ranks like "MVP++" (aka. "SUPERSTAR")
	4. `data.player.rank` for special ranks like "Admin", "Youtube" etc.
	5. Hardcode if the player has special ranks e.g. "PIG+++", "Slothpixel"
	6. `data.player.rankPlusColor` if the rank has "+" in it.

	Thank you Hypixel :heart:

	*/

	let rank = data.player.packageRank;
	let newRank = data.player.newPackageRank;
	let monthlyRank = data.player.monthlyPackageRank;
	let specialRank = data.player.rank;

	// If the user logged in at least once since 2016
	if (newRank != null) {
		rank = newRank;
	}
	
	// If the user has a monthly rank
	if (monthlyRank != null && monthlyRank != "NONE") {
		rank = monthlyRank;
	}
	
	// If the user has a special rank
	if (specialRank != null && specialRank != "NONE") {
		rank = specialRank;
	}
	
	// Get full rank name
	let formattedRank = "";

	switch (rank) {
		
		case "VIP": formattedRank = "[VIP]"; break;
		case "VIP_PLUS": formattedRank = "[VIP+]"; break;
		case "MVP": formattedRank = "[MVP]"; break;
		case "MVP_PLUS": formattedRank = "[MVP+]"; break;
		case "SUPERSTAR": formattedRank = "[MVP++]"; break;
		case "YOUTUBER": formattedRank = "[YOUTUBE]"; break;
		case "ADMIN": formattedRank = "[ADMIN]"; break;
		
	}
	
	// Getting Technoblade's custom rank
	if (data.player.uuid == "b876ec32e396476ba1158438d83c67d4") formattedRank = "[PIG+++]"
	
	// Get color of the rank
	let color = "gray";
	
	switch (formattedRank) {
		
		case "[VIP]": color = "green"; break;
		case "[VIP+]": color = "green"; break;
		case "[MVP]": color = "aqua"; break;
		case "[MVP+]": color = "aqua"; break;
		case "[MVP++]": color = "gold"; break;
		case "[YOUTUBE]": color = "red"; break;
		case "[ADMIN]": color = "red"; break;
		case "[OWNER]": color = "red"; break;
		case "[PIG+++]": color = "light_purple"; break;
		
	}
	
	let plusColor = color;

	// If the rank has a + in it
	if ( formattedRank.includes("+") ) {

		// Get the color of the plusses
		plusColor = data.player.rankPlusColor.toLowerCase();

		
		// If the user has a pig rank
		if ( formattedRank == "[PIG+++]" ) {
			plusColor = "dark_purple";
		}
		
	}

	return {
		rank: formattedRank,
		color: color,
		plusColor: plusColor
	}

}

async function getPlayerProfile(username) {

	let uuid;

	// Check if the user gave a username
	if (username.length <= 16) {
		let mcResponse = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
	
		// Check if Mojang API is working
		if (mcResponse.status == 200) {
			let minecraftData = await mcResponse.json();
			
			//If the user doesn't exist 
			if (minecraftData.error == "BadRequestException") {
				return 0;
			}
			
			uuid = minecraftData.id;
		}
	} else {
		uuid = username;
	}
		
	let response = await fetch(`https://api.hypixel.net/player?key=${apiKey}&uuid=${uuid}`);
	let data = await response.json();

	// Check if Hypixel API is working and if the user exists
	if (data.success) {

		let onlineData = await fetch(`https://api.hypixel.net/status?key=${apiKey}&uuid=${uuid}`);
		let guildData = await fetch(`https://api.hypixel.net/guild?key=${apiKey}&player=${uuid}`);
		let friendsData = await fetch(`https://api.hypixel.net/friends?key=${apiKey}&uuid=${uuid}`);
		
		let onlineResponse = await onlineData.json();
		let guildResponse = await guildData.json();
		let friendsResponse = await friendsData.json();

		// Get rank info using getRank()
		let rankInfo = getRank(data);

		// Get network xp
		let networkXp = data.player.networkExp;
		let networkLevel = 0.02 * ( Math.sqrt(2 * networkXp + 30625) - 125)

		// Get guild info
		let guild;
		if (guildResponse.guild != null) {
			let tagColor;

			if (guildResponse.guild.tagColor == null) {
				tagColor = "gray";
			} else {
				tagColor = guildResponse.guild.tagColor.toLowerCase();
			}

			let guildOwner;
			for (let i in guildResponse.guild.members) {
				if (guildResponse.guild.members[i].rank == "Guild Master") {
					guildOwner = guildResponse.guild.members[i].uuid;
				}
			}

			guild = {
				name: guildResponse.guild.name,
				tag: guildResponse.guild.tag,
				tagColor,
				xp: guildResponse.guild.exp,
				owner: guildOwner,
			}
		} else {
			guild = {
				name: "None",
				tag: "None",
				tagColor: "gray",
				xp: 0,
				owner: undefined
			}
		}

		// Get online status
		let status = {
			online: onlineResponse.session.online,
			mode: onlineResponse.session.mode,
			game: onlineResponse.session.gameType,
			map: onlineResponse.session.map,
		}

		// Get friends
		let friends = []

		for (let i = 0; i < friendsResponse.records.length; i++) {

			// Get friend's uuid
			let friendUuid = "";

			// Compare sender and receiver to get the correct uuid
			if (friendsResponse.records[i].uuidSender == uuid) {
				friendUuid = friendsResponse.records[i].uuidReceiver;
			} else {
				friendUuid = friendsResponse.records[i].uuidSender;
			}

			// Add friend to friends array
			friends.push(friendUuid);

		}

		return {

			username: data.player.displayname,
			uuid: data.player.uuid,
			
			rank: rankInfo,
			xp: data.player.networkExp,
			level: networkLevel,
			achievementPoints: data.player.achievementPoints,
			karma: data.player.karma,

			guild: guild,
			status: status,
			friends: friends,

			badges: getBadges(data, guildResponse),
		
		}
	}
}

export default getPlayerProfile;
export { getRank };