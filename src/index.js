require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const { Player } = require("discord-player")
const eventHandler = require('./handlers/eventHandler');
const { YoutubeiExtractor, createYoutubeiStream } = require("discord-player-youtubei");
const { SpotifyExtractor } = require('@discord-player/extractor');
const { DefaultExtractors } = require('@discord-player/extractor');

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

client.player.extractors.unregisterAll();

client.player.extractors.register(YoutubeiExtractor, {});
client.player.extractors.register(SpotifyExtractor, {});

client.login(process.env.TOKEN);
