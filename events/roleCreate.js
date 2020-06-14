const Discord = require("discord.js");
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/data.db');
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.log("Find Error - Message log DataBase")
});

module.exports = async role => {
    try {
        db.all(`SELECT * FROM data logging WHERE guild_id = '${role.guild.id}'`, (err, rows) => {
            rows.forEach(function (row) {
                var value = row.log_id;
                if(value != '1234') {
                    let embed = new (Discord.MessageEmbed)
                        embed.addField(`역할이 생성 되었습니다.`, `► Name: \`${role.name}\`\n► ID: ${role.id}`)
                        embed.setTimestamp()
                        embed.setColor("#fc3c3c")
                        embed.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)
                        try {
                            role.guild.channels.cache.find(x => x.id == value).send(embed);
                        } catch (error) { return }
                } else { return }
            })
        })
    } catch { return }
};