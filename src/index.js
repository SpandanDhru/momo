require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const { Player } = require("discord-player")
const eventHandler = require('./handlers/eventHandler');
const { YoutubeiExtractor, createYoutubeiStream } = require("discord-player-youtubei");
// const { SpotifyExtractor } = require('@discord-player/extractor');
const { DefaultExtractors } = require('@discord-player/extractor');
const DeezerExtractor = require('discord-player-deezer').DeezerExtractor;
const { SpotifyExtractor } = require("discord-player-spotify");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates,
  ],
});

eventHandler(client);

client.player = new Player(client);


client.player.extractors.register(YoutubeiExtractor, {
  streamOptions: {
    highWaterMark: 1 << 25,
    useClient: "WEB_EMBEDDED"
  },
  generateWithPoToken: true
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


