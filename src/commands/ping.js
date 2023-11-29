
const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Répond avec Pong!'),
async execute(interaction) {
    await interaction.reply(`Pong! Latence: ${Date.now() - interaction.createdTimestamp}ms`);
},
};

