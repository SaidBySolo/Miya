const commands = require('./')

exports.run = async (miya, message) => {
    const help = {
        fields: [
        {
            name: "미야 사용법",
            value: '접두사: 미야야'
        }
        ],
        color: "#4d93ff"
    }

    let keys = Object.keys(commands)
    for (k of keys) {
        if (commands[k].helps && commands[k].helps.description) help.fields.push({
            name: commands[k].helps.description,
            value: '미야야 ' + commands[k].helps.uses,
            inline: true
        })

        if (keys.length === keys.indexOf(k) + 1) {
            message.channel.send(`<@${message.author.id}> DM을 확인해주세요!`)
            message.author.send({ embed: help })
        }
    }
}

exports.callSign = ['help', 'Help', '도움', '도움말']
exports.helps = {
    description: '도움말을 보여줍니다',
    uses: '도움'
}