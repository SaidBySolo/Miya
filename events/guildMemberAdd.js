const Discord = require("discord.js");
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/data.db');
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.log("Find Error - Message log DataBase")
});

module.exports = async member => {
    try{
        db.all(`SELECT * FROM data WHERE guild_id = '${member.guild.id}'`, (err, rows) => {
            rows.forEach(function (row) {
                if(row.custom_id != "1234") {
                    let arr1 = row.welcome.replace(/{member}/g, member)
                    let arr2 = arr1.replace(/{guild}/g, member.guild.name)
                    let arr3 = arr2.replace(/{count}/g, member.guild.memberCount)
                    member.guild.channels.cache.find(x => x.id == `${row.custom_id}`).send(`${arr3}`)
                } else { return }
            })
        })
    } catch { return }
}