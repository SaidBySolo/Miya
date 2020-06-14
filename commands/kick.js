const error = require('../utils/embed.js')

module.exports.run = async (miya, message) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return error.notper(message)
        let args = message.mentions.members.first();
        if (!args) {
            return error.wrongcmd(message, "`미야야 추방 @멘션`")
        };
        let member = message.mentions.members.first();
        member.kick().then(() => {
            return message.react("659355468715786262")
        }).catch(() => {
            return error.equalPerms(message)
        });
}

exports.callSign = ['kick', '킥', '추방', '내보내기']
exports.helps = {
    description: '서버에서 해당 유저를 추방시킵니다.',
    uses: '추방',
    permission: 'KICK_MEMBERS'   
}