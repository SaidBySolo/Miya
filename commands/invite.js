const discord = require('discord.js');

module.exports.run = async (miya, message) => {
    let embed = new (discord.MessageEmbed)
        embed.setColor("#5fe9ff")
        embed.setTitle("미야 초대링크")
        embed.setDescription("[여기](https://discord.com/oauth2/authorize?client_id=720724942873821316&permissions=8&scope=bot)를 클릭하면 초대하실 수 있어요!")
    message.channel.send(embed);
};

exports.callSign = ['초대링크', 'invitelink']
exports.helps = {
    description: '미야 초대링크를 보여줍니다.',
    uses: '초대링크'
}