import instagramDl from "@sasmeee/igdl";
import {
  SlashCommandBuilder,
  ActionRowBuilder,
  Events,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  EmbedBuilder
} from 'discord.js'

const data = {
  data: new SlashCommandBuilder()
  .setName('ig')
  .setDescription('Instagram Downloader'),
  async execute(interaction) {
    const modal = new ModalBuilder()
    .setCustomId('igModal')
    .setTitle('instagram');

    const link = new TextInputBuilder()
    .setCustomId('ig')
    // The label is the prompt the user sees for this input
    .setLabel("your input link instagram")
    // Short means only a single line of text
    .setStyle(TextInputStyle.Paragraph)
    .setPlaceholder('Enter some link')

    const Row = new ActionRowBuilder().addComponents(link);

    modal.addComponents(Row);

    await interaction.showModal(modal);
//    await interaction.deferUpdate()
  //  const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });
    const submitted = await interaction.awaitModalSubmit({
  // Timeout after a minute of not receiving any valid Modals
    time: 60000,
  // Make sure we only accept Modals from the User who sent the original Interaction we're responding to
    filter: i => i.user.id === interaction.user.id,
  }).catch(error => {
  // Catch any Errors that are thrown (e.g. if the awaitModalSubmit times out after 60000 ms)
    console.error(error)
    return null
  })

    if (submitted) {
      const  ig  = submitted.fields.getTextInputValue('ig')
      await instagramDl(ig).then(async (result)=>{
        await interaction.channel.send(result[0].download_link)
      })
    }
  },
}

export default data
