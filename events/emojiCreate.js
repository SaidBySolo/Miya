const Discord = require("discord.js");
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/data.db');
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.log("Find Error - Message log DataBase")
});

module.exports = async emoji => {
    try {
        db.all(`SELECT * FROM data WHERE guild_id = '${emoji.guild.id}'`, (err, rows) => {
            if (err) return
            rows.forEach(function (row) {
                var value = row.log_id
                if(value == 'true') {
                    let embed = new (Discord.MessageEmbed)
                        embed.addField(`이모지가 생성 되었습니다.`, `► Name: \`${emoji.name}\`\n► Emoji: **${emoji.animated}**\n► ID: ${emoji.id}`)
                        embed.setThumbnail("https://cdn.discordapp.com/emojis/" + emoji.id)
                        embed.setTimestamp()
                        embed.setColor("#fc3c3c")
                        embed.setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL())
                        try {
                            emoji.guild.channels.cache.find(x => x.id == value).send(embed);
                        } catch (error) { return }
                } else { return }
            })
        })
    } catch { return }
};