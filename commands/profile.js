const discord = require('discord.js');

module.exports.run = async (bot, message) => {
    const user = message.mentions.users.first() || message.author; 
    if (!user) {
        let embed = new (discord.MessageEmbed)
            embed.setAuthor(message.author.username, message.author.avatarURL())
            embed.setImage(user.displayAvatarURL({ size: 2048, dynamic: true }))
            embed.setColor("#5fe9ff")
            embed.setFooter("기본 프로필 일 경우 사진이 보이지 않아요!")
            message.channel.send(embed)
    };
    let embed = new (discord.MessageEmbed)
        embed.setAuthor(message.author.username, message.author.avatarURL())
        embed.setImage(user.displayAvatarURL({ size: 2048, dynamic: true }))
        embed.setColor("#5fe9ff")
        embed.setFooter("기본 프로필 일 경우 사진이 보이지 않아요!")
        message.channel.send(embed)
}

exports.callSign = ['프로필', '프사', 'profile', 'avatar']
exports.helps = {
    description: '해당 유저의 프로필을 보여줍니다.',
    uses: '프로필'
}
