const Discord = require('discord.js');
const error = require('../utils/embed.js')
const config = require("../data/config.json")
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/data.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.log(err)
});

module.exports.run = async (miya, message, query) => {
	if(config.owners.some(word => message.author.id.includes(word))) {
		var printError = function(error) {
            let embed = new (Discord.MessageEmbed)
                embed.setAuthor(message.author.username, message.author.avatarURL())
				embed.setTitle("오류")
				embed.setDescription(`${error.name}: ${error.message}`)
				embed.setColor(config.red);
			message.channel.send(embed)
		}

        let embed2 = new (Discord.MessageEmbed)
            embed2.setAuthor(message.author.username, message.author.avatarURL())
			embed2.setTitle("오류")
			embed2.setDescription("잘못된 클라이언트 종료 방식입니다.")
			embed2.setColor(config.red);

		let text = query.message.slice(query.command.length + 1)

		if(text.indexOf("exit") != -1 && text.indexOf("process") != -1) {
			return message.channel.send(embed2)
		} else {
			try {
				let evaled = eval(text);
				if (typeof evaled !== "string")
				evaled = require("util").inspect(evaled);
				
				let embed = new (Discord.MessageEmbed)
                embed.setColor("#5fe9ff")
                if(evaled.length > 1900) {
                    embed.setDescription('입력 :\n```js\n' + text + '\n```\n출력 :```xl\n' + "2000 글자가 넘습니다." + '\n```')
                } else {
                    embed.setDescription('입력 :\n```js\n' + text + '\n```\n출력 :```xl\n' + (evaled) + '\n```')
                }
			  	await message.channel.send({ embed: embed });
			} catch (error) {
				if(error instanceof ReferenceError) {
					printError(error, true)        
				} else {
					printError(error, false)
				}
			}
		}
	} else {
		return error.notdev(message)
	}
}

exports.callSign = ['eval', '실행']
exports.helps = {
    OwnerCheck: true
}