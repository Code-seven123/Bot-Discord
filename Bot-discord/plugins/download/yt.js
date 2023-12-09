import fs from 'fs'
import ytd from 'youtube-dl'
import ytdl from 'ytdl-core'
import {
  SlashCommandBuilder,
  ActionRowBuilder,
  Events,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  EmbedBuilder,
  AttachmentBuilder
} from 'discord.js'
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const fakeName = `${generateRandomNumber(1200000, 10000000)}.mp4`
const output = {
   name: fakeName,
   path: `temp/${fakeName}`
}
function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}
const data = {
  data: new SlashCommandBuilder()
  .setName('yt')
  .setDescription(' youtube Downloader'),
  async execute(interaction) {
    const modal = new ModalBuilder()
    .setCustomId('ytModal')
    .setTitle('youtube');

    const link = new TextInputBuilder()
    .setCustomId('yt')
    // The label is the prompt the user sees for this input
    .setLabel("your input link youtube")
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
      const url = await submitted.fields.getTextInputValue('yt')
      await submitted.reply('memuat.....')
      /*let downloaded = 0

      if (fs.existsSync(output)) {
        downloaded = fs.statSync(output.path).size
      }
      const video = await ytd(url, { start: downloaded, cwd: __dirname })
      await video.on('info', function(info) {
        const data = {}
        data.status = 'download started'
        data.filename = info._filename
        data.size = info.size + downloaded

        if (downloaded > 0) {
          data.resuming = downloaded
          data.remaining = info.size
        }
	const ongoing = {
          title: data.status,
          fields: [
            {
  	      name: 'File Name',
              value: data.filename,
            },
	    {
              name: 'Size',
              value: data.size,
            },
            {
              name: 'Resuming from',
              value: data.resuming,
            },
            {
              name: 'remaining bytes',
              value: data.remaining,
            },
          ] 
        }
        interaction.channel.send({ embeds: [ongoing] });
      })*/
      console.log('download video youtube dimulai')
      const video = await ytdl(url)
      const stream = fs.createWriteStream(output.path)
      console.log('save')
      video.pipe(stream)
      stream.on('finish', async () => {
        console.log('selesai')
        await interaction.channel.send({ files: [output.path] })
        console.log('kirim selesai')
      })
      /*ytd.getInfo(url, function(err, info) {
        if (err) throw err
        const dataInfo = {}
        dataInfo.title = info.title
        dataInfo.url = info.url
        dataInfo.thub = info.thumbnail
        dataInfo.desc = info.description
        const finished = {
          title: dataInfo.title,
          thumbnail: {
	    url: dataInfo.thub,
	  },
          description: dataInfo.desc,
          url: dataInfo.url
        }
        interaction.channel.send({ embeds: [finished] });
      })
      video.on('complete', function complete(info) {
        'use strict'
        console.log('filename: ' + info._filename + ' already downloaded.')
      })

      video.on('end', function() {
        console.log('finished downloading!')
      })*/
      //await wait(6000)
      //await interaction.channel.send({ files: [`temp/${name}`] })
  
    }
  },
}

export default data
