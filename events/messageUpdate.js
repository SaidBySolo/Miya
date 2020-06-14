const Discord = require("discord.js");
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/data.db');
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.log("Find Error - Message log DataBase")
});

module.exports = async (oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;
    try {
        db.all(`SELECT * FROM data WHERE guild_id = '${oldMessage.guild.id}'`, (err, rows) => {
            rows.forEach(function (row) {
                var value = row.log_id
                if(value != '1234') {
                    let embed = new (Discord.MessageEmbed)
                    embed.setTitle("메세지가 수정되었습니다.")
                    embed.setColor("#fc3c3c")
                    embed.addField("User", oldMessage.author.tag, true)
                    embed.addField("Channel", `<#${oldMessage.channel.id}>`, true)
                    embed.addField("Before", oldMessage.content, false)
                    embed.addField("After", newMessage.content, true)
                    embed.setFooter(`메세지 아이디: ${oldMessage.id} | 작성자 아이디: ${oldMessage.author.id}`);
                    try {
                        oldMessage.guild.channels.cache.find(x => x.id == value).send(embed);
                    } catch (error) { return }
                };
            })
        });
    } catch { return }
};
