const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { useQueue, useMainPlayer } = require("discord-player")
const { YouTubeExtractor } = require('@discord-player/extractor');


module.exports = {
    name: "play",
    description: "Play a song",
    options: [
        {
            name: "url",
            description: "URL for song",
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

        const result = await client.player.search(query);
        if (result.tracks.length === 0)
            return interaction.editReply("No results");

        const song = result.tracks[0];
        embed
            .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
            .setThumbnail(song.thumbnail)
            .setFooter({ text: `Duration: ${song.duration}`});
        
        try {
            await player.play(interaction.member.voice.channel, result, {
                nodeOptions: {
                    metadata: interaction.channel,
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