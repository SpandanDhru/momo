module.exports = {
  name: "help",
  description: "Learn about all the commands",
  callback: (client, interaction) => {
    const commands = `
    **COMMANDS**
    play      -> play a song
    stop      -> stop playing and leave voice channel
    skip      -> skip to the next track
    queue     -> shows the queue
    loop      -> loops the current song
    loopq     -> loops the queue
    endloop   -> ends all looping and autoplay
    shuffle   -> shuffles the queue
    autoplay  -> autoplay related tracks
    ping      -> test connection
    help      -> get info on bot

    Supports YouTube and Spotify currently
    For YouTube playlists, links must be in the format of youtube.com/playlist?
  `;
    
    interaction.editReply(commands);
  },
};
