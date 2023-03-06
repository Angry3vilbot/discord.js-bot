import { ButtonInteraction, Collection, Events, Interaction } from 'discord.js';

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction: Interaction) {
		if (!interaction.isStringSelectMenu()) return;

	    const selection = interaction.values[0]

        switch (selection) {
            case 'first_option':
                await interaction.update('The first option has been selected!');
                break
            case 'second_option':
                await interaction.update('The second option has been selected!')
                break
        }
	},
};