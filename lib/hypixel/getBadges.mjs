
/**
 * 
 * @param {object} data 
 * @param {object} guildData 
 * @param {object} friendsData 
 * @returns 
 */
function getBadges(data, guildData, friendsData) {

    let badges = [];
    
    // Get network xp
    let networkXp = data.player.networkExp;
    let networkLevel = 0.02 * ( Math.sqrt(2 * networkXp + 30625) - 125);

    // I don't know if there's a better way to do this
    if (networkLevel <= 10) {
        badges.push('newbie');
    } else if (networkLevel <= 25) {
        badges.push('beginner');
    } else if (networkLevel <= 50) {
        badges.push('intermediate');
    } else if (networkLevel <= 200) {
        badges.push('experienced');
    } else {
        badges.push('noLife');
    }

    if (data.player.uuid == guildData.owner) {
        badges.push('guildMaster');
    }

    if (data.player.uuid == "b876ec32e396476ba1158438d83c67d4") {
        badges.push('oink');
    } else if (data.player.uuid == "18f42a22e7df48a1ac36017a694d0370") {
        badges.push('loser');
    } else if (data.player.uuid == "f7da1f2bf5894d97ad4a943b3de9829d") {
        badges.push('fox');
    }

    return badges;
}

export default getBadges;