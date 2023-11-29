const { EmbedBuilder } = require('discord.js');
const api = require('../utils/api');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('convert')
        .setDescription('Convertir une devise en une autre')
        .addStringOption(option => 
            option.setName('from')
            .setDescription('La devise à convertir')
            .setRequired(true))
        .addStringOption(option => 
            option.setName('to')
            .setDescription('La devise dans laquelle convertir')
            .setRequired(true))
        .addNumberOption(option => 
            option.setName('amount')
            .setDescription('Le montant à convertir')
            .setRequired(true)),
    async execute(interaction) {
        const fromCurrency = interaction.options.getString('from').toUpperCase();
        const toCurrency = interaction.options.getString('to').toUpperCase();
        const amount = interaction.options.getNumber('amount');

        try {
            const rate = await api.getExchangeRate(fromCurrency, toCurrency);
            const convertedAmount = (amount * rate).toFixed(2);
            await interaction.reply(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
        } catch (error) {
            await interaction.reply(`Erreur lors de la conversion : ${error.message}`);
        }
    },
};
