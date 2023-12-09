import { SlashCommandBuilder } from 'discord.js'

const data = {
  data: new SlashCommandBuilder()
		.setName('helllo')
		.setDescription('Hello'),
	async execute(interaction) {
		await interaction.reply('Hello World');
	},
}

export default data
