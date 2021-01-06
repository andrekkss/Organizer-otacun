const fs = require('fs');
const Discord = require("discord.js");

const REDIRECT_URL_DATABASE = './src/database/red.json';

const get = (PERSIST) => {
    const data = PERSIST === REDIRECT_URL_DATABASE ? 
        fs.readFileSync(REDIRECT_URL_DATABASE) : fs.readFileSync(REDIRECT_URL_DATABASE);
    return JSON.parse(data);
}

const addRedirect = (handle, args) => {
    const { handler: msg } = handle;
    fs.readFile(REDIRECT_URL_DATABASE, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        const obj = JSON.parse(data); //now it an object
        obj.push({id: args[0], prefix: args[1], user: args[2]}); //add some data
        const json = JSON.stringify(obj, null, 2); //convert it back to json
        fs.writeFile(REDIRECT_URL_DATABASE, json, 'utf8', () => msg.reply("gravado")); // write it back 
    }});
}

const redirect = (handler, args) => {
    const { client, handler: msg } = handler;
    const data = get(REDIRECT_URL_DATABASE);
    const obj = data.find(o => args[0].startsWith(o.prefix) || o.user === msg.author.username );

    if(obj !== undefined){
        if(msg.channelID !== obj.id){
            if(msg.content !== ""){
                client.channels.cache.get(obj.id).send(`redirecionado ${msg}`);
            } else if(msg.embeds[0] !== undefined) {
                msg.embeds.forEach(embed => {
                    const emb = new Discord.MessageEmbed(embed)
                    client.channels.cache.get(obj.id).send(emb);
                });
            } else if(msg.attachment[0] !== undefined){
                const attachment = new Discord.MessageAttachment(msg.attachment[0]);
                client.channels.cache.get(obj.id).send(attachment);
            }
            msg.delete()
        }
    }
}

module.exports = {
    addRedirect,
    redirect
}