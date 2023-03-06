import { ButtonInteraction, Collection, Events } from 'discord.js';

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction: any) {
		if (!interaction.isButton()) return;
	    const filter = (i: ButtonInteraction) => i.customId === 'button1';

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async (i: ButtonInteraction) => {
	        await i.update({ content: 'A button was clicked!', components: [] });
        });

        collector.on('end', (collected: Collection<unknown, any>) => console.log(`Collected ${collected.size} items`));

	},
};