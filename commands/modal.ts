import { SlashCommandBuilder, ChatInputCommandInteraction, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ModalActionRowComponent, ModalActionRowComponentBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
	.setName('modal')
	.setDescription('Creates a modal form')

const modal = new ModalBuilder()
    .setCustomId('myModal')
    .setTitle('My Modal')

const firstInput = new TextInputBuilder()
    .setCustomId('firstInput')
    .setLabel('Hello There!')
    .setStyle(TextInputStyle.Short)

const secondInput = new TextInputBuilder()
    .setCustomId('secondInput')
    .setLabel('Ahdashdahfsfas')
    .setStyle(TextInputStyle.Paragraph)

const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(firstInput)
const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(secondInput)

modal.addComponents(firstActionRow, secondActionRow)

module.exports = {
    data: data,
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.showModal(modal)
    },
}