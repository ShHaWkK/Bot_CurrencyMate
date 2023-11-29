const api = require('../utils/api');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'convert',
        description: 'Convertir une devise en une autre',
        options: [
            {
                name: 'from',
                description: 'La devise à convertir',
                type: 'STRING',
                required: true
            },
            {
                name: 'to',
                description: 'La devise dans laquelle convertir',
                type: 'STRING',
                required: true
            },
            {
                name: 'amount',
                description: 'Le montant à convertir',
                type: 'NUMBER',
                required: true
            }
        ]
    },
    async execute(interaction) {
        const fromCurrency = interaction.options.getString('from');
        const toCurrency = interaction.options.getString('to');
        const amount = interaction.options.getNumber('amount');

        try {
            const rate = await api.getExchangeRate(fromCurrency, toCurrency);
            const convertedAmount = (amount * rate).toFixed(2);
            await interaction.reply(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
        } catch (error) {
            await interaction.reply(error.message);
        }
    }
};