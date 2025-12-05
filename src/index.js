require('dotenv').config();
const { Client, IntentsBitField, GatewayIntentBits } = require('discord.js');
const { Player } = require("discord-player");
const eventHandler = require('./handlers/eventHandler');
const { YoutubeiExtractor } = require("discord-player-youtubei");
const { SpotifyExtractor } = require("discord-player-spotify");
const { YoutubeExtractor } = require("discord-player-youtube");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ],
});

eventHandler(client);

client.player = new Player(client);

// client.player.extractors.register(YoutubeiExtractor, {
//   streamOptions: {
//     highWaterMark: 1 << 25,
//     useClient: "WEB_EMBEDDED"
//   },
//   generateWithPoToken: true,
//   innertubeConfigRaw: {
//     player_id: '0004de42'
//   }
// });

client.player.extractors.register(YoutubeExtractor, {
  cookie: process.env.YOUTUBE_COOKIE,
  filterAutoplayTracks: true, // enabled by default
  disableYTJSLog: true, // silence youtubei.js logs
});



client.player.extractors.register(SpotifyExtractor, {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  bridge: true
});


client.player.on("playerError", (queue, error) => {
  console.error(`[Player Error] ${error.message}`);
});



client.login(process.env.TOKEN);
