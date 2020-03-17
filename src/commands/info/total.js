const { MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports.run = async(client, msg, args) => {

    let req = await axios.get("https://coronavirus-19-api.herokuapp.com/all");
    let res = req.data;
    let footer = client.config.embed.footer[Math.floor(Math.random() * client.config.embed.footer.length)];

    let embed = new MessageEmbed()
        .setColor(client.config.embed.color)
        .setTitle("Coronavirus | Covid-19")
        .addFields([
            {name: "Cas Totaux", value: res.cases},
            {name: "Décès Totaux", value: res.deaths},
            {name: "Guéris Totaux", value: res.recovered} 
        ])
        .setFooter(footer)
    return msg.channel.send(embed);
}


module.exports.info = {
    name: "total",
    aliases: [],
    botPermissions: [],
    userPermissions: [],
    ownerOnly: false,
    dir: __dirname
}