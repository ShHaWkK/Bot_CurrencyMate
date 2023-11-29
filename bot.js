const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessageReactions,
    ],
});

client.commands = new Collection();
const commands = [];
const commandsPath = path.join(__dirname, 'src', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Assurez-vous que api est requis correctement
const api = require('./src/utils/api');

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON()); // Assurez-vous que toutes les commandes utilisent SlashCommandBuilder
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
    await deployCommands(); // Déployer les commandes au démarrage
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
