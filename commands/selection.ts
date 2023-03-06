import { SlashCommandBuilder, ChatInputCommandInteraction, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
	.setName('selection')
	.setDescription('Creates a couple select menus')

const row = new ActionRowBuilder<StringSelectMenuBuilder>()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId('string')
            .setPlaceholder('Nothing selected')
            .addOptions(
                {
                    label: 'Select me',
                    description: 'This is a description',
                    value: 'first_option',
                },
                {
                    label: 'You can select me too',
                    description: 'This is also a description',
                    value: 'second_option',
                },
            ),
    )

module.exports = {
    data: data,
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply({ content: 'pog', components: [row] })
    },
}