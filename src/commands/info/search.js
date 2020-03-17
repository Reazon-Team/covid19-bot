const Discord = require('discord.js');
const Axios = require('axios');
const moment = require('moment');
moment.locale("fr");

module.exports.run = async(client, msg, args) => {

    let res = await Axios.get("https://coronavirus-19-api.herokuapp.com/countries");
    let research = args[0].charAt(0).toUpperCase() + args[0].slice(1);
    let country = res.data.find((c) => c.country === research);
    let footer = client.config.embed.footer[Math.floor(Math.random() * client.config.embed.footer.length)];

    console.log(`Recherche Coronavirus sur ${research} le ${moment().format("LL")} | ${moment().format("LT")}`)

    if(country){
        let embed = new Discord.MessageEmbed()
            .setColor(client.config.embed.color)
            .setAuthor(`Recherche à ${research}`, client.user.avatarURL())
            .setDescription("Résultats :")
            .addFields([
                {name: "Cas", value: country.cases, inline: true},
                {name: "Cas Aujourd'hui", value: country.todayCases, inline: true},
                {name: "Décès Totaux", value: country.deaths, inline: true},
                {name: "Décès Aujourd'hui", value: country.todayDeaths, inline: true},
                {name: "Guéris", value: country.recovered, inline: true},
                {name: "Cas Actifs", value: country.active, inline: true},
                {name: "Cas critiques", value: country.critical, inline: true},
            ])
            .setTimestamp()
            .setFooter(footer);
        return msg.channel.send(embed);
            
    } else {
        let embed = new Discord.MessageEmbed()
            .setColor(client.config.embed.color)
            .setDescription("Aucun résultat trouvé, essayez avec le nom en Anglais")
            .addField("Usage", "`" + client.config.prefix + "search <pays>" + "`")
        return msg.channel.send(embed);
    }
}

module.exports.info = {
    name: "search",
    aliases: ["research"],
    botPermissions: [],
    userPermissions: [],
    ownerOnly: false,
    dir: __dirname
}