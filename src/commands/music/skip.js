const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { useQueue, useMainPlayer } = require("discord-player")
const { YouTubeExtractor } = require('@discord-player/extractor');
const { description } = require("./play");

module.exports = {
  name: "skip",
  description: "skip to the next track",

  callback: async (client, interaction) => {
    if(!interaction.member.voice.channel) {
      return interaction.editReply("You need to be in a VC to use this command");
    }

    const queue = useQueue(interaction.guild.id);

    if(!queue || !queue.tracks.length) {
      return interaction.editReply("No songs in queue");
    }

    try {
      queue.node.skip();
      await interaction.editReply("we skip yo");
    } catch (error) {
      console.error(error);
      return interaction.editReply("error due to skip yo");
    }

  },
};