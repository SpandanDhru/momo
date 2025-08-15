## Momo - A Discord Music Bot

A feature-rich music bot for Discord built with **JavaScript**, **Node.js**, and **discord.js**, providing seamless music playback from YouTube and Spotify.

## Features
- 🎵 **Play music** from YouTube and Spotify  
- 📜 **Queue system** to manage tracks  
- ⏭ **Skip**, ⏹ **Stop**, 🔁 **Loop**, 🔀 **Shuffle**, and much more  
- 🛠 Easy to customize and expand

## Requirements
- Node v16+
- npm v7+
- A Discord Bot token from [Discord Developer Portal](https://discord.com/developers/applications)

## Commands
| Command | Description |
|---------|-------------|
| `/play <song>`   | Play a song from a URL or search query |
| `/stop`          | Stop playback and leave the voice channel |
| `/skip`          | Skip to the next track |
| `/queue`         | View the song queue |
| `/loop`          | Loop the current song |
| `/loopq`         | Loop the entire queue |
| `/endloop`       | End all looping and autoplay |
| `/shuffle`       | Shuffle the queue |
| `/autoplay`      | Autoplay related tracks |
| `/ping`          | Test the bot’s connection |
| `/help`          | Show help information |

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/SpandanDhru/momo.git
   cd momo
   ```
   
2. Install Dependencies
   ```bash
   npm install
   npm install discord-player @discord-player/extractor
   npm install --save @ffmpeg-installer/ffmpeg
   npm install discord-player-youtubei
   ```
   
3. Create a **.env** file in the src directory and add:
   ```bash
   TOKEN=your_discord_bot_token
   ```
4. Create a **configure.json** file in the root directory and fill the fields
   ```bash
   { "testServer": "testServer", "clientId": "clientId", "devs": ["dev"] }
   ```
   - **testServer** is the Discord server (guild) ID where you test the bot.
   - **clientId** is the unique application ID of your Discord bot (from the [Discord Developer Portal](https://discord.com/developers/applications)).
   - **devs** is an array of Discord user IDs who are marked as bot developers

5. Start the bot in the **src** directory
   ```bash
   node index.js
   ```

## Further Assistance
- [Discord Player Docs](https://discord-player.js.org/)
- [Discord Player Youtubei Setup](https://github.com/retrouser955/discord-player-youtubei)
