const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Affiche des informations sur un utilisateur')
        .addUserOption(option => option.setName('user').setDescription('L’utilisateur à afficher').setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        await interaction.reply(`Nom d'utilisateur: ${user.username}\nID: ${user.id}\nAvatar: ${user.displayAvatarURL({ dynamic: true })}`);
    },
};
