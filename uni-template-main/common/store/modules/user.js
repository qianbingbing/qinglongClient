// 用户数据模块
import {router} from '@/common/router.js'
const TOKEN = uni.getStorageSync("token") || "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiOFJNS2tIclVjeElLUmRLLXZZeHkteGMtaHA2X0tnbzkwOFBIR3YyelgtbDh2N2c4U2FtcyIsImlhdCI6MTYzNzg0Nzc2MywiZXhwIjoxNjM4MTA2OTYzfQ.vNAUuWcwENZZCXqk_l4Ssno7edN69XXS7TwqoUt099Ee9k09tKAOEJ7Sgg3PH-KG"
const OPENID = uni.getStorageSync("openId") || "";
const USER_INFO = uni.getStorageSync("userInfo") || {};

export const state = {
	// 前端token
	token: TOKEN,
	// 用户openid
	openId: OPENID,
	// 用户信息 头像 昵称
	userInfo: USER_INFO
}

export const actions = {
	// 登录过期 重新登录
	reLogin({
		commit
	}, info) {
		commit("SET_TOKEN", "");
		router.push({
			path: 'pages/login/login'
		});
	}
}

export const mutations = {
	SET_TOKEN(state, token) {
		state.token = token;
		uni.setStorageSync("token", token);
	},
	SET_OPENID(state, openId) {
		state.openId = openId;
		uni.setStorageSync("openId", openId);
	},
	SET_USERINFO(state, userInfo) {
		state.userInfo = userInfo;
		uni.setStorageSync("userInfo", userInfo);
	},
	SET_LOGOUT(state) {// 退出登录
		state.token = "";
		uni.setStorageSync("token", "");
	}

}

export const getters = {
	// 用户是否登录
	hasLogin: state => {
		if (state.token) {
			return true;
		} else {
			return false
		}
	}
}

