const discord = require('discord.js');

module.exports.run = async (miya, message) => {
    const fetch = require('node-fetch');
		
    fetch('http://hangang.dkserver.wo.tc/').then(res => res.json()).then(json => {
        if(json.result) {
            if(json["temp"] < 10) {
                let embed = new (discord.MessageEmbed)
                    embed.setAuthor(message.author.username, message.author.avatarURL())
                    embed.setColor("#5fe9ff")
                    embed.setDescription(`현재 한강의 온도는 \`${json["temp"]}도\`이에요!`)
                    embed.setFooter("거 수온이 뜨듯하구만!")
                message.channel.send(embed)
            } else {
                let embed = new (discord.MessageEmbed)
                    embed.setAuthor(message.author.username, message.author.avatarURL())
                    embed.setColor("#5fe9ff")
                    embed.setDescription(`현재 한강의 온도는 \`${json["temp"]}도\`이에요!`)
                    embed.setFooter("거 수온이 얼음장이구만!")
                message.channel.send(embed)
            }
        }
    });
}

exports.callSign = ['hangang', '한강']
exports.helps = {
    description: '현재 한강온도를 보여줍니다.',
    uses: '한강'
}