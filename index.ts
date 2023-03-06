import * as dotenv from 'dotenv'
dotenv.config()
import * as path from 'path'
import { readdirSync } from 'fs'
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js'

class CustomClient extends Client {
    commands!: Collection<unknown, any>
}

const client: CustomClient = new CustomClient({ intents: [GatewayIntentBits.Guilds] })

client.commands = new Collection()

const commandPath = path.join(__dirname, 'commands')
const commandFiles = readdirSync(commandPath).filter(file => file.endsWith('.ts'))

// Register the commands
for (const file of commandFiles) {
    const filePath = path.join(commandPath, file)
    const command = require(filePath)

    if ('data' in command || 'execute' in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)   
    }
}

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`)
})

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return
    const client = interaction.client as CustomClient
    const command = client.commands.get(interaction.commandName)

    if(!command) {
        console.error(`No command matching ${interaction.commandName} was found.`)
        return
    }

    try {
        await command.execute(interaction)
    } catch (err) {
        console.error(err)
        if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
    }
})

client.login(process.env.DISCORD_TOKEN)