import fetch from 'node-fetch';

// Import api key from .env
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.API_KEY;

function getPlayerProfile(username) {
    
    /*

    To do returns:

    - username: string
    - uuid: string
    - rank: string
    - xp: number
    - level: number
    - achievementPoints: number
    - guild: object
    - badges: array
    - friends: number
    - status: object

    */

    // 08.04.2022: cheryx doesnt know how hard it will be

    return {}
}

export default getPlayerProfile;