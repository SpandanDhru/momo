const { ApplicationCommandOptionType, EmbedBuilder, BaseEmbed, ErrorEmbed } = require("discord.js");
const { useQueue, useMainPlayer, QueryType } = require("discord-player");
const { SpotifyExtractor } = require('@discord-player/extractor');
const { YoutubeiExtractor } = require("discord-player-youtubei");


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

        const result = await client.player.search(query, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });

        if (result.tracks.length === 0)
            return interaction.editReply("No results");

        if (result.playlist) {
            embed
                .setDescription(`**${result.tracks.length} songs from [${result.playlist.title}](${result.playlist.url})** have been added to the Queue`)
                .setThumbnail(result.tracks[0].thumbnail);
            
        }else {
            const song = result.tracks[0];
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}`});
        }

        try {
            const {track, searchResult} = await player.play(interaction.member.voice.channel, result, {
                nodeOptions: {
                    metadata: interaction.channel,
                    leaveOnEnd: false,
                },
            });

            if (!player.events.listeners("playerStart").length) {
                player.events.on("playerStart", (queue, track) => {
                    const nowPlayingEmbed = new EmbedBuilder()
                        .setTitle("Now Playing 🎶")
                        .setDescription(`**[${track.title}](${track.url})**`)
                        .setThumbnail(track.thumbnail)
                        .setFooter({ text: `Requested by: ${track.requestedBy.username}` });

                    queue.metadata.send({ embeds: [nowPlayingEmbed] });
                });
            }
        } catch (error) {
            console.log(`Something went wrong: ${error.message}`);
            return;
        }

        await interaction.editReply({
            embeds: [embed]
        });
        
    },
};

