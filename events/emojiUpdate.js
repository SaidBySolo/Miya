const Discord = require("discord.js");
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/data.db');
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.log("Find Error - Message log DataBase")
});

module.exports = async (oldEmoji, newEmoji) => {
    try {
        db.all(`SELECT * FROM data WHERE guild_id = '${oldEmoji.guild.id}'`, (err, rows) => {
            if (err) return
            rows.forEach(function (row) {
                var value = row.log_id
                if(value != '1234') {
                    let embed = new (Discord.MessageEmbed)
                        embed.addField(`이모지 설정이 변경 되었습니다.`, `► Before Name: \`${oldEmoji.name}\`\n► After Name: \`${newEmoji.name}\`\n► ID: ${oldEmoji.id}`)
                        embed.setThumbnail("https://cdn.discordapp.com/emojis/" + oldEmoji.id)
                        embed.setTimestamp()
                        embed.setColor("#fc3c3c")
                        embed.setFooter(`${oldEmoji.client.user.username}#${oldEmoji.client.user.discriminator}`, oldEmoji.client.user.avatarURL())
                        try {
                            oldEmoji.guild.channels.cache.find(x => x.id == value).send(embed);
                        } catch (error) { return }
                } else { return }
            })
        })
    } catch { return }
};