module.exports = {
    name: "ping",
    description: "Pong!",
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],

    callback: (client, interaction) => {
        interaction.editReply(`Pong ${client.ws.ping}ms`);
    },
};