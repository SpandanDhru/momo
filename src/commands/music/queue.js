const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { useQueue, useMainPlayer } = require("discord-player")
const { YouTubeExtractor } = require('@discord-player/extractor');
const { description } = require("./play");

module.exports = {
  name: "queue",
  description: "shows the queue",
  

  callback: async (client, interaction) => {
    if(!interaction.member.voice.channel) {
      return interaction.editReply("You need to be in a VC to use this command");
    }

    const queue = useQueue(interaction.guild.id);

    if(!queue) {
      return interaction.editReply("No songs in queue");
    }

    if(queue) {
      await interaction.editReply("songs in queue...\n" + queue.tracks.map((song, index) => (index + 1).toString() + " : " + song.title).join('\n'));
    }else {
      await interaction.editReply("queue is empty");
    }
    
  },
};