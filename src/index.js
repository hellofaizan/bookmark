const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Activity, ActivityType } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();

client.on('ready', () => {
    console.log(`\u001b[1;32m Logged in as ${client.user.tag}! \u001b[0m`);
    client.user.setActivity({ type: ActivityType.Custom, name: 'Playing with Bookmarks' });
    client.user.setStatus('dnd');
});

// read the message reply by person with admin perms and have bookmark tag in it
client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'DM') return;
    if (message.author.id === '890232380265222215') {
        if (message.content.includes(' bookmarkit')) {
            // get only link from message content
            const link = message.content.split(' ').filter(word => word.includes('https://'));
            // POST request to add link to database
            const body = JSON.stringify({
                url: link[0]
            })
            const res = await fetch('https://hellofaizan.me/api/addBookmark', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            }).catch(err => {
                message.reply('❌ Error adding to database!', { ephemeral: true });
            });
            if (res.ok) {
                // if response is ok, send message to user and delete the message of user
                message.reply('✨ Added to bookmarks! ' + link[0]);
            }
            // delete the message of user
            message.delete();
            // message.reply(JSON.stringify({ url: link[0] }), { ephemeral: true });
        }
    }
});

