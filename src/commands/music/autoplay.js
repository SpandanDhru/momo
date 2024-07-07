const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { useQueue, useMainPlayer } = require("discord-player")
const { YouTubeExtractor } = require('@discord-player/extractor');
const { description } = require("./play");

module.exports = {
  name: "autoplay",
  description: "autoplay related tracks",
  

  callback: async (client, interaction) => {
    if(!interaction.member.voice.channel) {
      return interaction.editReply("You need to be in a VC to use this command");
    }

    const queue = useQueue(interaction.guild.id);

    if(!queue) {
      return interaction.editReply("No songs in queue");
    }

    //mode 3 -> autoplay mode 
    queue.setRepeatMode(3);
    await interaction.editReply("autoplaying");

  },
};