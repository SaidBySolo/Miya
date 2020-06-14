const Discord = require("discord.js");
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/data.db');
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.log("Find Error - Message log DataBase")
});

module.exports = async (oldChannel, newChannel) => {
    try {
        db.all(`SELECT * FROM data WHERE guild_id = '${oldChannel.guild.id}'`, (err, rows) => {
            if (err) return
            rows.forEach(function (row) {
                var value = row.log_id
                if(value != '1234') {
                    let str = '';
                    if(oldChannel.name != newChannel.name)
                        str+=`► 이름: \`${oldChannel.name}\` **->** \`${newChannel.name}\`\n`;
                    let embed = new (Discord.MessageEmbed)
                        embed.addField(`채널 설정이 변경되었습니다.`, `${str}► Channel : <#${newChannel.id}>\n► ID: ${oldChannel.id}`)
                        embed.setTimestamp()
                        embed.setColor("#fc3c3c")
                        embed.setFooter(`${oldChannel.client.user.username}#${oldChannel.client.user.discriminator}`, oldChannel.client.user.avatarURL())
                        try {
                            oldChannel.guild.channels.cache.find(x => x.id == value).send(embed);
                        } catch (error) { return }
                } else { return }
            })
        })
    } catch { return }
};