import axios from "axios";
import { ElMessage } from "element-plus";
import router from "../../routes/index";
import cookie from "js-cookie";
// 创建axios实例
const request = axios.create({
  baseURL: "http://localhost:3004/",
  // baseURL: "/api", // timeout: 80000, // 请求超时时间(毫秒) // withCredentials: true,// 异步请求携带cookie // headers: { // 设置后端需要的传参类型 // 'Content-Type': 'application/json', // 'token': x-auth-token',//一开始就要token // 'X-Requested-With': 'XMLHttpRequest', // },
});
// request拦截器
request.interceptors.request.use(
  (config) => {
    const token = cookie.get("token") || ""; // 添加请求头
    config.headers["token"] = token;
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// response 拦截器
request.interceptors.response.use(
  (response) => {
    // token失效，重新登录
    if (response.data.code === 401) {
      //  重新登录
      ElMessage.error("token失效");
      localStorage.clear();
      location.href = "/";
      router.push("/login");
    } // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export default request;
