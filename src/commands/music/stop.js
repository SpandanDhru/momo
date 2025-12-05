const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { useQueue, useMainPlayer } = require("discord-player");

module.exports = {
  name: "stop",
  description: "Stop playing and leave voice channel",

  callback: async (client, interaction) => {
    if(!interaction.member.voice.channel) {
      return interaction.editReply("You need to be in a VC to use this command");
    }

    const queue = useQueue(interaction.guild.id);

    if(!queue) {
      return interaction.editReply("No songs in queue");
    }

    try{
      queue.delete();
    }catch(error) {
      console.error(error);
      return interaction.editReply("error due to delete yo");
    }
    
    await interaction.editReply("BYE FRIEND");


  },
};