// get any link from discord js model form and make post request to hellofaizan.me/api/addBookmark

const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bookmarks')
        .setDescription('Get all bookmarks from database'),
    async execute(interaction) {
        // Axios post request to add link to database
        const res = await fetch('https://hellofaizan.me/api/bookmarks').catch(err => {
            interaction.reply('❌ Error showing all bookmarks! ');
        });
        if (res.ok) {
            const json = await res.json();
            const bookmarks = json.data;
            let bookmarksString = '';
            bookmarks.forEach(bookmark => {
                bookmarksString += bookmark.url + '\n';
            });
            // interaction.reply('✨ Here are all the bookmarks: \n' + bookmarksString);
            const embed = {
                "title": `✨ Here are all the bookmarks:`,
                "description": bookmarksString,
                "color": 5814783,
                "footer": {
                    "text": `Requested by ${interaction.user.tag}`,
                    "icon_url": interaction.user.avatarURL()
                },
                "timestamp": new Date()
            };

            interaction.reply({ embeds: [embed] });
        }

    }
}