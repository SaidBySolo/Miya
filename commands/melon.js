const discord = require('discord.js');

module.exports.run = async (miya, message) => {
	message.channel.startTyping();
	message.channel.send(`<@${message.author.id}> 불러오는 중 이에요!`).then((th) => {
	    var cheerio = require('cheerio');
	    var request = require('request');
	    
	    var url = 'http://www.melon.com/chart/';
	    var title = new Array(),
		artist = new Array(),
		up_date,
		up_time;
	    var rank = 10;  //10위까지 확인
	    
	    
	    request(url, function(error, response, html){
	    if (!error) {
			var $ = cheerio.load(html);
			
			// 곡명 파싱
			for (var i = 0; i < rank; i++) {
			$('.ellipsis.rank01 > span > a').each(function(){
				var title_info = $(this);
				var title_info_text = title_info.text();
				title[i] = title_info_text;
				i++;
			})
			}
			
			// 아티스트명 파싱
			for (var i = 0; i < rank; i++) {
			$('.checkEllipsis').each(function(){
				var artist_info = $(this);
				var artist_info_text = artist_info.text();
				artist[i] = artist_info_text;
				i++;
			})
			}
			
			// 업데이트 날짜
			$('.year').each(function(){
			var date_info = $(this);
			var date_info_text = date_info.text();
			up_date = date_info_text;
			})
			
			// 업데이트 시간
			$('.hhmm > span').each(function(){
			var time_info = $(this);
			var time_info_text = time_info.text();
			up_time = time_info_text;
			})
			
			//xxxx년 xx월 xx일 오후/오전 xx시 format
			var up_date_arr = new Array();
			var up_date_arr = up_date.split('.');
			var up_time_arr = new Array();
			var up_time_arr = up_time.split(':');
			var newtime;
			
			// 오후 오전 삽입
			if (up_time_arr[0] >12) {
			up_time_arr[0] = up_time_arr[0] - 12
			newtime = "오후 "+up_time_arr[0];
			} else {
			newtime = "오전 " +up_time_arr[0];
			}

			let embed = new (discord.MessageEmbed)
				embed.setColor("#5fe9ff")
				embed.setTitle(`멜론 차트 1 ~ ${rank}위`)
				embed.setDescription(1+ "위" + " " + title[1-1] + " - " + artist[1-1] + "\n" + 2+ "위" + " " + title[2-1] + " - " + artist[2-1] + "\n" + 3+ "위" + " " + title[3-1] + " - " + artist[3-1] + "\n" + 4+ "위" + " " + title[4-1] + " - " + artist[4-1] + "\n" + 5+ "위" + " " + title[5-1] + " - " + artist[5-1] + "\n" + 6+ "위" + " " + title[6-1] + " - " + artist[6-1] + "\n" + 7+ "위" + " " + title[7-1] + " - " + artist[7-1] + "\n" + 8+ "위" + " " + title[8-1] + " - " + artist[8-1] + "\n" + 9+ "위" + " " + title[9-1] + " - " + artist[9-1] + "\n" + 10+ "위" + " " + title[10-1] + " - " + artist[10-1] + "\n")
				embed.setFooter(up_date_arr[0]+"년 "+up_date_arr[1]+"월 "+up_date_arr[2]+"일 "+newtime+"시에 업데이트됨")
			th.edit(`<@${message.author.id}> 현재 멜론차트 순위 이에요!`, { embed: embed})
			}   
			message.channel.stopTyping();                 
	    });
	});
}

exports.callSign = ['멜론', '멜론차트']
exports.helps = {
    description: '현재 멜론 순위 TOP10을 보여줍니다.',
    uses: '멜론'
}