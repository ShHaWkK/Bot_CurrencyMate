const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Crée un sondage')
        .addStringOption(option => option.setName('question').setDescription('La question du sondage').setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const { Colors } = require('discord.js');
        const pollEmbed = new EmbedBuilder()
        .setColor(Colors.Blue) // Utiliser une couleur prédéfinie
        .setTitle('Sondage')
        .setDescription(question);        
        const message = await interaction.reply({ embeds: [pollEmbed], fetchReply: true });
        await message.react('👍');
        await message.react('👎');
    },
};
