const Discord = require('discord.js')

module.exports.run = (client, msg, args) => {

    let footer = client.config.embed.footer[Math.floor(Math.random() * client.config.embed.footer.length)];

    var embed = new Discord.MessageEmbed()
        .setColor(client.config.embed.color)
        .setAuthor("Lien d'invitation", client.user.avatarURL())
        .setDescription("Voici le [Lien d'invitation](https://discordapp.com/oauth2/authorize?client_id=689164616261304363&scope=bot&permissions=2146958847)")
        .setImage("https://i88.servimg.com/u/f88/20/09/25/40/corona11.png")
        .setFooter(footer)
    msg.channel.send(embed)
}

module.exports.info = {
    name: "invite",
    aliases: ["add"],
    botPermissions: [],
    userPermissions: [],
    ownerOnly: false,
    dir: __dirname
}