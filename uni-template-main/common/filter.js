import Vue from 'vue';
// 自动添加省略号
Vue.filter('autoAddPoints', function(address) {
	if (address && address.length > 15) {
		return '...'.padStart(16, address);
	} else {
		return address;
	}
});

const dateTime = require('./dateTime.js');
// 默认无数据
function noData(value,text ='暂无数据') {
	let data = value  ? value : text
	return data
}

// 强制保留两位小数
function money(value){
	 if (!value) return '0.00';
	var value = value.toFixed(2);//提前保留两位小数
	var intPart = Number(value).toFixed(0); // 获取整数部分
	var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 将整数部分逢三一断 ？？？
	var floatPart = '.00'; // 预定义小数部分
	value = value.toString();//将number类型转为字符串类型，方便操作
	var value2Array = value.split('.');
	if (value2Array.length === 2) { // =2表示数据有小数位
		floatPart = value2Array[1].toString(); // 拿到小数部分
		if (floatPart.length === 1) { // 补0,实际上用不着
			return str+ intPartFormat + '.' + floatPart + '0';
		} else {
			return str+ intPartFormat + '.' + floatPart;
		}
	} else {
		return str+ intPartFormat + floatPart;
	}
}

/**
 * @desc 查找到数组中的对象元素并返回
 * @param arr被查看的数组
 *        value:被查找的值
 *        valueKey:被查找的key
 *        returnKey:返回值的key
 */
function findArr(value = '', arr = [], valueKey = 'id', returnKey = 'name') {
  // if (!value ) { return }
  const _obj = arr.find(item => item[valueKey] == value)
  if (!_obj) {
    return ''
  } else {
    return _obj[returnKey]
  }
}

//截取字符串，例‘一个人一生只有一种命运...’
function cutText(text, length = 6,_tip = '暂无数据') {
	if (text) {
		return text.length <= length ? text : `${text.slice(0,length)}...`;
	} else {
		return _tip;
	}
};

/**
 * @desc 判断当前数组或者数组对象中是否存在某个元素
 * @param {String,number} val
 * @param {Array} arr表示需要判断的数组
 * @param {number} type 
 *  1表示普通的数组，例：[1,2,3]
 *  2表示数组元素是对象。例：[{id:1,name:'爱尚丽明'},{id:2,name:'爱尚丽明'}],适用于判断数字
 *  3 同二，适用于字符串类型
 * @param {String} attr  当type == 2或3时，需要判断对象中对应的键
 * 
 */
export function isThereArray(val, arr = [], type = 1, attr = 'id') {
  if (!arr.length) { return false }
  let _resultFlag = false
  if (type === 1) {
    if (arr.indexOf(val) !== -1) {
      _resultFlag = true
    } else {
      _resultFlag = false
    }
  } else if (type === 2) {
    arr.some(function(item) {
      if (parseInt(item[attr]) === parseInt(val)) {
        _resultFlag = true
      }
    })
  }else if(type === 3){
	 arr.some(function(item) {
	   if (item[attr] == val) {
	     _resultFlag = true
	   }
	 }) 
  }
  return _resultFlag
}


// 根据身份证号码判断男女
let sexIdcardFilter = value => {
	if (!value) {
		return ''
	} else {
		let data = value.substr(16, 1) % 2 === 1 ? '男' : '女'
		return data
	}
}

// 身份证号脱敏('331082199708094687' 转换成 '33108219********87') 第8位开始替换8个
let IDcardHide = num => {
	if (!num) {
		return ''
	}else{
		let data = num.replace(/(\d{8})\d{8}(\d*)/, '$1********$2')
		return data
	}
	
}

// 手机号脱敏('13912345678' 转换成 '139****5678') 第3位开始替换4个
let telHide = num => {
	if (!num) {
		return ''
	}else{
		let data = num.replace(/(\d{3})\d{4}(\d*)/, '$1****$2')
		return data
	}
	
}

// 姓名脱敏(小明 转换成 *明   李小明 转换成 李*明   欧阳小明 转换成 欧**明)
let nameHide = name => {
	if(!name){
		return ''
	}else{
		if (name.length === 2) {
			return new Array(name.length).join('*') + name.substr(-1)
		} else {
			return (
				name.substr(0, 1) + new Array(name.length - 1).join('*') + name.substr(-1)
			)
		}
	}
	
}

// 银行卡脱敏
let bankCardHide = num => {
	if(!num){return}
	if(num){
		let reg = /^(\d{4})\d+(\d{4})$/;
		let _str = '*';
		let _len = num.length - 8;
		if(_len > 1 && _len <16){
			for(let i = 0; i< _len;i++){
				_str = _str + '*'
			}
			console.log(_str)
			let _num = num.replace(reg, `$1${_str}$2`);
			return _num;
		}else{
			let _num = num.replace(reg, `$1****$2`);
			return _num;
		}
	}
}

module.exports = {
	money,
	findArr,
	isThereArray,
	noData,
	cutText,
	dateFormat: dateTime.dateFormat,
	gmtToStr: dateTime.gmtToStr,
	remainingTime: dateTime.remainingTime,
	sexIdcardFilter,
	IDcardHide,
	telHide,
	nameHide,
	bankCardHide
}