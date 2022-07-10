let formatNumber = function (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

let regYear = new RegExp("(y+)", "i");
// 自定义的时间过滤器
let dateFormat = function (timestamp, format = 'yyyy-MM-dd hh:mm:ss') {
	if(!timestamp || timestamp == '0'){return ''}
  if (!format) {
    format = "yyyy-MM-dd hh:mm:ss";
  }
  timestamp = parseInt(timestamp) * 1000;
  var realDate = new Date(timestamp);
  function timeFormat(num) {
    return num < 10 ? '0' + num : num;
  }
  let date = [
    ["M+", timeFormat(realDate.getMonth() + 1)],
    ["d+", timeFormat(realDate.getDate())],
    ["h+", timeFormat(realDate.getHours())],
    ["m+", timeFormat(realDate.getMinutes())],
    ["s+", timeFormat(realDate.getSeconds())],
    ["q+", Math.floor((realDate.getMonth() + 3) / 3)],
    ["S+", realDate.getMilliseconds()],
  ];
  let reg1 = regYear.exec(format);
  // console.log(reg1[0]);
  if (reg1) {

    format = format.replace(reg1[1], (realDate.getFullYear() + '').substring(4 - reg1[1].length));
  }
  for (let i = 0; i < date.length; i++) {
    let k = date[i][0];
    let v = date[i][1];

    let reg2 = new RegExp("(" + k + ")").exec(format);
    if (reg2) {
      format = format.replace(reg2[1], reg2[1].length == 1
        ? v : ("00" + v).substring(("" + v).length));
    }
  }
  return format;
}
//GMT转为普通时间格式
let gmtToStr = function(time){
		let dt = new Date(time)
        let Str = dt.getFullYear() + '-' +
            (dt.getMonth() + 1) + '-' +
            dt.getDate() + ' ' +
            dt.getHours() + ':' +
            dt.getMinutes() + ':' +
            dt.getSeconds()
        return Str
}
module.exports = {
  dateFormat: dateFormat,
  gmtToStr:gmtToStr,
};