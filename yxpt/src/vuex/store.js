import Vue from 'vue'
import Vuex from 'vuex'
import http from "../utils/https.js"; 
import router from '../router/index' 
Vue.use(Vuex)
//Vue.use(Router)

const store  = new Vuex.Store({
    //定义的状态  性别
      state: {
            sexList: [{value: 1,label: '男'},
                      {value: 2,label: '女'},
                      {value: 3,label: '未知'}],
            marriageList: [{value: 1,label: '未婚'},
                           {value: 2,label: '已婚'},
                           {value: 3,label: '离异'}], 
            yesOrNo:[{value:2,label:'是'},{value:1,label:'否'}],
            getParts:[],  //类似于获取数据内容
            getModality:[],
            currentSelectIndex:0,
            imageCloudData:[],
            startTime:new Date().getTime()-3600 * 1000 * 24,
            endTime:new Date().getTime(),
            UPDATE_LOADING:true,
            pageIndex:1,
            selectAudio:'yest',
            auth:[]
     },
     mutations:{
        UPDATE_LOADING(state,playload){
           state.UPDATE_LOADING = playload
        },
        GET_PARTS(state,playload){//改变state
            state.getParts=playload.res || eval('('+window.sessionStorage.getItem('parts')+')')
        },
        GET_MODALITY(state,playload) {  
            state.getModality=playload.res || eval('('+window.sessionStorage.getItem('modality')+')')
        },
        SELECT_INDEX(state,playload) {
            state.currentSelectIndex = playload.ID
        },
        SELECT_PAGE(state,playload){
            state.pageIndex = playload.pageIdx
        },
        GET_AUTH(state,playload){
            state.auth = playload.res.menuRole
        }
     },
     actions:{  
         //检查部位
         getParts({commit}){
            var  getLogin={
                url:'/eds-server/v1/dict/exam/part', 
                method:'get'
            }
           http(getLogin).then((response)=>{
                 window.sessionStorage.setItem('parts',JSON.stringify(response.data.data))
                commit('GET_PARTS',{res:response.data.data})
           },(error)=>{
                console.log(error)
           })
         },
         //获取类型
         getModality({commit}){  //类似于 content.commit
            const modalityUrl  = {
                url:'/eds-server/v1/dict/exam/modality',
                method:'get'
            }
            http(modalityUrl).then((response)=>{ 
               window.sessionStorage.setItem('modality',JSON.stringify(response.data.data))
               commit('GET_MODALITY',{res:response.data.data})
            },(error)=>{
                
          })
         }
     }
})

export default store