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
        const queue = client.player.nodes.create(interaction.guild, {
            metadata: {
                channel: interaction.channel,
                client: interaction.guild.members.me,
                requestedBy: interaction.user,
            },
            selfDeaf: true,
            volume: 80,
            leaveOnEmpty: true,
            leaveOnEmptyCooldown: 300000,
            leaveOnEnd: true,
            leaveOnEndCooldown: 300000,
        });
        let query = interaction.options.getString("url")

        let embed = new EmbedBuilder();

        await client.player.extractors.register(YouTubeExtractor, {});
        await client.player.extractors.register(SpotifyExtractor, {});

        const result = await client.player.search(query, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });

        if (result.tracks.length === 0)
            return interaction.editReply("No results");

        if (result.playlist) {
            result.tracks.forEach(track => queue.addTrack(track));

            embed
                .setDescription(`**${result.tracks.length} songs from [${result.playlist.title}](${result.playlist.url})** have been added to the Queue`)
                .setThumbnail(result.playlist.thumbnail);
            
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

        } catch (error) {
            console.log(`Something went wrong: ${error.message}`);
            return;
        }

        await interaction.editReply({
            embeds: [embed]
        });
        
    },
};


