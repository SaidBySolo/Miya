const { MessageEmbed } = require('discord.js')

exports.run = async (miya, message) => {
    let pp = await message.channel.send('계산중이에요...')
    let msgp = "메세지 핑:"
    let p = "현재 미야의 핑!"
    let api = "지연시간 :"
    
    let pingembed = new MessageEmbed()
        .setTitle(p)
        .setColor('#4d93ff')
        .setDescription(`${msgp} ${pp.createdTimestamp - message.createdTimestamp}ms\n${api} ${Math.round(miya.ws.ping)}ms`)
        .setFooter(message.author.username, message.author.avatarURL)
        .setTimestamp()
    pp.edit("현재 미야의 핑이에요!", { embed: pingembed })
}

exports.callSign = ['ping', '핑']
exports.helps = {
    description: '봇의 핑을 보여줍니다.',
    uses: '핑'
}