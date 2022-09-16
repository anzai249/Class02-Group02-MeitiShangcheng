// 数据请求接口列表
import axios from "./http"
const serve = {
    getUser(){
        return axios('/getUser',{
            method:'get',
            params:{
                id:123
            }
        })
    },
    postLogin(data){
        return axios('/postLogin',{
            method:'post',
            data: {}
        })
    }
}
export default serve