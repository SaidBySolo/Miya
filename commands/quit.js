const error = require('../utils/embed.js')
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/data.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.log(err)
});

module.exports.run = async (miya, message, query) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return error.notper(message)
        let context = query.message.slice(query.command.length + 1)
        if(context == "") {
		    return error.wrongcmd(message, "`미야야 퇴장메세지 [텍스트]\n예시 : 미야야 퇴장메세지 {member}님 {guild}에서 나가셨어요.. | 현재 인원 : {count}`")
        } else {
            db.run(`UPDATE data SET bye = '${context}' WHERE guild_id = '${message.guild.id}'`)
            message.react("659355468715786262")
        }
}

exports.callSign = ['quit', '퇴장메세지', '퇴장메시지']
exports.helps = {
    description: '서버에 유저가 나갔을때 전송할 메세지를 설정합니다.',
    uses: '퇴장메세지',
    permission: 'MANAGE_MESSAGES'   
}