// Import tokens from .env
import dotenv from 'dotenv';
dotenv.config();

// Import the modules
import { Client, Intents }  from 'discord.js';
import log from './lib/logging.mjs';

// Create a new client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//Display basic info on ready
client.once('ready', () => {

    // *fancy*
    console.log(`
        \u001b[31m:::    ::: :::   ::: \u001b[39m::::::::::: ::::::::  ::::::::: :::::::::::     :::      ::::::::  
        \u001b[31m:+:    :+: :+:   :+: \u001b[39m    :+:    :+:    :+: :+:    :+:    :+:       :+: :+:   :+:    :+: 
        \u001b[31m+:+    +:+  +:+ +:+  \u001b[39m    +:+    +:+    +:+ +:+    +:+    +:+      +:+   +:+  +:+        
        \u001b[31m+#++:++#++   +#++:   \u001b[39m    +#+    +#+    +:+ +#++:++#+     +#+     +#++:++#++: +#++:++#++ 
        \u001b[31m+#+    +#+    +#+    \u001b[39m    +#+    +#+    +#+ +#+    +#+    +#+     +#+     +#+        +#+ 
        \u001b[31m#+#    #+#    #+#    \u001b[39m    #+#    #+#    #+# #+#    #+#    #+#     #+#     #+# #+#    #+# 
        \u001b[31m###    ###    ###    \u001b[39m    ###     ########  ######### ########### ###     ###  ######## 

        Username: \u001b[31m${client.user.tag}\u001b[39m
        ID: \u001b[31m${client.user.id}\u001b[39m
        Shards: \u001b[31m${client.ws.totalShards}\u001b[39m
    
        Servers: \u001b[31m${client.guilds.cache.size}\u001b[39m | Users: \u001b[31m${client.users.cache.size}\u001b[39m | Messages: \u001b[31m${client.sweepers.intervals.messages}\u001b[39m

        ========================================================================================
    `);

    // Just testing logging (temp)
    log.success("CheryX used /ping");
    log.info("Updated bot to v1.0.1 (Fixed The Button) ");
    log.warn("CheryX used The Button");
    
});

// Login to Discord
client.login(process.env.TOKEN);

// Catch errors to console, instead of crashing
process.on('uncaughtException', function (err) {
    log.error(err.message);
});