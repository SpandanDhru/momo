const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { useQueue, useMainPlayer } = require("discord-player")
const { YouTubeExtractor } = require('@discord-player/extractor');
const { description } = require("./play");

module.exports = {
  name: "queue",
  description: "Display queued songs",

  callback: async (client, interaction) => {
    if(!interaction.member.voice.channel) {
      return interaction.editReply("You need to be in a VC to use this command");
    }

    const queue = useQueue(interaction.guild.id);

    if (!queue || (!queue.currentTrack && queue.tracks.length === 0)) {
      const emptyEmbed = new EmbedBuilder()
            .setTitle("Current Queue")
            .setDescription("The queue is empty.")
            .setFooter({ text: `Requested by ${interaction.user.tag}` }); // add the footer here.

      return interaction.editReply({ embeds: [emptyEmbed] });
    }else {
      
      const currentTrack = queue.currentTrack;
      let embed = new EmbedBuilder()
        .setTitle("Current Queue")
        .setDescription(`**Now Playing:** [${currentTrack.title}](${currentTrack.url})\nDuration: ${currentTrack.duration}`)
        .setThumbnail(currentTrack.thumbnail)
        .setFooter({ text: `Requested by ${currentTrack.requestedBy.tag}` });

      if (queue) {
        embed.addFields({
          name: "Up Next",
          value: queue.tracks.map((song, index) => (index + 1).toString() + " : " + song.title).join('\n')
        });
      } else {
        embed.addFields({ name: "Up Next", value: "No more songs in the queue." });
      }

      await interaction.editReply({ embeds: [embed] });

    }
    
  },
};