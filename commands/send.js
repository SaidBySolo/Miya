const Discord = require('discord.js');
const error = require('../utils/embed.js')
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/data.db');
const config = require("../data/config.json")
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.log(err)
});

module.exports.run = async (miya, message, query) => {
    if(config.owners.some(word => message.author.id.includes(word))) {
        let filter = (reaction, user) => (reaction.emoji.name === '⭕' || reaction.emoji.name === '❌') && user.id === message.author.id
		let msg = query.message.slice(query.command.length + 1)
        if(msg == "") {
            return error.wrongcmd(message, "`미야야 공지사항 [텍스트]`")
        }
        db.serialize();
        db.all(`SELECT * FROM data`, (err, rows) => {
            let embed = new (Discord.MessageEmbed)
                embed.setColor("#5fe9ff")
                embed.setTitle("미야 봇 공지사항")
                embed.setDescription(msg)
                embed.setThumbnail(miya.user.avatarURL({ format: "png"}))
            embed.setFooter("공지채널을 변경할려면 명령어를 통해 변경해주세요!\n" + message.author.username + "(개발자) - 인증됨")
            let embed1 = new (Discord.MessageEmbed)
                embed1.setColor("#5fe9ff")
                embed1.setTitle("공지사항 전송 여부!")
                embed1.setDescription(`
정말로 ${miya.guilds.cache.size}개의 서버에
**${msg}**
라는 공지사항을 전송하시겠습니까?
아래 반응을 추가하여 예/아니오를 선택해주세요!
⭕ - 네
❌ - 아니오
`)
                embed1.addField(`도움이 필요하다면 아래 서버로 접속해주세요.`, '[서포트서버 서버 접속하기](https://discord.gg/mdgaSjB)')
            message.channel.send(embed1).then((th) => {
                th.react('⭕')
                th.react('❌')
                th.awaitReactions(filter, {
                    max: 1
                }).then((collected) => {
                    if (collected.array()[0].emoji.name === '⭕') {
                        rows.forEach(function (row) {
                            try {
                                /*
                                if (row.ann_channel === "1234") {
                                    let chid = miya.guilds.cache.get(row.guild_id)
                                    miya.channels.cache.get(chid.systemChannelID).send(embed)
                                } else {
                                    miya.channels.cache.get(row.ann_channel).send(embed)
                                }
                                */
                               if(row.notice_id != "1234") {
                                    miya.channels.cache.get(row.notice_id).send(embed)
                               }
                            } catch (err) { return }
                        });
                        let embed2 = new (Discord.MessageEmbed)()
                            embed2.setColor("#5fe9ff")
                            embed2.setTitle("전송완료!")
                            embed2.setDescription(`모든서버에\n\`${msg}\`\n공지를 전달했어요!`)
                        th.edit(embed2)
                    } else {
                        let embed3 = new (Discord.MessageEmbed)()
                            embed3.setColor("#5fe9ff")
                            embed3.setTitle("전송실패")
                            embed3.setDescription("실패 사유 : 유저가 직접 취소함")
                        th.edit(embed3)
                    }
                })
            })
        }); 
    } else {
        return error.notown(message)
    }
}

exports.callSign = ['send', '공지사항']
exports.helps = {
    OwnerCheck: true
}