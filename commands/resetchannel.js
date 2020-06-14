const error = require('../utils/embed.js')
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/data.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.log(err)
});

module.exports.run = async (miya, message) => {
    const args = message.content.slice("미야야").split(' ');
    if(args[2] != "공지" && args[2] != "입퇴장" && args[2] != "로그") return error.wrongcmd(message, "`미야야 채널초기화 [공지/입퇴장/로그]`")

    if(args[2] === "공지") {
        if (!message.member.hasPermission("ADMINISTRATOR")) return error.notper(message)
        db.serialize();
        db.run(`UPDATE data SET notice_id = '1234' WHERE guild_id = '${message.guild.id}'`)
        error.sendEmbed(message, "공지 채널을 `수신 안함`으로 설정했어요!")
    }

    if(args[2] === "로그") {
        if (!message.member.hasPermission("ADMINISTRATOR")) return error.notper(message)  
        db.run(`UPDATE data SET log_id = '1234' WHERE guild_id = '${message.guild.id}'`) 
        error.sendEmbed(message, "로그 채널을 `수신 안함`으로 설정했어요!")
    }

    if(args[2] === "입퇴장") {
        if (!message.member.hasPermission("ADMINISTRATOR")) return error.notper(message)
        db.run(`UPDATE data SET custom_id = '1234' WHERE guild_id = '${message.guild.id}'`)
        error.sendEmbed(message, "환영 채널을 `수신 안함`으로 설정했어요!")
    }
}

exports.callSign = ['채널초기화', 'resetchannel', 'rech']
exports.helps = {
    description: '로그, 입퇴장, 공지 채널설정을 초기화합니다.',
    uses: '채널초기화',
    permission: 'ADMINISTRATOR'
}