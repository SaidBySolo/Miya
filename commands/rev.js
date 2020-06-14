const error = require('../utils/embed.js')

module.exports.run = async (miya, message, query) => {
	let str = query.message.slice(query.command.length + 1)
	if(str === "") {
		return error.wrongcmd(message, "`미야야 반전 [텍스트]`")
	} else {
		let strRev = str.split("").reverse().join("")
		error.sendEmbed(message, `<:cs_reboot:659355468791283723> ${strRev}`)
	}
};

exports.callSign = ['반전', 'rev']
exports.helps = {
    description: '메세지를 반전시킵니다.',
    uses: '반전'
}