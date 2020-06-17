const reqEvent = (event) => require(`../events/${event}`);
const Discord = require("discord.js");

module.exports = miya => {
    miya.on('ready', () => reqEvent('ready')(miya));
    miya.on('messageDelete', (message) => reqEvent('messageDelete')(message));
    miya.on('messageUpdate', (oldMessage, newMessage) => reqEvent('messageUpdate')(oldMessage, newMessage));
    miya.on('channelCreate', (channel) => reqEvent('channelCreate')(channel));
    miya.on('channelDelete', (channel) => reqEvent('channelDelete')(channel));
    miya.on('channelUpdate', (oldChannel, newChannel) => reqEvent('channelUpdate')(oldChannel, newChannel));
    miya.on('emojiCreate', (emoji) => reqEvent('emojiCreate')(emoji));
    miya.on('emojiDelete', (emoji) => reqEvent('emojiDelete')(emoji));
    miya.on('emojiUpdate', (oldEmoji, newEmoji) => reqEvent('emojiUpdate')(oldEmoji, newEmoji));
    miya.on('roleCreate', (role) => reqEvent('roleCreate')(role));
    miya.on('roleDelete', (role) => reqEvent('roleDelete')(role));
    miya.on('guildMemberAdd', (member) => reqEvent('guildMemberAdd')(member))
    miya.on('guildMemberRemove', (member) => reqEvent('guildMemberRemove')(member))
}
