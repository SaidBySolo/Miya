const Discord = require("discord.js");
const i18n = require('i18n');

module.exports.notdev = (message) => {
    let embed = new Discord.MessageEmbed()
        embed.setColor("#5fe9ff")
        embed.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        embed.setDescription(i18n.__({ phrase: 'notdev', locale: "kr" }))
    message.channel.send({ embed: embed })
}

module.exports.notown = (message) => {
    let embed = new Discord.MessageEmbed()
        embed.setColor("#5fe9ff")
        embed.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        embed.setDescription(i18n.__({ phrase: 'notown', locale: "kr" }))
    message.channel.send({ embed: embed })
}

module.exports.notper = (message) => {
    let embed = new Discord.MessageEmbed()
        embed.setColor("#5fe9ff")
        embed.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        embed.setDescription(i18n.__({ phrase: 'notper', locale: "kr" }))
    message.channel.send({ embed: embed })
}

module.exports.equalPerms = (message) => {
    let embed = new Discord.MessageEmbed()
        embed.setColor("#5fe9ff")
        embed.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        embed.setDescription(i18n.__({ phrase: 'Equal_Permission', locale: "kr" }))
    message.channel.send({ embed: embed })
}

module.exports.wrongcmd = (message, input) => {
    let embed = new Discord.MessageEmbed()
        embed.setColor("#ff6060")
        embed.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        embed.setDescription(input + " 가 올바른 명령어에요!")
    message.channel.send({ embed: embed })
}

module.exports.sendEmbed = (message, input) => {
    let embed = new Discord.MessageEmbed()
        embed.setColor("#5fe9ff")
        embed.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        embed.setDescription(input)
    message.channel.send({ embed: embed })
}