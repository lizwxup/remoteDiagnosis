<template>
    <div class="layout"> 
    <div>内容信息 <input  v-demo="message"  type="text" ></div>
    <div id="hook-arguments-example" v-demo1:foo.vf.vfvf="message"></div>
        <search-time :onSelect="selected"   v-on:imageDataSearchEvent = "showSearchCont" :typeSel="1" :shareCont="sharePatientCont"></search-time>     
        <Card>  
            <table-cont :columns="imageTitle" :columsData="imageData"   
            :totalNum = "totalNum" 
            :srcLink="detailSrc"
            v-on:sharePatient="getPatientDetail"
            v-on:getPageIndex ="getPageCont"></table-cont>
        </Card>
    </div>
</template>
<script>
import Vue from 'vue'
import TableCont from '../Common/table.vue'
import Format from '../../utils/dateFormat.js'
import SearchTime from '../Common/SearchTime.vue'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
Vue.directive('demo',{
    bind:function(el,binding,vnode){
        console.log('000000000')
    },
    inserted(el){
         el.focus()
    },
})
    export default { 
        data () {
            var timeOut;
            return {
                  message:'demo',
                  detailSrc:'/detail/',
                  totalNum:1,
                  selected:false,
                  sharePatientCont:{},
                  imageTitle: [
                  {
                        title: '标识号',
                        key: 'applyNo',
                        width:180
                  },
                  {
                        title: '姓名',
                        key: 'patientName',
                        width:180
                  },
                 {
                        title: '性别',
                        key: 'gender',
                        render:(h,params)=>{
                          return h('div', [
                             h('span', {
                                }, this.common.$gender(params.row.gender)),
                            ]);
                        }   
                 },
                 {
                        title: '年龄',
                        key: 'age',
                        render:(h,params)=>{
                          var unit= this.common.$age(params.row.ageUnit)
                           return h('div', [
                             h('span', params.row.age+unit),
                            ]);
                        }     
                 },
                 {
                        title: '患者来源',
                        key: 'patientSource',
                        render: (h, params) => {
                            var sourceDesc,display,sourceType,patientType = params.row.patientType,patientSource = params.row.patientSource  ;
                            if (patientSource === 1) {
                                 sourceType = 'warning'
                            }else if (patientSource === 2) {
                                 sourceType = 'primary'
                            }else if (patientSource === 3) {
                                 sourceType = 'success'
                            }else if (patientSource === 4) {
                                 sourceType = 'success'
                            }
                            if (patientType === 2) {
                                patientType = '急诊'
                                display = 'inline-block'
                            } else {
                                patientType = ''
                                display = 'none'
                            }
                             return h('div', [
                                h('Button', {
                                    props: {
                                        type: sourceType,
                                        size: 'small'
                                    },  
                                }, this.common.$patientSources(patientSource,patientType)),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },  
                                    style: {
                                        display: display,
                                        marginLeft:'3px'
                                    },
                                }, patientType)
                            ]);
                        }
                    },
                    {
                        title: '检查类型',
                        key: 'modalityName',
                        filters: [],
                        filterMultiple: false,
                        filterRemote:(value,row)=>{  
                            var self = this
                            self.getImageCloudData(self.$store.state.pageIndex,self.$store.state.startTime,self.$store.state.endTime,'',value[0],'','','')
                        }
                 },
                 {
                    title: '检查部位',
                    key: 'parts',
                    render: (h, params) => {
                        var itemData = []
                        params.row.parts.map(function(item){
                            itemData.push(item.partName) 
                        })
                        return h('div', [
                            h('span', itemData.join('/')),
                        ]);
                    }, 
                    filters:[],
                    filterMultiple:false,
                    filterRemote: (value, row) =>{ 
                       var self = this
                        self.getImageCloudData(self.$store.state.pageIndex, self.$store.state.startTime,self.$store.state.endTime,value[0],'','','','')
                    }
                 },
                 {
                        title: '报告状态',
                        key: 'lifeStatus',
                        render: (h, params) => {
                            var sourceDesc,statusImgType ;
                            if (params.row.lifeStatus === 1) {
                                 sourceDesc = '待诊断'
                                 statusImgType = '#e24125'   
                            } else if (params.row.lifeStatus === 2 ) {
                                 sourceDesc = '操作中'
                                 statusImgType = '#4d8fff'   
                            }else if (params.row.lifeStatus === 3) {
                                  sourceDesc = '待审核'
                                  statusImgType = '#ffaa1c'
                            }else if (params.row.lifeStatus === 4) {
                                 sourceDesc = '审核中'
                                 statusImgType = '#4d8fff'
                            }else if (params.row.lifeStatus === 5) {
                                 sourceDesc = '已审核'
                                  statusImgType = '#8f7ee6'
                            }else if (params.row.lifeStatus === 6) {
                                 sourceDesc = '二级待审核'
                                  statusImgType ='green'  
                            }else if (params.row.lifeStatus === 7) {
                                 sourceDesc = '二级审核中'
                                 statusImgType = '#4d8fff'   
                            }else if (params.row.lifeStatus === 8) {
                                 sourceDesc = '二级已审核'
                                 statusImgType = '#8f7ee6'  
                            }else if (params.row.lifeStatus === 9) {
                                 sourceDesc = '已打印'
                                 statusImgType = '#797979'   
                            }else if (params.row.lifeStatus === 10) {
                                 sourceDesc = '已驳回'
                                 statusImgType = '#000'  
                            }
                             return h('div', [
                                h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    style:{
                                        background:statusImgType,
                                        borderColor:statusImgType,
                                        color:'#fff'
                                    }
                                }, sourceDesc),
                            ]);
                        },
                        filters: [
                            {
                                label: '待诊断',
                                value: 1
                            },
                            {
                                label: '操作中',
                                value: 2
                            },
                            {
                                 label: '待审核',
                                value: 3
                            },
                            {   
                                 label: '审核中',
                                value: 4
                            },
                            {   
                                 label: '已审核',
                                 value: 5
                            },
                            {   
                                 label: '二级待审核',
                                 value: 6
                            },
                            {   
                                 label: '二级审核中',
                                 value: 7
                            },
                            {   
                                 label: '二级已审核',
                                 value: 8
                            },
                            {   
                                 label: '已打印',
                                 value: 9
                            },
                            {   
                                 label: '已驳回',
                                 value: 10
                            }
                        ],
                       filterMultiple: false,
                       filterRemote: (value, row) =>{ 
                            var self = this
                            self.getImageCloudData(self.$store.state.pageIndex, self.$store.state.startTime,self.$store.state.endTime,'','',value[0],'')
                        }
                    
                 },
                 {
                       title: '检查日期',
                       key: 'examTime',
                       width:180,
                       render: (h, params) => {
                       return h('div', [
                            h('span', this.dateTransfer.transferDate(params.row.examTime)),
                        ]);
                    }
                 },
                 {
                        title: '申请日期',
                        key: 'applyTime',
                        width:180,
                        render: (h, params) => {
                        return h('div',[
                            h('span',this.dateTransfer.transferDate(params.row.applyTime)),
                        ]);
                    }
                 },
                 {
                        title: '医院',
                        key: 'oName'
                 }
                ],
                 imageData:[],
                 getParts:[],
                 getMsg:{}
                 
            };
        },
        directives:{
            demo1:{
                 bind(el,binding,vnode){
                     console.log(binding)
                     console.log(vnode)
                    el.innerHTML = 'name:' + JSON.stringify(binding.name) + '<br>'+
                    'vnode name:' +  Object.keys(vnode)
                }
            }   
        },
        mounted(){
            var self = this,flag = false;
            self.getPartsUrl()
            self.getModalityUrl()
            self.getMsgtip()
            
        },
        updated: function () {
            var self = this
            this.$nextTick(function () {
                this.common.$transferFilterLabel(this.imageTitle,self.getModalityCoputed,'5')
                this.common.$transferFilterLabel(this.imageTitle,self.getPartsCoputed,'6')  
            }) 
        },
        methods:{
            ...mapActions({//触发异步操作
                getPartsUrl:'getParts',
                getModalityUrl:"getModality"
            }),
            // getPartsUrl(val){
            //    return this.$store.dispatch('getParts')
            // },
             //搜索内容
            showSearchCont (contImageData) {
                var _this = this;
                _this.imageData = contImageData.list  
                _this.totalNum =  contImageData.total         
            },
            getPatientDetail(contMsg){
                this.sharePatientCont = contMsg
            },
            getMsgtip () {
                var _this = this
                const msgTip = {
                   url:'/ids-server/user/v1/msg',
                   method:'get'
                }
                _this.http(msgTip).then((res)=>{
                    var  resData = res.data.data;
                     _this.getMsg = res.data.data;
                     if (res.data.code != 1) {
                        return false;
                     }
                    this.$Notice.destroy();
                    this.$Notice.info({
                        title: '温馨提醒',
                        desc: '您当前还有'+ _this.getMsg.waitWrite+'份报告需要书写',
                        onClose:function(){
                            //alert('neirong')
                          self.timeOut = setInterval(function(){
                              _this.getMsgtip()
                             // _this.getImageCloudData (_this.$store.state.pageIndex,_this.$store.state.startTime,_this.$store.state.endTime,'','','','')
                          },1000*60*2)
                        }
                    });
                },(error)=>{
                    alert('错误')
                })
                
            },
            getPageCont(dataPage){
               this.getImageCloudData(dataPage,this.$store.state.startTime,this.$store.state.endTime,'','','')
            },
            //获取数据影像大厅的数据列表
            getImageCloudData (num,startTime,endTime,part,modality,status,content){
                var self = this;
                const imageUrlPart = {
                    url:'/ids-server/user/v1/report/square',
                    method:'get'
                }
                var params = {
                    pageNum:num,
                    pageSize:10,
                    startTime:startTime,
                    endTime:endTime,
                    part:part,
                    modality:modality,
                    status:status,
                }
               self.http(imageUrlPart,params).then((res)=>{
                   if (res.data.code === 1) {
                        var resData = res.data.data;
                        self.imageData = resData.list;
                        self.totalNum  = resData.total; 
                   }
                },(error)=>{
                    alert('错误')
                })
            }
        },
       
        watch:{
            imageData: function(a, b) {  
               // console.log("监听数据a&&b：" + a);  
            }
        },
        computed:{
            getModalityCoputed() {  
                return this.$store.state.getModality;  
            },        
            getPartsCoputed(){
                return this.$store.state.getParts;  
            } 
        },
        created(){
            var self = this,flag = false;
            this.getImageCloudData(1,self.$store.state.startTime,self.$store.state.endTime,'','','','')      
            self.$Notice.config({
                top: 800,
                duration: 0
            });
        },
        destroyed(){
            clearInterval(this.timeOut)
            this.$Notice.destroy();
        },
        components:{
            TableCont,
            SearchTime
        }
    }
</script>
<style lang="less">
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>