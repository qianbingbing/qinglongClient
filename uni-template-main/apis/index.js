import http from '@/config/requestConfig'
import config from "@/config/index.config.js";

// 用户登录
export const postLogin = (data) => http.post(`${config.baseUrl}/api/login`, data);

//获取个人信息
export const getUserInfo = () => http.get(`${config.baseUrl}/api/user`);

//获取当前cookie
export const getCookieInfo = () => http.get(`${config.baseUrl}/api/envs?searchValue=JD_COOKIE`);

//更新cookie
export const updateCookieInfo = (data) => http.put(`${config.baseUrl}/api/envs`,data);

//获取所有任务
export const getTaskList = () => http.get(`${config.baseUrl}/api/crons?searchValue=`);

//获取任务运行日志
export const getTaskLog = (task_id) => http.get(`${config.baseUrl}/api/crons/${task_id}/log`);

//运行制定脚本
export const runTask = (data) => http.put(`${config.baseUrl}/api/crons/run`,data);

//获取群组二维码
export const getqrCode = (header) => http.get(`https://www.pushplus.plus/api/open/topic/qrCode?topicId=123456&forever=0`,header={'a':'1'});