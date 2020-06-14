const Discord = require('discord.js')
const { join } = require('path')

module.exports = class Miya extends Discord.Client {
    constructor(config, db) {
        super() 
        this.settings = config
        this.db = db || null
        this.commands = new Discord.Collection()

        this.on('guildCreate', async guild => {
            if(this.db) {
                try {
                    console.log("Added from "+guild.id)
                    db.run(`INSERT or IGNORE INTO data(guild_id) VALUES('${guild.id}')`)
                } catch { return }
            }
        })
        
        this.on('guildDelete', async guild => {
            if(this.db) {
                try {
                    console.log("Removed from "+guild.id)
                    db.run(`DELETE FROM data WHERE guild_id = '${guild.id}'`)
                } catch { return }
            }
        })
        const commands = require(join(__dirname, './', config.commands))
        Object.keys(commands).forEach(k => {
            const command = commands[k]
            console.log(`${config.commands.split(/\\|\//).pop()}.${k} loaded`)
            command.callSign.forEach(c => {
                this.commands.set(c, command)
            })
        })
        this.login(config.token)
    }
}