import getPlayerProfile from "./lib/hypixel/playerData";
import { getNickname } from "./lib/hypixel/userProfile";

// Since I don't play Hypixel often i can use my profile as an example 
it('Hypixel API returns nickname', async () => {

    const nickname = await getNickname('cheryx')
    expect(nickname[1].text).toBe('+');
    expect(nickname[3].text).toBe('CheryX');

});

it('Profle is sucessfully fetching', async () => {

    const profile = await getPlayerProfile('cheryx');
    
    expect(profile.guild.owner).toBe(profile.uuid);
    expect(profile.guild.tagColor).toBe('gold');

});