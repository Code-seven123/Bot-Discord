import { SlashCommandBuilder } from 'discord.js'

const data = {
  data: new SlashCommandBuilder()
                .setName('test')
                .setDescription('Testing Bot'),
        async execute(interaction) {
                interaction.reply('Bot aktif')

        },
}

export default data
