// get any link from discord js model form and make post request to hellofaizan.me/api/addBookmark

const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addbookmark')
        .setDescription('Add a bookmark to the database')
        .addStringOption(option => option.setName('url').setDescription('The url to add to the database').setRequired(true)),
    async execute(interaction) {
        // check if author id matches with my id
        if (interaction.user.id !== '890232380265222215') return interaction.reply('❌ You are not allowed to use this command');
        const url = interaction.options.getString('url');
        const body = JSON.stringify({
            url: url
        })
        // Axios post request to add link to database
        const res = await fetch('https://hellofaizan.me/api/addBookmark', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        }).catch(err => {
            interaction.reply('❌ Error adding to bookmarks! ' + url);
        });

        if (res.ok) {
            // if response is ok, send message to user and delete the message of user
            interaction.reply('✨ Added to bookmarks! ' + url);
        } else {
            interaction.reply('❌ Error adding to bookmarks! ' + url);
        }

    }
}