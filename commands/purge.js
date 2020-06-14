const error = require('../utils/embed.js')

module.exports.run = async (miya, message, query) => {	
    let purge = query.message.slice(query.command.length + 1)
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return error.notper(message)
    if (!purge) return error.wrongcmd(message, "`미야야 청소 [1~100]`")
    if (purge > 100) return error.wrongcmd(message, "`미야야 청소 [1~100]`")
    if (purge < 1) return error.wrongcmd(message, "`미야야 청소 [1~100]`")
    if (isNaN(purge) == true || message.content.indexOf('.') != -1) return error.wrongcmd(message, "`미야야 청소 [1~100]`")
    try {
        message.channel.bulkDelete(purge)
        message.channel.send(`<@${message.author.id}> ${purge}개의 메세지를 삭제하였습니다!`).then(msg => msg.delete({ timeout: 3000 }))
    } catch (error) {
        message.channel.send(`<@${message.author.id}> :< 오류가 발생했어요..`)
    }     
}

exports.callSign = ['청소', '삭제', 'purge', 'delete']
exports.helps = {
    description: '메세지를 삭제합니다.',
    uses: '청소',
    permission: 'MANAGE_MESSAGES'
}
