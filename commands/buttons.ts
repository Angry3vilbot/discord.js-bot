import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction } from "discord.js"


const data = new SlashCommandBuilder()
	.setName('buttons')
	.setDescription('Replies with a bunch of buttons')

const row = new ActionRowBuilder<ButtonBuilder>()
    .addComponents([
        new ButtonBuilder()
            .setCustomId('button1')
            .setLabel('Click Me!')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('1082416625506066563'),
        new ButtonBuilder()
            .setCustomId('button2')
            .setLabel(`I'm disabled.`)
            .setStyle(ButtonStyle.Danger)
            .setEmoji('🗿')
            .setDisabled(true)
    ])

module.exports = {
    data: data,
    async execute(interaction: ChatInputCommandInteraction) {
        interaction.reply({ components: [row] })
    }
}