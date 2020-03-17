const Discord = require('discord.js')

module.exports.run = async(client, msg, args) => {

    var embed = new Discord.MessageEmbed()
        .setColor(client.config.embed.color)
        .setAuthor("Menu help", client.user.avatarURL())
        .setImage("https://i88.servimg.com/u/f88/20/09/25/40/corona10.png")
        .addField(" :flag_fr: Commandes :", `\n══════════ \n**=> ${client.config.prefix}help** : Affiche ce menu. \n**=> ${client.config.prefix}search <pays>** : Recherche les Infos Recentes sur le Corona dans le pays cité. \n**=> ${client.config.prefix}total** : Affiche les Infos sur le Corona à l'échelle mondiale. \n**=> ${client.config.prefix}map <indisponible>** : Montre une carte affichant l'evolution et la regression de l'epidémie. \n══════════`)
        .setFooter(client.config.embed.footer)
    msg.channel.send(embed)
}

module.exports.info = {
    name: "help",
    aliases: ["menu"],
    botPermissions: [],
    userPermissions: [],
    ownerOnly: false,
    dir: __dirname
}