const error = require('../utils/embed.js')

module.exports.run = async (miya, message) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return error.notper(message)
        let args = message.mentions.members.first();
        if (!args) {
            return error.wrongcmd(message, "`미야야 차단 @멘션`")
        };
        let member = message.mentions.members.first();
        member.ban().then(() => {
            return message.react("659355468715786262")
        }).catch(() => {
            return error.equalPerms(message)
        });
}

exports.callSign = ['ban', '벤', '차단', '영구차단']
exports.helps = {
    description: '서버에서 해당 유저를 차단시킵니다.',
    uses: '차단',
    permission: 'BAN_MEMBERS'
}