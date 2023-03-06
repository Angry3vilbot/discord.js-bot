import { ButtonInteraction, Collection, Events, Interaction } from 'discord.js';

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction: Interaction) {
		if (!interaction.isModalSubmit()) return;
        await interaction.reply({ content: 'Your submission was received successfully!' });
	    const valueOne = interaction.fields.getTextInputValue('firstInput');
	    const valueTwo = interaction.fields.getTextInputValue('secondInput');
	    console.log({ valueOne, valueTwo });
	},
};