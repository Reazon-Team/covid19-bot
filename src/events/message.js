module.exports.run = (client, msg) => {

    if(
        msg.author.bot ||
        !msg.guild ||
        !msg.content.startsWith(client.config.prefix)
    ) return;

    if(msg.mentions.has(client.user)){
        // Mention du client
    }

    let args = msg.content.substring(client.config.prefix.length).split(" ");
    let cmdName = args.shift().toLowerCase();
    let command = client.commands.find((cmd) => cmd.info.name === cmdName || cmd.info.aliases.includes(cmdName));

    if(command){
        let neededPermissions = [];

        // Bot perms
        if(!command.info.botPermissions.includes("EMBED_LINKS")){
            command.info.botPermissions.push("EMBED_LINKS");
        }
        command.info.botPermissions.forEach((perm) => {
            if(!msg.channel.permissionsFor(msg.guild.me).has(perm)){
                neededPermissions.push(perm);
            }
        });
        if(neededPermissions.length > 0){
            return msg.channel.send(`I do not have the permissions to run this command ! (${neededPermissions.join(", ")})`);
        }

        // User perms
        neededPermissions = [];
        command.info.userPermissions.forEach((perm) => {
            if(!msg.channel.permissionsFor(msg.member).has(perm)){
                neededPermissions.push(perm);
            }
        });
        if(neededPermissions.length > 0){
            return msg.channel.send(`You do not have the permissions to run this command ! (${neededPermissions.join(", ")})`);
        }

        try {
            command.run(client, msg, args);
        } catch(err) {
            console.log(err);
        }
    }
}