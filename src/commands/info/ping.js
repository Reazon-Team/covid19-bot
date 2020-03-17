const { MessageEmbed } = require("discord.js");

module.exports.run = async(client, msg, args) => {

    let pingMsg = await msg.channel.send("Ping ... ?");

    let embed = new MessageEmbed()
        .setColor(client.config.embed.color)
        .addFields([
            { name: "Host Ping", value: `\`${pingMsg.createdTimestamp - msg.createdTimestamp}ms\`` },
            { name: "API Ping", value: `\`${client.ws.ping}\``}
        ]);

    pingMsg.delete();
    msg.channel.send(embed);
}

module.exports.info = {
    name: "ping",
    aliases: ["latence"],
    botPermissions: [],
    userPermissions: [],
    ownerOnly: false,
    dir: __dirname
}