const Discord = require("discord.js");
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/data.db');
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.log("Find Error - Message log DataBase")
});

module.exports = async channel => {
    try {
        db.all(`SELECT * FROM data WHERE guild_id = '${channel.guild.id}'`, (err, rows) => {
            if (err) return
            rows.forEach(function (row) {
                var value = row.log_id
                if(value != '1234') {
                    let embed = new (Discord.MessageEmbed)
                        embed.addField(`채널이 생성되었습니다.`, `► Name: \`${channel.name}\`\n► Type: **${channel.type}**\n► ID: ${channel.id}`)
                        embed.setTimestamp()
                        embed.setColor("#fc3c3c")
                        embed.setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL())
                        try {
                            channel.guild.channels.cache.find(x => x.id == value).send(embed);
                        } catch (error) { return }
                } else { return }
            })
        })
    } catch { return }
};