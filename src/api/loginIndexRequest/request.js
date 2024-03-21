import request from "@/util/axiosConfig.js";

export const customerLoginReq = (username, password) => {
  return request.post('/admin/user/login',{
      username,
      password
  })
}
