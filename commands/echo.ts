import { SlashCommandBuilder, CommandInteraction, ChatInputCommandInteraction } from 'discord.js';

const data = new SlashCommandBuilder()
	.setName('echo')
	.setDescription('Replies with your input!')
	.addStringOption(option =>
		option.setName('text')
			.setDescription('The text to echo back')
            .setRequired(true))

module.exports = {
    data: data,
    async execute(interaction: ChatInputCommandInteraction) {
        const echoText = interaction.options.getString('text')!
        interaction.reply(echoText)
    },
}