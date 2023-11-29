const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');


/* Description:
    SlashCommandBuilder is a slash command builder.
    
    It is used to create slash commands.
     check the discord.js documentation => embeds
                   
*/
module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Crée un sondage')
        .addStringOption(option => option.setName('question').setDescription('La question du sondage').setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const { Colors } = require('discord.js');
        const pollEmbed = new EmbedBuilder()
        .setColor(Colors.Blue) 
        .setTitle('Sondage')
        .setDescription(question);        
        const message = await interaction.reply({ embeds: [pollEmbed], fetchReply: true });
        await message.react('👍');
        await message.react('👎');
    },
};
