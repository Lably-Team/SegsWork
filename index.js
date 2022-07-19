require('dotenv').config();

const {Client, Intents} = require("discord.js");
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const fs = require('fs');
const config = require('./config.json');
const language = require('./language.json');

client.on("ready", () => {
    console.log("The bot is ready");
});

client.on('messageCreate', async (message) => {
    let content = message.content;
    if (!content.startsWith(config.prefix)) {
        return;
    }

    let args = content.split(/\s+/);
    let command = args[0].replace(config.prefix, '');

    switch (command) {
        case "setprefix":
            config.prefix = args[1];
            fs.writeFileSync("config.json", JSON.stringify(config));
            message.channel.send( (language.prefix_changed).replaceAll('{prefix}', config.prefix) );
            break;
        case "ping":
            let latency = Date.now() - message.createdTimestamp
            message.channel.send( (language.ping_result).replaceAll('{number}', latency) );
            break;
    }
})
    
client.login(process.env.TOKEN);
