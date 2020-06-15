const { MessageEmbed } = require('discord.js')

exports.run = async (miya, message) => {
    let pp = await message.channel.send('계산중이에요...')
    let msgp = "메세지 핑:"
    let p = "현재 미야의 핑!"
    let api = "지연시간 :"
    let upt = "업타임 :"
    String.prototype.toHHMMSS = function() {
        let sec_num = parseInt(this, 10)
        let hours = Math.floor(sec_num / 3600)
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60)
        let seconds = sec_num - (hours * 3600) - (minutes * 60)

        if(hours < 10) hours = "0" + hours
        if(minutes < 10) minutes = "0" + minutes
        if(seconds < 10) seconds = "0" + seconds

        let time = `${hours}시간 ${minutes}분 ${seconds}초`
        return time
    }
    let time = process.uptime()
    let uptime = (time + "").toHHMMSS
    
    let pingembed = new MessageEmbed()
        .setTitle(p)
        .setColor('#4d93ff')
        .setDescription(`${msgp} ${pp.createdTimestamp - message.createdTimestamp}ms\n${api} ${Math.round(miya.ws.ping)}ms\n${upt} ${uptime}`)
        .setFooter(message.author.username, message.author.avatarURL)
        .setTimestamp()
    pp.edit("현재 미야의 핑이에요!", { embed: pingembed })
}

exports.callSign = ['ping', '핑']
exports.helps = {
    description: '봇의 핑을 보여줍니다.',
    uses: '핑'
}
