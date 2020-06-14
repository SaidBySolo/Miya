const discord = require('discord.js');
const cheerio = require('cheerio');
const request = require('request');
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

module.exports.run = async (miya, message) => {
	message.channel.send(`<@${message.author.id}> 불러오는 중 이에요!`).then((th) => {
		let url = 'http://ncov.mohw.go.kr/';
		let url2 = 'https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EC%9A%B0%ED%95%9C+%ED%8F%90%EB%A0%B4+%ED%99%95%EC%A7%84%EC%9E%90';
		request(url, function(error, response, body) {
			request(url2, function(error, response, body2) {
		
				const $ = cheerio.load(body);
				const $2 = cheerio.load(body2)
				let free = $2(".num")
				
				let colArr = $(".num")
				let beforeArr = $(".before")
			
				let corona = colArr[0].children[0].next.data
				let before = beforeArr[0].children[0].data
				before = before.replace(/[^0-9]/g, '');
				
				let corona2 = colArr[1].children[0].data
				let before2 = beforeArr[1].children[0].data
				before2 = before2.replace(/[^0-9]/g, '');
				
				let corona3 = colArr[2].children[0].data
				let before3 = beforeArr[2].children[0].data
				before3 = before3.replace(/[^0-9]/g, '');
				
				let corona4 = colArr[3].children[0].data
				let before4 = beforeArr[3].children[0].data
				before4 = before4.replace(/[^0-9]/g, '');
							
				let corona5 = colArr[4].children[0].data
				corona5 = corona5.replace(" ", "");
				
				let embed = new (discord.MessageEmbed)(body)
					embed.setColor("#5fe9ff")
					embed.setThumbnail("https://ifh.cc/g/ysQWd.png")
					embed.setTitle("국내 코로나19 현황")
					embed.setDescription(`${moment().format('YYYY-MM-DD')} 기준`)
					embed.addField("확진자", `${corona}명 (+ ${before})`, true)
					embed.addField("완치(격리 해제)", `${corona2}명 (+ ${before2})`, true)
					embed.addField("치료 중", `${corona3}명 (+ ${before3})`, true)
					embed.addField("사망", `${corona4}명 (+ ${before4})`, true)
					embed.addField("누적 검사 수", `${corona5}명`, true)
					embed.addField("정보 출처", "네이버, 질병관리본부", true)
					embed.setFooter("코로나19 감염이 의심되면 즉시 보건소 및 콜센터(전화1339)로 신고바랍니다.")
				th.edit(`<@${message.author.id}> 현재 코로나19 현황이에요!`, { embed: embed })
			})
		})
    })
}

exports.callSign = ['covid19', 'corona', '코로나', '우한폐렴']
exports.helps = {
    description: '현재 국내 COVID-19 현황을 보여줍니다.',
    uses: '코로나'
}