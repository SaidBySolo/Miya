const discord = require('discord.js');
const error = require('../utils/embed.js')

module.exports.run = async (miya, message, query) => {
    var id = message.author.id
    var sayMessage = query.message.slice(query.command.length + 1)
    if (sayMessage == "") {
        return error.wrongcmd(message, "`미야야 말해 [텍스트]`")
    } else {
        if (id == '405714654065721344') {
            message.delete()
            message.channel.send(sayMessage);
        } else {
            let embed = new (discord.MessageEmbed)
                embed.setColor("#5fe9ff")
                embed.setAuthor(message.author.username, message.author.avatarURL())
                embed.setDescription(sayMessage)
            message.channel.send(embed)
        }
    }
}

exports.callSign = ['say', '말해', '말해줘']
exports.helps = {
    description: '미야가 당신의 말을 대신 말합니다.',
    uses: '말해'
}