const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction, client) {
        // To make the reply private to the user, use interaction.reply('Pong!', {ephemeral: true});
        // create embed to reply with 
        const embed = {
            "title": `🏓 Pong! ${Date.now() - interaction.createdTimestamp}ms`,
            "color": 5814783,
            "footer": {
                "text": `Requested by ${interaction.user.tag}`,
                "icon_url": interaction.user.avatarURL()
            }
        };
        // reply to interaction with embed
        await interaction.reply({ embeds: [embed] });
    },
}