const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { useQueue, useMainPlayer } = require("discord-player")
const { YouTubeExtractor } = require('@discord-player/extractor');
const { description } = require("./play");

module.exports = {
  name: "skip",
  description: "skip to the next track",
  options: [
    {
        name: "id",
        description: "song id to skip",
        type: ApplicationCommandOptionType.Integer,
        required: false,
    }
  ],


  callback: async (client, interaction) => {
    if(!interaction.member.voice.channel) {
      return interaction.editReply("You need to be in a VC to use this command");
    }

    const queue = useQueue(interaction.guild.id);

    if(!queue) {
      return interaction.editReply("No songs in queue");
    }

    try {
      let query = interaction.options.getInteger("id");

      if (query !== null && !isNaN(query)) {
        songIndex = query - 1;

        if (songIndex >= 0 && songIndex < queue.getSize()) {
          const trackToSkipTo = queue.tracks.toArray()[songIndex];
          const success = queue.node.jump(trackToSkipTo);

          if (success) {
            await interaction.editReply("we skip yo");
            await interaction.editReply(`Skipped to song at position ${query}.`);
          }else {
            await interaction.editReply("Failed to skip to the song.");
          }

        }else {
          await interaction.editReply("Invalid Song ID");
        }

      }else {
        await interaction.editReply("we skip yo");
        queue.node.skip();
      }

    } catch (error) {
      console.error(error);
      return interaction.editReply("error due to skip yo");
    }

  },
};