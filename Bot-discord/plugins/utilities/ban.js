import { 
  SlashCommandBuilder, 
  PermissionFlagsBits } 
from 'discord.js'

const data = new SlashCommandBuilder()
	.setName('ban')
	.setDescription('Select a member and ban them.')
	.addUserOption(option =>
		option
			.setName('target')
			.setDescription('The member to ban')
			.setRequired(true))
	.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

export default {
  data: data,
  async execute(interaction) {
     await interaction.reply('succes kick member');
  },
}
