export default {
	/* 
	 * obj 转 params字符串参数  
	 * 例子：{a:1,b:2} => a=1&b=2
	 */
	objParseParam(obj) {
		let paramsStr = "";
		if (obj instanceof Array) return paramsStr;
		if (!(obj instanceof Object)) return paramsStr;
		for (let key in obj) {
			paramsStr += `${key}=${obj[key]}&`;
		}
		return paramsStr.substring(0, paramsStr.length - 1);
	},

	/* 
	 * obj 转 路由地址带参数
	 * 例子：{a:1,b:2} => /pages/index/index?a=1&b=2
	 */
	objParseUrlAndParam(path, obj) {
		let url = path || "/";
		let paramsStr = "";
		if (obj instanceof Array) return url;
		if (!(obj instanceof Object)) return url;
		paramsStr = this.objParseParam(obj);
		paramsStr && (url += "?");
		url += paramsStr;
		return url;
	},

	/* 
	 * 获取url字符串参数
	 */
	getRequestParameters(locationhref) {
		let href = locationhref || "";
		let theRequest = new Object();
		let str = href.split("?")[1];
		if (str != undefined) {
			let strs = str.split("&");
			for (let i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
			}
		}
		return theRequest;
	},

	/* 
	 * 银行卡每四位空格
	 */
	formatCardNo(cardNo) {
		cardNo += "";
		return cardNo.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
	},

	/**
	 * 乘法，解决js精度损失问题
	 * @param {*} arg1 
	 * @param {*} arg2 
	 */
	accMul(arg1, arg2) {
		arg1 = arg1 || 0;
		var m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length
		} catch (e) {}
		try {
			m += s2.split(".")[1].length
		} catch (e) {}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
	},
	set_time(str){
	  var n = parseInt(str)*1000;
	  var D = new Date(n);
	  var year = D.getFullYear();//四位数年份
	
	  var month = D.getMonth()+1;//月份(0-11),0为一月份
	  month = month<10?('0'+month):month;
	
	  var day = D.getDate();//月的某一天(1-31)
	  day = day<10?('0'+day):day;
	
	  var hours = D.getHours();//小时(0-23)
	  hours = hours<10?('0'+hours):hours;
	
	  var minutes = D.getMinutes();//分钟(0-59)
	  minutes = minutes<10?('0'+minutes):minutes;
	
	  // var seconds = D.getSeconds();//秒(0-59)
	  // seconds = seconds<10?('0'+seconds):seconds;
	  // var week = D.getDay();//周几(0-6),0为周日
	  // var weekArr = ['周日','周一','周二','周三','周四','周五','周六'];
	
	  var now_time = year+'-'+month+'-'+day+' '+hours+':'+minutes;
	  return now_time;
	}
}
