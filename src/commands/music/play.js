const { ApplicationCommandOptionType, EmbedBuilder, BaseEmbed, ErrorEmbed } = require("discord.js");
const { useQueue, useMainPlayer, QueryType } = require("discord-player")
const { YouTubeExtractor, SpotifyExtractor } = require('@discord-player/extractor');


module.exports = {
    name: "play",
    description: "Play a song",
    options: [
        {
            name: "url",
            description: "Play some music",
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    callback: async (client, interaction) => {
        if(!interaction.member.voice.channel) {
            return interaction.editReply("You need to be in a VC to use this command");
        }
        
        const player = useMainPlayer();
        const queue = useQueue(interaction.guild.id);
        let query = interaction.options.getString("url")

        let embed = new EmbedBuilder();

        await client.player.extractors.register(YouTubeExtractor, {});
        await client.player.extractors.register(SpotifyExtractor, {});

        const result = await client.player.search(query, {
            requestedBy: interaction.user,
            searchEngine: 'auto',
        });

        if (result.tracks.length === 0)
            return interaction.editReply("No results");

        const song = result.tracks[0];
        embed
            .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
            .setThumbnail(song.thumbnail)
            .setFooter({ text: `Duration: ${song.duration}`});
        
        try {
            const {track, searchResult} = await player.play(interaction.member.voice.channel, result, {
                nodeOptions: {
                    metadata: interaction.channel,
                    leaveOnEnd: false,
                },
            });

        } catch (error) {
            console.log(`Something went wrong: ${error.message}`);
            return;
        }

        try{
            console.log(queue.tracks);
        }catch(e) {
            console.log("ERRROR YO");
        }

        await interaction.editReply({
            embeds: [embed]
        });
        
    },
};

// const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
// const { useQueue, useMainPlayer, QueryType } = require("discord-player");
// const { YouTubeExtractor, SpotifyExtractor } = require('@discord-player/extractor');

// module.exports = {
//     name: "play",
//     description: "Play a song",
//     options: [
//         {
//             name: "url",
//             description: "Play some music",
//             type: ApplicationCommandOptionType.String,
//             required: true,
//         }
//     ],

//     callback: async (client, interaction) => {
//         if (!interaction.member.voice.channel) {
//             return interaction.editReply("You need to be in a VC to use this command");
//         }
        
//         const player = useMainPlayer();
//         const queue = useQueue(interaction.guild.id);
//         let query = interaction.options.getString("url");

//         let embed = new EmbedBuilder();

//         await client.player.extractors.register(YouTubeExtractor, {});
//         await client.player.extractors.register(SpotifyExtractor, {});

//         const result = await client.player.search(query, {
//             requestedBy: interaction.user,
//             searchEngine: QueryType.AUTO,
//         });

//         if (result.tracks.length === 0)
//             return interaction.editReply("No results");

//         if (result.playlist) {
//             // If the result is a playlist, add all tracks from the playlist
//             result.tracks.forEach(track => queue.addTrack(track));

//             embed
//                 .setDescription(`**${result.tracks.length} songs from [${result.playlist.title}](${result.playlist.url})** have been added to the Queue`)
//                 .setThumbnail(result.playlist.thumbnail);

//         } else {
//             // If the result is a single track
//             const song = result.tracks[0];
//             queue.addTrack(song);

//             embed
//                 .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
//                 .setThumbnail(song.thumbnail)
//                 .setFooter({ text: `Duration: ${song.duration}` });
//         }

//         try {
//             if (!queue.connection) await queue.connect(interaction.member.voice.channel);
//             await queue.node.play();
//         } catch (error) {
//             console.log(`Something went wrong: ${error.message}`);
//             return interaction.editReply("Could not play the song.");
//         }

//         await interaction.editReply({
//             embeds: [embed]
//         });
//     },
// };


