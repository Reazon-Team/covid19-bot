const { Client } = require("discord.js");
const { readdir } = require("fs");
const { sep } = require("path");
const config = require("../config");

class Bot extends Client {

    constructor(options) {
        super(options);
        this.config = config;
        this.commands = [];
    }

    loadCommands(dir) {
        readdir(`${dir}${sep}commands`, (err, subfolders) => {
            if(err) return console.log(err);

            subfolders.forEach((folder) => {
                readdir(`${dir}${sep}commands${sep}${folder}`, (err, files) => {
                    if(err) return console.log(err);
                    
                    files.forEach((f) => {
                        delete require.cache[require.resolve(`${dir}${sep}commands${sep}${folder}${sep}${f}`)];
                        let cmd = require(`${dir}${sep}commands${sep}${folder}${sep}${f}`);
                        let cmdName = f.split(".").shift();
                        this.commands.push(cmd);
                        console.log(`Loading Command: ${cmdName}`);
                    });
                });
            });
        });
    }
}

module.exports.Bot = Bot;