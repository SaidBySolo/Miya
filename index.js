'use strict'

const Miya = require('./classes/miya')
const config = require('./data/config.json')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./data/data.db', sqlite3.OPEN_READWRITE, (err) => { if (err) console.log(err) });
const miya = new Miya(config, db)
process.on('uncaughtException', function (err) { console.log('uncaughtException 발생 : ' + err) })
require('./utils/eventLoader')(miya);

miya.on('ready', () => {
    console.log(miya.user.username + " is Ready.\n")
    miya.user.setPresence({ activity: { name: `미야야 도움을 입력 해보세요!` }, status: 'online' })
})

miya.on('message', async message => {
    if(message.author.bot) return
    if(!message.guild) return 
    if(!message.content.startsWith(config.prefix)) return
    const query = {
        fullText: message.content,
        message: message.content.split(config.prefix)[1],
        command: message.content.split(config.prefix)[1].split(' ')[0],
        args: message.content.split(config.prefix)[1].split(' ').slice(1)
    }

    const cmd = miya.commands.get(query.command.toLowerCase())
    if(!cmd) return
    let pass = cmd.helps && (cmd.helps.OwnerCheck || cmd.helps.permission) ?
        (
            cmd.helps.OwnerCheck ?
            config.owners.includes(message.author.id) || 'notdev' :
            config.owners.includes(message.author.id) || message.member.hasPermission(cmd.helps.permission) || 'notper'
        ) : true
        if ((typeof pass) === 'boolean' && pass) cmd.run(miya, message, query)
        else if ((typeof pass) === 'string') return
})


