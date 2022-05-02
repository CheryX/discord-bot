import express from 'express';
import log from '../lib/logging.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = 2137;
const URL = `http://localhost:${PORT}/`;

async function run() {

    const app = express()
    app.use(express.static(__dirname + '/public'));

    const pageFiles = fs.readdirSync('./web/routes').filter(file => file.endsWith('.js'));
    for (const file of pageFiles) {

        const command = await import(`./routes/${file}`);
        app.use(command.default.path, command.default.router);

    }

    app.listen(PORT, () => {
        log.info(`Website listening on ${URL}`) 
    });

}

export default run;