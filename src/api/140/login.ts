import request from './request'

export function Login(payload: any) {
    return request({
        url: "/login",
        method: "post",
        data: payload,
    });
}

export function changeRolePasswd(payload: any) {
    return request({
        url: "/updateuser",
        method: "put",
        data: payload,
    });
}