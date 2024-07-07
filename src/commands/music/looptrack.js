const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { useQueue, useMainPlayer } = require("discord-player")
const { YouTubeExtractor } = require('@discord-player/extractor');
const { description } = require("./play");

module.exports = {
  name: "loop",
  description: "loops the current song",
  

  callback: async (client, interaction) => {
    if(!interaction.member.voice.channel) {
      return interaction.editReply("You need to be in a VC to use this command");
    }

    const queue = useQueue(interaction.guild.id);

    if(!queue) {
      return interaction.editReply("No songs in queue");
    }

    //mode 1 -> loops the track mode 
    queue.setRepeatMode(1);
    await interaction.editReply("looping the song");

  },
};