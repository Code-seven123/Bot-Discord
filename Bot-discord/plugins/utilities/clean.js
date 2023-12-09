import { SlashCommandBuilder } from 'discord.js'
import fs from "fs"
import path from "path"
function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}
const data = {
  data: new SlashCommandBuilder()
                .setName('clean')
                .setDescription('clean temp/ membersihkan sampah'),
  async execute(interaction) {
                await interaction.reply('memuat....')
                await wait(2000)
                const directory = "temp";
                
		const cl = async () => {
                fs.readdir(directory, (err, files) => {
                  if (err) throw err;

                  for (const file of files) {
                    fs.unlink(path.join(directory, file), (err) => {
                       if (err) throw err;
                    });
                  }
                });
                }
		await cl()
        },
}
export default data
