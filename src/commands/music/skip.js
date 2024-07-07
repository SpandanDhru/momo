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

    if(!queue) {
      return interaction.editReply("No songs in queue");
    }

    try {
      queue.node.skip();
      await interaction.editReply("we skip yo");

      const currentSong = queue.currentTrack;

      if(!currentSong) {
        return interaction.editReply("no songs in queue yo");
      }else {
        let embed = new EmbedBuilder();
        embed
          .setTitle("Now Playing")
          .setDescription(`**[${currentSong.title}](${currentSong.url})**`)
          .setThumbnail(currentSong.thumbnail)
          .setColor("#ff0000");

          await interaction.editReply({
            embeds: [embed]
        });
      }



    } catch (error) {
      console.error(error);
      return interaction.editReply("error due to skip yo");
    }

  },
};