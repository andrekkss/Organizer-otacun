const Discord = require("discord.js");
const Config = require('./src/config/config');
const Command = require('./src/features/commands/commands');

require('dotenv').config()

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
  
client.on('message', msg => {    
    const handler = { client, handler: msg }
    if (msg.content.startsWith(Config.prefix)){ 
        const command = msg.content.slice(Config.prefix.length).trim();
        const args = command.split(' ');
        const method = args[0];
        Command.execute(handler, method, args.slice(1));
    } else {
        const args = msg.content.split(' ');
        Command.execute(handler, "redirect", args);
    }
});

client.login(process.env.DISCORD_TOKEN);