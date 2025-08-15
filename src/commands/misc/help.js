// module.exports = {
//   name: "help",
//   description: "Learn about all the commands",
//   callback: (client, interaction) => {
//     const commands = `
//     \`\`\`
//     play      -> play a song
//     stop      -> stop playing and leave voice channel
//     skip      -> skip to the next track
//     queue     -> shows the queue
//     loop      -> loops the current song
//     loopq     -> loops the queue
//     endloop   -> ends all looping and autoplay
//     shuffle   -> shuffles the queue
//     autoplay  -> autoplay related tracks
//     ping      -> test connection
//     help      -> get info on bot
//     \`\`\`
    
//     Supports YouTube and Spotify currently
    
//     For details: 
//     https://github.com/SpandanDhru/momo.git`;
    
//     interaction.editReply(commands);
//   },
// };

const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",
  description: "Learn about all the commands",
  callback: (client, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle("Momo Bot Commands")
      .setDescription("Here’s a list of available commands and what they do:")
      .setColor("#FFD700")
      .addFields(
        { name: "Music Commands", value: 
          "`play` -> Play a song\n" +
          "`stop` -> Stop playing and leave voice channel\n" +
          "`skip` -> Skip to the next track\n" +
          "`queue` -> Show the current queue\n" +
          "`loop` -> Loop the current song\n" +
          "`loopq` -> Loop the queue\n" +
          "`endloop` -> End all looping and autoplay\n" +
          "`shuffle` -> Shuffle the queue\n" +
          "`autoplay` -> Play related tracks automatically"
        },
        { name: "Utility Commands", value: 
          "`ping` -> Test bot connection\n" +
          "`help` -> Show this help menu"
        },
        { name: "Info", value: "Supports YouTube and Spotify currently.\n[GitHub Repository](https://github.com/SpandanDhru/momo.git)" }
      )

    interaction.editReply({ embeds: [embed] });
  },
};
