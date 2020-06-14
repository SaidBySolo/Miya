const discord = require('discord.js');

module.exports.run = async (miya, message, query) => {
    var strArr = query.args
    var RanInt = Math.floor(Math.random() * strArr.length);
    if(strArr[0] == undefined) {
        return error.wrongcmd(message, "`미야야 골라 단어1 단어2 단어3 ...`")
    } else {
        var embed = new (discord.MessageEmbed)
        embed.setColor('#abcfff')
        embed.setAuthor(message.author.username, message.author.avatarURL())
        embed.setDescription(strArr[RanInt])
        message.channel.send(embed);
    }
}

exports.callSign = ['select', '골라', '골라줘']
exports.helps = {
    description: '단어 중 랜덤하게 하나를 미야가 고릅니다.',
    uses: '골라'
}