<template>
    <div style="padding:10px;">
        <Tabs :animated="false">
            <TabPane label="申请单">
              <application></application>
            </TabPane>
            <TabPane label="报告单">
    
            
                    <Layout>
                        <Content>
                            <Card class="Card">
                                <h4>患者信息</h4>
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td class="tab_title">姓　　名：</td>
                                        <td class="tab_inp">
                                            <Input v-model="name" readonly class="Input">
                                            </Input>
                                        </td>
                                        <td class="tab_title">性　　别：</td>
                                        <td class="tab_inp">
                                            <Input v-model="sex" readonly class="Input">
                                            </Input>
                                        </td>
                                        <td class="tab_title">年　　龄：</td>
                                        <td class="tab_inp">
                                            <Input v-model="age" readonly class="Input">
                                            </Input>
                                        </td>
                                        <td class="tab_title">检查日期：</td>
                                        <td class="tab_inp">
                                            <Input v-model="addtime" readonly class="Input">
                                            </Input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="tab_title">检查设备：</td>
                                        <td class="tab_inp">
                                            <Input v-model="equipment" readonly class="Input">
                                            </Input>
                                        </td>
                                        <td class="tab_title">检查部位：</td>
                                        <td class="tab_inp">
                                            <Input v-model="checkpoint" readonly class="Input">
                                            </Input>
                                        </td>
                                        <td class="tab_title">检查项目：</td>
                                        <td class="tab_inp">
                                            <Input v-model="insproject" readonly class="Input">
                                            </Input>
                                        </td>
                                        <td class="tab_title">
                                            <Checkbox v-model="single" disabled >是否增强</Checkbox>
                                        </td>
                                        <td class="tab_inp"></td>
                                    </tr>
                                </table>
                            </Card>
                            <Card class="Card" style="margin-top:15px;">
                                <h4>影像所见</h4>
                                <br>
                                <Input v-model="image" type="textarea" :rows="5" style="width:100%;">

                                </Input>
                            </Card>
                            <Card class="Card" style="margin-top:15px;">
                                <h4>印象</h4>
                                <br>
                                <Input v-model="diagnostic" type="textarea" :rows="5" style="width:100%;">

                                </Input>
                                <Checkbox v-model="singleBg">阳性</Checkbox>
                            </Card>
                            <Card class="Card" style="margin-top:15px;">
                                <h4>报告评分</h4>
                                <br>
                                <ul class="report-doctor">
                                    <li ><span style="width:180px;">报告医师（{{repdoctor}}）：</span><span style="color:red;width:50px;">{{DiaNameScore}} 分</span></li>
                                    <li v-if="scoreFlag === 0"><span v-for="(item,index) in diaScoreObj" :key="item.igId" class="diaScore">
                                           <CheckboxGroup  @on-change="changeCheck(1,index,item.score,item.igId)" >
                                                <Checkbox v-model="index">{{item.name}}</Checkbox>
                                            </CheckboxGroup>
                                        </span>
                                    </li>
                                </ul>
                                <ul class="report-doctor">
                                    <li ><span style="width:180px;">审核医师（{{reviewdoctor}}）：</span><span style="color:red;width:50px;">{{reviewNameScore}} 分</span></li>
                                    <li v-if="scoreFlag === 0"><span v-for="(item,index) in scoreObj" :key="item.igId" class="diaScore">
                                            <CheckboxGroup  @on-change="changeCheck(2,index,item.score,item.igId)" >
                                                <Checkbox v-model="index">{{item.name}}</Checkbox>
                                            </CheckboxGroup>
                                        </span>
                                    </li>
                                </ul>
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td class="tab_title">报告日期：</td>
                                        <td class="tab_inp">{{reptime}}</td>
                                        <td class="tab_title">报告医生：</td>
                                        <td class="tab_inp"> {{repdoctor}}</td>
                                        <td class="tab_title">审核日期：</td>
                                        <td class="tab_inp"> {{reviewDate}}</td>
                                        <td class="tab_title">审核医生：</td>
                                        <td class="tab_inp">{{reviewdoctor}}</td>
                                    </tr>
                                </table>
                            </Card>
                            <div class="btnitem">
                                 <span  class="spa">
                                     <i-button type="success" @click="saveScore">&nbsp;&nbsp;&nbsp;&nbsp;保存&nbsp;&nbsp;&nbsp;&nbsp;</i-button>
                                     <i-button type="error" @click="cancleAudit">&nbsp;&nbsp;&nbsp;&nbsp;取　消&nbsp;&nbsp;&nbsp;&nbsp;</i-button>
                                </span>
                              
                            </div>
                        </Content>
                    </Layout>
            </TabPane>
            <TabPane label="影像浏览">
                <iframe :src="reportDicom" width="100%" height="900px" frameborder="0" scrolling="auto"></iframe>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
import Application from '../MyApplication/ApplyContent.vue'
export default {
  data() {
    var ref;
    var saveMethod;
    return {
      reportDicom:'',
      reportState:'',
      reviewDoctor:'内容信息',
      reportDoctor:"",
      value:"",
      name: '姓名',
      sex: '性别',
      age: '年龄',
      addtime: '检查日期',
      single:true,
      equipment: '',
      scoreIndex:{},
      equipmentId:1,
      checkpoint: '',
      insproject: '',
      image: '',
      diagnostic: '',
      DiaNameScore:1,
      reviewNameScore:1,
      repPart:'',
      singleBg:0,
      reptime:'',
      repdoctor:'报告医生',
      reviewdoctor:'审核医生',
      reviewDate:"2018-7-7",
      modal1: false,
      modal2: false,
      image2: "",
      diagnostic2: "",
      insproject: "",
      UserCont:{},
      userContList:[],
      equipmentId:1,
      expandPartId:[],
      reportHistory:[],
      scoreObj:[],
      diaScoreObj:[],
      auditGradeIds:[],
      reportGradeIds:[],
      scoreFlag:1

    };

  },
  methods: {

    getReportInformation(){
        var self = this;
        const getPersonInformation={
            url:'/ids-server/user/v1/report/?iraId='+self.$route.params.id,  ///ids-server/user/v1/report/?iraId=1
            method:'get'
        };
        self.http(getPersonInformation).then((res)=>{
            var self = this;
            if (res.data.code === 1)
            {
                self.name =  res.data.data.name;
                
                if(res.data.data.gender == 1)
                {
                    self.sex =  '男'
                }else if(res.data.data.gender == 2)
                {
                    self.sex =  '女'
                }else
                {
                    self.sex =  '未知'
                }
                self.age = res.data.data.age
                if(res.data.data.ageUnit ==1)
                {
                    self.age = self.age +'岁'
                }else if(res.data.data.ageUnit ==2)
                {
                    self.age = self.age +'月'
                }else if(res.data.data.ageUnit ==3)
                {
                    self.age = self.age +'天'
                }else if(res.data.data.ageUnit ==4)
                {
                    self.age = self.age +'时'
                }


                self.addtime = self.timestampToTime(res.data.data.examTime)


                var checkList =  res.data.data.itemList;
                if (checkList.length === 0) {
                    return false;
                }
               self.equipment=checkList[0].emy_name;
               self.equipmentId=checkList[0].emy_id;
                for(var i = 0;i<checkList.length;i++)
                {
                     self.expandPartId.push(checkList[i].ep_id)
                    if(i==0)
                    {
                        self.checkpoint = checkList[i].ep_name;
                        self.insproject = checkList[i].em_name;
                    }else
                    {
                        self.checkpoint = self.checkpoint +'/' + checkList[i].ep_name
                        self.insproject = self.insproject +'/' + checkList[i].em_name;

                    }
                }
                if(checkList[0].is_enhance == 2)
                {
                    self.single = true;
                }else
                {
                    self.single = false;
                }
                self.image =  res.data.data.findings
                self.diagnostic =  res.data.data.impression
                if(res.data.data.reportTime == 0)
                {
                    self.reptime = ''
                }else
                {
                    self.reptime = self.timestampToTime(res.data.data.reportTime)
                }
                self.repdoctor =  res.data.data.reportDoctor;
                self.reviewdoctor = res.data.data.auditDoctor;
                  if( res.data.data.isPositive == 2)
                {
                    self.singleBg = true;
                }else
                {
                    self.singleBg = false;
                }
            } else {
                this.$Message.error(res.data.msg);
            }
        },(error)=>{
            console.log(error)
        });

    },
      //时间戳转换日期时间
      timestampToTime(timestamp) {
          var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate() + ' ';
          var h = date.getHours() + ':';
          var m = date.getMinutes() + ':';
          var s = date.getSeconds();
          // return Y + M + D + h + m + s;//年月日时分秒
          return Y + M + D; //年月日
      },
      changeCheck(num,index,score,id){
       if (num === 2) {
           this.auditGradeIds.push(id)
            if (index) {
                this.reviewNameScore = this.reviewNameScore+(score)
            } else {
                this.reviewNameScore = this.reviewNameScore-(score)
            }
        } else {
            this.reportGradeIds.push(id)
            if (index) {
                this.DiaNameScore = this.DiaNameScore+(score)
            } else {
                this.DiaNameScore = this.DiaNameScore-(score)
            }
         }  
      },
    //提交/审核报告
    saveScore(){  //保存分数
        var self = this;
        var isPositiveNum;
        const saveDoneReport={
            url:'/ids-server/user/v1/report/grade',
            method:'Post',
            data:{
                iraId:self.$route.params.id,
                reportGradeIds:self.reportGradeIds.join(','),
                auditGradeIds:self.auditGradeIds.join(',') 
            }
        }
        self.http(saveDoneReport).then((res)=>{
           self.$router.push('/index/score') 
        },(error)=>{
            console.log(error)
        });
      },
    //取消报告
    cancleAudit(){
        this.$router.push('/index/score')
    },
    scoreValue(){
        var self = this
        this.http({
            url:"/ids-server/user/v1/report/grade/item",
            method:'get'
        }).then((res)=>{
            self.scoreObj = res.data.data
            self.diaScoreObj =  res.data.data
        })
    }

  },

  mounted() {
    this.getReportInformation();
    const self = this
    this.reportDicom="/static/Ipacs1/PcView.html?time="+Math.floor(Math.random()*1000);
    this.reportState =  window.sessionStorage.getItem('reportState');
    //获取评分项
    this.scoreValue()
    this.http({
        url:'/ids-server/user/v1/report/grade/score?iraId='+this.$route.params.id,
        method:'get'
    }).then((res)=>{
        var resD = res.data.data
        self.scoreFlag = resD.auditDoctorIrgId
        if (resD.auditDoctorIrgId === 0) {
             self.DiaNameScore = 100
             self.reviewNameScore = 100
        } else {
            self.DiaNameScore = resD.reportDoctorScore
            self.reviewNameScore =resD.auditDoctorScore
        }
       // alert(self.scoreFlag )
    })
  },
  components:{
    Application
  }

};


</script>
<style lang="less">
    .Tree {
        background: #f8f8f9;
        overflow-y: auto;
    }
    .Card {
        h4 {
            color: @default-color;
        }
        .tab_title{
            width: 5%;
            height: 50px;
            text-align: right;
        }
        .tab_inp{
            width: 20%;
            text-align: left;
            .Input {
            width: 70%;
            }
        }
    }
    .btnitem{
      margin: 15px 10px;
    }
    .spa{
        float: right;
    }
    .report-doctor,.report-doctor li{
        display:flex;
        margin-bottom:10px;
       // justify-content:space-between;
    }
    .report-doctor li:nth-child(2){
        margin-left:100px;
        span.diaScore{
            margin:0 20px;
        }
    }
</style>
