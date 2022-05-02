import express from 'express';
import log from '../lib/logging.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function run() {

    const app = express()

    app.set('view engine', 'ejs');
    app.use(express.static(__dirname + '/public'));

    const pages = [];
    const pageFiles = fs.readdirSync('./web/routes').filter(file => file.endsWith('.js'));

    for (const file of pageFiles) {

        // Import the page using import
        const command = await import(`./routes/${file}`);

        // Set the command name to the command
        app.use(command.default.path, command.default.router);
    }

    //Listen to website
    app.listen(8000, () => {
        log.info("Website listening on http://localhost:8000") 
    });

}

export default run;