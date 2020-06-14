const Discord = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/data.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.log(err)
});


  
module.exports.run = async (miya, message) => {
    db.serialize();
    db.all(`SELECT * FROM data WHERE guild_id = '${message.guild.id}'`, (err, rows) => {
        let annch = rows[0].notice_id
        let logch = rows[0].log_id
        let welch = rows[0].custom_id                                 
        if (annch === "1234") { annch.replace(/1234/g, "설정되어 있지않아요!") } else { global.annch = annch }
        if (logch === "1234") { logch.replace(/1234/g, "설정되어 있지않아요!") } else { global.logch = logch }
        if (welch === "1234") { welch.replace(/1234/g, "설정되어 있지않아요!") } else { global.welch = welch }
        let embed = new (Discord.MessageEmbed)
            embed.setThumbnail(miya.user.avatarURL())
            embed.setColor("#5fe9ff")
            embed.setTitle(`${message.guild.name}서버 정보 및 미야 설정`)
            embed.addField(`접두사`, `미야야`)
        if (annch === "설정되어 있지않아요!" || annch === "1234") { embed.addField(`공지 채널`, `설정되어 있지않아요!`, true) } else { embed.addField(`공지 채널`, `<#${annch}>`, true) }
        if (logch === "설정되어 있지않아요!" || logch === "1234") { embed.addField(`로그 채널`, `설정되어 있지않아요!`, true) } else { embed.addField(`로그 채널`, `<#${logch}>`, true) }
        if (welch === "설정되어 있지않아요!" || welch === "1234") { embed.addField(`입퇴장 채널`, `설정되어 있지않아요!`, true) } else { embed.addField(`입퇴장 채널`, `<#${welch}>`, true)  }
            embed.addField(`서버 오너`, `${message.guild.owner.displayName}님`, true)
            embed.addField(`서버 이름`, `${message.guild.name}`, true)
            embed.addField(`서버 봇 갯수`, `${message.guild.members.cache.filter(x => x.user.bot).size}개`, true)
            embed.addField(`서버 역할 갯수`, `${message.guild.roles.cache.size}개`, true)
            embed.addField(`서버 전체 인원`, `${message.guild.memberCount}명`, true)
        message.channel.send(embed);

    })
}

exports.callSign = ['서버상태', 'status', '서버정보']
exports.helps = {
    description: '서버정보와 봇 설정을 보여줍니다.',
    uses: '서버정보'
}
