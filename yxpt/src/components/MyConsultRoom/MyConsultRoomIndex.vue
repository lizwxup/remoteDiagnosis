<template>
    <div class="layout"> 
        <search-time :onSelect="selected"   v-on:imageDataSearchEvent = "showSearchHistory"  :typeSel="type" :shareCont="sharePatientCont"></search-time>     
         <Tabs :animated="false" class="default-body-bg" @on-click="tabClickRoom">
         <TabPane label="已操作">
            <Card>
                <table-cont :columns="imageTitle" :columsData="imageData"   
                :totalNum = "totalNum" 
                :srcLink="detailSrc"
                v-on:sharePatient="getPatientDetail"
                v-on:getPageIndex = "getPageHisCont"></table-cont>
            </Card>
        </TabPane>
         <TabPane label="待操作">
            <Card>
                <table-cont :columns="imageTitle" :columsData="imageDataNo"   
                :totalNum = "totalNumNo" 
                :srcLink="detailSrc"
                v-on:sharePatient="getPatientDetail"
                v-on:getPageIndex = "getPageHisCont"></table-cont>
            </Card>
        </TabPane>
        </Tabs>
    </div>
</template>
<script>
import TableCont from '../Common/table.vue'
import Format from '../../utils/dateFormat.js'
import SearchTime from '../Common/SearchTime.vue'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        data () {
            return {
                  detailSrc:'/detail/',
                  totalNum:1,
                  selected:false,
                  sharePatientCont:{},
                  type:31,
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
                            var sourceDesc,sourceType,display,patientType,patientSource = params.row.patientSource  ;
                            if (patientSource === 1) {
                                 sourceType = 'warning'
                            }else if (patientSource === 2) {
                                 sourceType = 'primary'
                            }else if (patientSource === 3) {
                                 sourceType = 'success'
                            }else if (patientSource === 4) {
                                 sourceType = 'warning'
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
                                        type:sourceType,
                                        size: 'small'
                                    }
                                }, this.common.$patientSources(patientSource,params.row.patientType)),
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
                            if (self.tabIndex === 1) {
                                self.getRoomDataNO(self.$store.state.pageIndex,self.$store.state.startTime,self.$store.state.endTime,'',value[0])    
                            } else {
                                self.getConsultRoomData(self.$store.state.pageIndex,self.$store.state.startTime,self.$store.state.endTime,'',value[0])        
                            }
                            
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
                       if (self.tabIndex === 1) {
                          self.getRoomDataNO(self.$store.state.pageIndex,self.$store.state.startTime,self.$store.state.endTime,value[0])
                       } else {
                          self.getConsultRoomData(self.$store.state.pageIndex,self.$store.state.startTime,self.$store.state.endTime,value[0])

                       }
                   }
                 },
                 {
                        title: '报告状态',
                        key: 'lifeStatus',
                        render: (h, params) => {
                            var self = this
                            //alert(self.type)
                            var sourceDesc,statusType;
                            if (self.type === 31) {
                                  if (params.row.lifeStatus === 3) {
                                        sourceDesc = '已完成'
                                        statusType = '#8f7ee6'
                                    }else if (params.row.lifeStatus === 1) {
                                        sourceDesc = '写报告'
                                        statusType = '#4d8fff'
                                    }else if (params.row.lifeStatus === 2 ) {
                                        sourceDesc = '审核中'
                                        statusType = 'rgb(0, 66, 180)'
                                    }else if (params.row.lifeStatus === 4) {
                                        sourceDesc = '已查看'
                                        statusType = '#8f7ee6'   
                                    }else if (params.row.lifeStatus === 5) {
                                        sourceDesc = '已打印'
                                        statusType = '#797979'  
                                    }else if (params.row.lifeStatus === 6) {
                                        sourceDesc = '已驳回'
                                        statusType = '#000'  
                                    }
                            } else {
                                 if (params.row.lifeStatus === 1) {
                                        sourceDesc = '待写报告'
                                        statusType = '#8f7ee6'
                                    }else if (params.row.lifeStatus === 2) {
                                        sourceDesc = '待审报告'
                                        statusType = '#4d8fff'
                                    }else if (params.row.lifeStatus === 3 ) {
                                        sourceDesc = '操作中'
                                        statusType = 'rgb(0, 66, 180)'
                                    }
                            }
                           
                            return h('div', [
                                h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                     style:{
                                         background:statusType,
                                         color:'#fff'
                                    }
                                }, sourceDesc),
                            ]);
                        },
                        filters: [],
                        filterMultiple: false,
                        filterRemote: (value, row) =>{ 
                         var self = this
                         if (self.tabIndex === 1 ) {
                            self.getRoomDataNO(self.$store.state.pageIndex,self.$store.state.startTime,self.$store.state.endTime,'','',value[0])
                         } else{
                            self.getConsultRoomData(self.$store.state.pageIndex,self.$store.state.startTime,self.$store.state.endTime,'','',value[0])
                         }
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
                 imageDataNo:[],
                 totalNumNo:1,
                 tabIndex:0,
                 imageDataStatus : [
                    {
                        label: '写报告',
                        value: 1
                    },
                    {
                        label: '审核中',
                        value: 2
                    },
                    {
                        label: '已完成',
                        value: 3
                    },
                    {   
                        label: '已查看',
                        value: 4
                    },
                    {   
                        label: '已打印',
                        value: 5
                    },
                    {   
                        label: '驳回',
                        value: 6
                    }
            ],
             imageDataStatusNo : [
                    {
                        label: '待写报告',
                        value: 1
                    },
                    {
                        label: '待审报告',
                        value: 2
                    },
                    {
                       label: '操作中',
                        value: 3
                    }
                   
            ]
            };
        },
        mounted(){
            var self = this,flag = false;
            self.getPartsUrl()
            self.getModalityUrl()
            this.common.$transferFilterLabel(this.imageTitle,this.$store.state.getModality,'5')
            this.common.$transferFilterLabel(this.imageTitle,this.$store.state.getParts,'6')  
             this.imageTitle[7].filters = self.imageDataStatus; 
        },
        updated: function () {
            // this.$nextTick(function () {
            //      this.common.$transferFilterLabel(this.imageTitle,this.$store.state.getModality,'5')
            //      this.common.$transferFilterLabel(this.imageTitle,this.$store.state.getParts,'6')
            // })
        },
        methods:{
            ...mapActions({//触发异步操作
                getPartsUrl:'getParts',
                getModalityUrl:"getModality"
            }),
            // getPartsUrl(val){
            //         return this.$store.dispatch('getParts')
            //  },
            getPageHisCont(dataPage){
               this.$store.state.pageIndex = dataPage
               
               this.getConsultRoomData(dataPage,this.$store.state.startTime,this.$store.state.endTime,'')
            },
             //搜索内容
            showSearchHistory (contData) {
                var _this = this;
                if (_this.type === 31) {
                     _this.imageData = contData.list  
                     _this.totalNum = contData.list 
                     _this.getConsultRoomData (1,_this.$store.state.startTime,_this.$store.state.endTime,'')
                } else {
                    _this.imageDataNO = contData.list 
                    _this.totalNumNo = contData.list  
                    _this.getRoomDataNO(1,_this.$store.state.startTime,_this.$store.state.endTime,'');  
                }
               
            },
            getPatientDetail(contMsg){
                this.sharePatientCont = contMsg
            },
            //获取数据影像大厅的数据列表
            getConsultRoomData (num,startTime,endTime,part,modality,status,content) {
                var self = this;
                const imageUrlPart = {
                    url:'/ids-server/user/v1/myClinic/history',
                    method:'get'
                }
                var params = {
                    'pageNum':num,
                    'pageSize':10,
                    'startData':startTime,
                    'endData':endTime,
                    'partId':part,
                    'modalityId':modality,
                    'reportStatus':status,
                }
               self.http(imageUrlPart,params).then((res)=>{
                    var resData = res.data.data;
                    self.imageData = resData.list;
                    self.totalNum  = resData.total; 
                },(error)=>{
                    alert('错误')
                })
              //return  self.imageData
            },
            //切换选项卡
            tabClickRoom(name){
                this.tabIndex = name
                
               if (name === 1) {
                 this.type = this.type+name
                 this.getRoomDataNO(this.$store.state.startTime,this.$store.state.endTime,'','','',''); 
                 this.imageTitle[7].filters = this.imageDataStatusNo; 
               } else {
                 this.type = 31
                 this.imageTitle[7].filters = this.imageDataStatus;
               }  
            },
            getRoomDataNO(num,startTime,endTime,part,modality,status,content){
             var self = this;
                const imageUrlPart = {
                    url:'/ids-server/user/v1/myClinic/operating',
                    method:'get'
                }
                var params = {
                    'pageNum':self.$store.state.pageIndex,
                    'pageSize':10,
                    'startData':startTime,
                    'endData':startTime,
                    'partId':part,
                    'modalityId':modality,
                    'reportStatus':status,
                }
               self.http(imageUrlPart,params).then((res)=>{
                    var resData = res.data.data;
                    self.imageDataNo = resData.list;
                    self.totalNumNo  = resData.total; 
                },(error)=>{
                    alert('错误')
                })
              //return  self.imageData
            },
        },
        watch:{
            imageCloudData: function(a, b) {  
                console.log("监听数据a&&b：" + a);  
            }  
        },
        computed:{
            imageCloudData() {  
                return this.$store.state.imageCloudData;  
            }         
        },
        created(){
            var self = this,flag = false;
            self.getConsultRoomData(1,self.$store.state.startTime,self.$store.state.endTime,''); 
        },
        components:{
            TableCont,
            SearchTime
        }
    }

</script>
<style lang="less">
    
</style>