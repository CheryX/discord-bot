
/**
 * 
 * @param {object} data 
 * @param {object} guildData 
 * @param {object} friendsData 
 * @returns 
 */
function getBadges(data, guildData) {

    let badges = [];
    
    // Get network xp
    let networkXp = data.player.networkExp;
    let networkLevel = 0.02 * ( Math.sqrt(2 * networkXp + 30625) - 125);
    let nowTimestamp  = Math.floor(new Date / 1000)

    // I don't know if there's a better way to do this
    if (networkLevel >= 200) {
        badges.push('experienced');
    }

    let guildOwner;
    for (let i in guildData.guild.members) {
        if (guildData.guild.members[i].rank == "Guild Master") {
            guildOwner = guildData.guild.members[i].uuid;
        }
    }
    if (data.player.uuid == guildOwner) {
        badges.push('guildMaster');
    }

    if (nowTimestamp - (data.player.firstLogin / 1000)  > (60*60*24*365*3)) {
        badges.push('timePlayed');
    }

    if (data.player.achievements.bedwars_level > 100) {
        badges.push('bedwars');
    }

    if (data.player.achievements.skywars_you_re_a_star > 10) {
        badges.push('skywars');
    }

    if (data.player.achievements.duels_duels_winner > 100) {    
        badges.push('duels');
    }

    badges.push('skyblock');

    return badges;
}

export default getBadges;