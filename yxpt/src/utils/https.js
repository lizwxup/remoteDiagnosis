import Vue  from 'vue'
import axios from 'axios' 
import qs from 'qs' 
import store from '../vuex/store'  
import router from '../router/index'
axios.interceptors.request.use(config => {  
  store.commit('UPDATE_LOADING',true) //显示loading  
  return config  
}, error => {  
  return Promise.reject(error)  
})    
axios.interceptors.response.use(response => { 
  if (response.data.code === 30001){
     alert(response.data.msg)
     router.push('/')
  } 
  return response  
}, error => {  
  return Promise.resolve(error.response)  
})
function errorState(response) {  
 store.commit('UPDATE_LOADING',false)  //隐藏loading  
  console.log(response)  
  // 如果http状态码正常，则直接返回数据  
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {  
      return response  
  } else{  
    console.log(response)
    //Vue.prototype.$Message.warning(response.data.msg)  
  }      
}  
function successState(res) {  
  store.commit('UPDATE_LOADING',false) //隐藏loading  
}  
const httpServer = (opts, data) => { 
    let Public = { //公共参数   
    }  
   //axios.defaults.baseURL = 'http://49.4.9.162:8080';
    let httpDefaultOpts = { //http默认配置  
         method:opts.method,  
       // baseURL,  
          url: "http://49.4.9.162:8080"+opts.url,  
          timeout: 10000, 
          params:Object.assign(Public, data),    //合并多个对象 
          data:qs.stringify(opts.data),  
          headers:{
              systemId:'2',
              platform:'2',
              uuid:window.sessionStorage.getItem('uuid'),
              token:window.sessionStorage.getItem('token')
          }
    }  
    if(opts.method=='get' || opts.method=='put' || opts.method=='delete'){  
      delete httpDefaultOpts.data  
    }else{  
      delete httpDefaultOpts.params  
    }  
       
    let promise = new Promise(function(resolve, reject) {  
      axios(httpDefaultOpts).then(  
        (res) => {  
         // console.log(httpDefaultOpts)
          successState(res)  
          resolve(res)  
        }  
      ).catch(  
        (response) => {  
          errorState(response)  
          reject(response)  
        }  
      )  
   
    })  
  return promise  
}  
   
export default httpServer