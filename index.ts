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

const eventsPath = path.join(__dirname, 'events');
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.ts'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

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

client.login(process.env.DISCORD_TOKEN)