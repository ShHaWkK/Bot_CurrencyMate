const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessageReactions,
    ],
});

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
        const fromCurrency = interaction.options.getString('from');  
        const toCurrency = interaction.options.getString('to');
        const amount = interaction.options.getNumber('amount');
        const rate = await api.getExchangeRate(fromCurrency, toCurrency);  
    
    },
};


client.commands = new Collection();
const commands = [];
const commandsPath = path.join(__dirname, 'src', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if (typeof command.data.toJSON !== 'function') {
        console.error(`La commande dans le fichier ${file} ne peut pas être convertie en JSON.`);
        continue;
    }
    commands.push(command.data.toJSON());
}



const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

async function deployCommands() {
    try {
        console.log('Début du processus d\'enregistrement des commandes slash.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log('Enregistrement des commandes slash réussi.');
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement des commandes slash:', error);
    }
}

client.once('ready', async () => {
    console.log(`${client.user.tag} est en ligne !`);
    // Déployer les commandes ici si nécessaire
    await deployCommands();
    // Autres logiques de démarrage...
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "Une erreur s'est produite lors de l'exécution de la commande.",
            ephemeral: true
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
