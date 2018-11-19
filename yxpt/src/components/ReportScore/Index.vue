
<template>
    <div class="layout">
    <Card>
         <div  style="margin: 20px" class="defaultColor">报告评分</div>
            <div style="margin: 20px">
                <div class="selectName">医疗机构:&nbsp;</div>
                <Select v-model="hospital" class="selectStyle" @on-change = "changeHostipal">
                    <Option v-for="item in hospitalList" :value="item.name" :key="item.oid">{{ item.name}}</Option>
                </Select>
                <div class="selectName" style="margin-left: 30px">检查类型:&nbsp;</div>
                <Select v-model="checkType" class="selectStyle"  @on-change="changeCheckType">
                    <Option v-for="item in checkTypeList" :value="item.name" :key="item.id">{{ item.name}}</Option>
                </Select>
                <div class="selectName"  style="margin-left: 30px">医师姓名:&nbsp;</div>
                <Select v-model="doctorName" class="selectStyle" @on-change="changeDoctorName">
                    <Option v-for="item in doctorList" :value="item.name" :key="item.uId">{{ item.name}}</Option>
                </Select>
                <div class="selectName" style="margin-left: 30px">报告时间:&nbsp;</div>
                <DatePicker  @on-change="changeDateRange"  type="daterange" placement="bottom-end" placeholder="Select date" class="selectStyle" style="width: 200px"></DatePicker>
            </div>
            <div style="clear: both"></div>
    </Card>
    <Card>
       <table-cont :columns="scoreTitle" :columsData="scoreData"  :totalNum = "scoreTotle" :srcLink="scoreSrc"></table-cont>        
    </Card>
         
    </div>
</template>



<script>

import TableCont from '../Common/table.vue'
import {mapActions} from 'vuex'
    export default{
        data () {
            return {
                scoreTitle:[
                  {
                        title:'标识号',
                        key:'applyNo',
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
                        title: '申请日期',
                        key: 'applyTime',
                        width:145,
                         render: (h, params) => {
                       return h('div', [
                            h('span', this.dateTransfer.transferDate(params.row.applyTime)),
                        ]);
                    }
                 },
                 {
                        title: '检查类型',
                        key: 'modalityName'
                      
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
                    width:110

                 },
                 {
                        title: '诊断医师',
                        key: 'diagnosisDoctorName',
                        width:110
                 },
                 {
                       title: '诊断时间',
                       key: 'diagnosisTime',
                       width:145,
                       render: (h, params) => {
                       return h('div', [
                            h('span', this.dateTransfer.transferDate(params.row.diagnosisTime)),
                        ]);
                    }
                 },
                 {
                        title: '审核医师',
                        key: 'auditDoctorName'
                 },
                 {
                        title: '审核时间',
                        key: 'auditTime',
                        width:145,
                        render: (h, params) => {
                        return h('div', [
                                h('span', this.dateTransfer.transferDate(params.row.auditTime)),
                            ]);
                    }
                 },
                 {
                        title: '医院',
                        key: 'oName',
                        
                 },
                 {
                        title: '操作',
                        key: 'oName3',
                        render:(h,params)=>{
                          let oirgId= params.row.reportScoreBean.auditDoctorIrgId,scoreText,scoreType;
                           if (oirgId === 0){
                                scoreText = '去评分'
                                 scoreType = 'success'   
                           } else {
                                scoreText = '已评分'
                                 scoreType = 'primary'   
                           }
                            return h('div',[
                                h('Button',{
                                    props:{
                                        type:scoreType,
                                        size:"small"
                                    }
                                },scoreText)
                            ])
                        }
                 },
                ],
                scoreData:[],
                scoreTotle:0,
                scoreSrc:'score',
                doctorList: [],
                doctorName: '',
                checkType: '',
                hospitalList: [],
                hospital: '',
                filterData:{
                    startTime:'1528278564',
                    endTime:new Date().getTime()
                }
            }
        },

        methods:{
           ...mapActions({//触发异步操作
                getModalityCony:"getModality"
            }),
            //获取医疗机构
            getOrganization(){
               var self = this
               self.http({
                   url:'/ids-server/user/v1/report/grade/organization/list',
                   method:'get'
               }).then((res)=>{
                   self.hospitalList = res.data.data
               })
            },
            changeDateRange (name){
                new Date(name[0]).getTime()
                new Date(name[1]).getTime()
                this.filterData.startTime  =  new Date(name[0]).getTime() 
                this.filterData.endTime =  new Date(name[1]).getTime() 
                if (isNaN(this.filterData.startTime) || isNaN(this.filterData.endTime)) {
                   this.filterData.startTime = '1528278564' 
                   this.filterData.endTime =  new Date().getTime()
                } 
               this.getScoreData(1,this.filterData.orgId,
                                   this.filterData.modalityId,
                                   this.filterData.uId,
                                   this.filterData.startTime,
                                   this.filterData.endTime)
            },
            changeCheckType(name){
               var self = this
               this.checkTypeList.forEach(function(item,index){
                    if (item.name === name) {
                         self.filterData.modalityId =item.id 
                         self.getScoreData(1,self.filterData.orgId,
                                            item.id,
                                            self.filterData.uId,
                                            self.filterData.startTime,
                                            self.filterData.endTime)
                    }
               })  
            },
            changeHostipal(name){
                var self = this,orgId;
                this.hospitalList.forEach(function(item,index){
                    if (item.name === name) {
                        orgId= item.oid
                        self.filterData.orgId =orgId 
                        self.getScoreData(1,orgId,
                                            self.filterData.modalityId,
                                            self.filterData.uId,
                                            self.filterData.startTime,
                                            self.filterData.endTime)
                    }
                })
            },
            changeDoctorName(name){
                var self = this;
                this.doctorList.forEach(function(item,index){
                    if (item.name === name) {
                        self.filterData.uId =item.uId 
                        self.getScoreData(1,
                                self.filterData.orgId,
                                self.filterData.modalityId,
                                self.filterData.uId,
                                '1528278564',
                                new Date().getTime())
                    }
                })
            },
            getScoreData(num,orgId,modalityId,uId,startTime,endTime){
                var self = this
                const imageScore = {
                    url:'/ids-server/user/v1/report/grade/list',
                    method:'get'
                } 
                var params = {
                    pageNum:num,
                    pageSize:10,
                    orgId:orgId,
                    modalityId:modalityId,
                    doctor:uId,
                    startTime:startTime,
                    endTime:endTime
                   
                }
                self.http(imageScore,params).then((res)=>{
                    if (res.data.code === 1) {
                        var resData = res.data.data;
                        self.scoreData = resData.list;
                        self.scoreTotle  = resData.total; 
                    }    
                },(error)=>{
                        alert('错误')
               })
            }
        },
        mounted() { 
            var self = this  //接口报错 checkTypeList
            self.getModalityCony()
            self.getOrganization()
            self.getScoreData(1,'','','',1528278564,new Date().getTime())
            self.http({
                url:'/ums-server/user/v1/users/simple',
                method:'get'
            }).then((res)=>{
                self.doctorList = res.data.data
            })  
        },
        computed:{
            checkTypeList() {  
                return this.$store.state.getModality;  
            }         
        },
        components:{
            TableCont
        }

    }

</script>
<style lang="less">

    .selectName
    {
        float: left;
        line-height: 30px;

    }
    .selectStyle
    {
        float: left;
        width: 150px;
    }


</style>