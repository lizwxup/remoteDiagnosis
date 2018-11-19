<template>
    <div style="padding:10px;" class="reportBar">
        <Tabs :animated="false" @on-click ="changeName" >
            <TabPane label="申请单">
              <application></application>
            </TabPane>
            
            <TabPane label="报告单">
                  <Layout>
                    <Sider hide-trigger class="Tree" id="Tree">
                       <Tree :data="reportData" :render="renderContent"></Tree>
                    </Sider>
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
                            </Card>
                            <Card class="Card" style="margin-top:15px;">
                                <h4><span class="spa"><Checkbox v-model="singleBg">阳性</Checkbox></span>报告信息</h4>
                                <br>
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td class="tab_title">报告时间：</td>
                                        <td class="tab_inp"><Input v-model="reptime" readonly class="Input">

                                            </Input></td>
                                        <td class="tab_title">报告医生：</td>
                                        <td class="tab_inp"><Input v-model="repdoctor" readonly class="Input">

                                            </Input></td>
                                        <td class="tab_title">审核医生：</td>
                                        <td class="tab_inp"><Input v-model="reviewdoctor" readonly class="Input">
                                    </Input></td>
                                    </tr>
                                </table>
                            </Card>
                            <div class="btnitem">
                                <Button @click="operationRecords">报告历史</Button>
                                  <Modal v-model="modal1" width="600">
                                    <p slot="header" style="color:#f60;text-align:left">
                                        <span>请选择报告模板的插入方式</span>
                                    </p>
                                    <div>
                                          <h4 style="padding-bottom:5px;">检查设备/部位/方法</h4>
                                          <Input v-model="repPart" disabled class="Input">
                                        </Input>
                                          <h4 style="padding-bottom:5px; padding-top:10px;">影像所见</h4>
                                          <Input v-model="image2" disabled type="textarea" :rows="3" style="width:100%;"> </Input>
                                          <h4 style="padding-bottom:5px; padding-top:10px;">印象</h4>
                                          <Input v-model="diagnostic2" disabled type="textarea" :rows="3" style="width:100%;"> </Input>
                                    </div>
                                    <div slot="footer">
                                        <Button type="success" class="ivu-btn ivu-btn-success" @click="del('1')">覆盖</Button>
                                        <Button type="success" class="ivu-btn ivu-btn-success" @click="del('2')">追加</Button>
                                        <Button @click="modal1= false">取消</Button>
                                    </div>
                                </Modal>
                                <Modal v-model="modal2" width="350">
                                    <p slot="header" style="color:#f60;text-align:left">
                                        <span>报告操作历史列表</span>
                                    </p>
                                    <div v-if="reportHistory.length == 0 "> 暂无操作记录</div>
                                    <div v-else  v-for="item in reportHistory">
                                        <div @click="historyItemAction(item.iroId)">
                                            <div style="width: 100px;margin-left: 20px;float: left;line-height: 25px">
                                                {{ item.doctor }}
                                            </div >
                                            <div style="width: 150px;margin-left: 20px;float: left;line-height:25px">
                                                {{ item.timmer}}
                                            </div>
                                        </div>
                                    </div>
                                    <div style="clear: both"></div>
                                    <div slot="footer" >
                                        <Button @click="modal2= false">取消</Button>
                                    </div>
                                </Modal>


                                <Button @click="reportPrint">报告打印</Button>
                                <span v-if="reportState === '101'" class="spa">
                                    <i-button type="success" @click="commitReport">&nbsp;&nbsp;&nbsp;&nbsp;完成&nbsp;&nbsp;&nbsp;&nbsp;</i-button>
                                    <i-button type="error" @click="cancleAudit">&nbsp;&nbsp;&nbsp;&nbsp;取　消&nbsp;&nbsp;&nbsp;&nbsp;</i-button>
                                </span>
                                <span v-else-if="reportState === '104'" class="spa">
                                    <i-button type="success" @click="commitReport">&nbsp;&nbsp;&nbsp;&nbsp;审核&nbsp;&nbsp;&nbsp;&nbsp;</i-button>
                                    <i-button type="success" @click="auditAgain">&nbsp;&nbsp;&nbsp;&nbsp;发起再审&nbsp;&nbsp;&nbsp;&nbsp;</i-button>
                                    <i-button type="error" @click="cancleAudit">&nbsp;&nbsp;&nbsp;&nbsp;取　消&nbsp;&nbsp;&nbsp;&nbsp;</i-button>
                                </span>
                                 <span v-else-if="reportState === '106'" class="spa">
                                     <i-button type="success" @click="commitReport">&nbsp;&nbsp;&nbsp;&nbsp;审核&nbsp;&nbsp;&nbsp;&nbsp;</i-button>
                                     <i-button type="error" @click="cancleAudit">&nbsp;&nbsp;&nbsp;&nbsp;取　消&nbsp;&nbsp;&nbsp;&nbsp;</i-button>
                                </span>
                                <span v-else-if="reportState === '111'" class="spa">
                                    <i-button type="success" @click="withdrawReport">&nbsp;&nbsp;&nbsp;&nbsp;撤回&nbsp;&nbsp;&nbsp;&nbsp;</i-button>
                                    <i-button type="error" @click="backReportList">&nbsp;&nbsp;&nbsp;&nbsp;返回&nbsp;&nbsp;&nbsp;&nbsp;</i-button>
                                </span>
                                <!-- @click="backReportList" @click="withdrawReport" -->
                                <span v-else class="spa"></span>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </TabPane>
            <TabPane label="影像浏览">
                <iframe  v-if="iframeName" :src="reportDicom" width="100%" height="900px" frameborder="0" scrolling="auto"></iframe>
            </TabPane>
            <Button type="text"  size="small" slot="extra" @click="backCont"><Icon type="close-circled" size="18" color="#4f91ff"></Icon></Button>
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
      reportData:[
        { title: "公共模板",
          expand: true,
          children:[]
        }],
      value:"",
      name: '姓名',
      sex: '性别',
      age: '年龄',
      addtime: '检查日期',
      single:true,
      equipment: '',
      equipmentId:1,
      checkpoint: '',
      insproject: '',
      image: '',
      diagnostic: '',
      singleBg: 0,
      repPart:'',
      reptime:'报告时间',
      repdoctor:'报告医生',
      reviewdoctor:'审核医生',
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
      iframeName:false
    };

  },
  methods: {
      //报告操作记录保存（轮询）
      saveRecords(){
            
          var self = this;
          var isPositiveNum;
          if(self.singleBg == true)
          {
              isPositiveNum = 2;
          }else
          {
              isPositiveNum = 1;
          }

          const PostDoneReport={
              url:'/ids-server/user/v1/report/mark',
              method:'Post',
              data:{
                  iraId:self.$route.params.id,
                  findings:self.image,
                  impression:self.diagnostic,
                  isPositive:isPositiveNum,
              }
          }
          self.http(PostDoneReport).then((res)=>{
            //   if (res.data.code === 1)
            //   {
            //      console.log(111222333)

            //   }else{

            //       this.$Message.error(res.data.msg);
            //   }

          },(error)=>{
              console.log(error)
          })
      },
      //点击历史纪录item
      historyItemAction(iroId){
          var self = this;
          self.modal2 = false;
          const getPersonInformation={
              url:'/ids-server/user/v1/report/operate/info?iroId='+iroId,  ///ids-server/user/v1/report/?iraId=1
              method:'get'
          };
          self.http(getPersonInformation).then((res)=>{
              var self = this;
              if (res.data.code === 1)
              {
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

      //获取操作记录列表数据
      operationRecords(){
          var self = this;
          self.modal2 = true;
          const Records={
              url:'/ids-server/user/v1/report/operate?iraId='+self.$route.params.id,
              method:'get',
          }
          self.http(Records).then((res)=>{
              var self = this;
              if (res.data.code === 1)
              {
                  self.reportHistory = res.data.data;
                  for (var i=0;i< self.reportHistory.length;i++)
                  {
                      self.reportHistory[i].timmer = this.dateTransfer.transferDate(self.reportHistory[i].time);
                  }
                  console.log(self.reportHistory)
              }else {
                  this.$Message.error(res.data.msg);
              }
          },(error)=>{
              console.log(error)
          });
      },
      //报告操作中
        keepDoReport(){
          var self = this;
          const PostCancleReport={
              url:'/ids-server/user/v1/report/keep',
              method:'Post',
              data:{
                  iraId:self.$route.params.id,
              }
          }
          self.http(PostCancleReport).then((res)=>{
              var self = this;
              if (res.data.code === 1)
              {
                  console.log('报告操作中');
              }else {
                  this.$Message.error(res.data.msg);
              }
          },(error)=>{
              console.log(error)
          });
      },
      changeName(name){
          if (name === 2) {
            this.iframeName = true
          }
        
      },
      //  //撤回报告
      withdrawReport(){
          var self = this;
          const PostCancleReport={
              url:'/ids-server/user/v1/report/recall',
              method:'Post',
              data:{
                  iraId:self.$route.params.id,
              }
          }
          self.http(PostCancleReport).then((res)=>{
              var self = this;
              if (res.data.code === 1)
              {
                  this.$Message.success('已撤回');
                  self.$router.push('/index/image')
              }else {
                  this.$Message.error(res.data.msg);
              }
          },(error)=>{
              console.log(error)
          });
      },
//  //返回
      backReportList(){
          var self = this;
          self.$router.push('/index/image')
      },

      del(id) {
       var self = this
       if (id === '1') {  //覆盖
           self.image   = self.image2
           self.diagnostic = self.diagnostic2
       }else {  //追加
           self.image   = self.image+self.image2
           self.diagnostic =  self.image+self.diagnostic2
       }
      this.modal1 = false
    },
    renderContent (h,{ root, node, data }) {
        return h('span', {
                  style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', {
                           on: {
                              click: () => {
                                if (data.children === undefined ) {
                                    this.getDetailMessage(data)
                                 }
                             }
                            }
                        },data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight:'32px'
                        }
                    })
                ]);
    },
    backCont(){
        this.$router.go(-1)
    },
    getDetailMessage(data){
        var self = this
        self.modal1 = true
        self.repPart =data.modalityName+'/'+data.partName+'/'+data.methodName
        self.image2 = data.impression
        self.diagnostic2  = data.findings
    },
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
                self.getTemplateData()
            } else {
                this.$Message.error(res.data.msg);
            }
        },(error)=>{
            console.log(error)
        });

    },
    getTemplateData(){
        var self = this
            const getTemplateUrl={
            url:'/rts-server/user/report/template?modalityId='+ self.equipmentId,
            method:'get'
        }
        self.http(getTemplateUrl).then(function(res){
            if (res.data.code === 1) {
            self.reportData.forEach(function(report,index){
                res.data.data.forEach(function(item,index){
                var obj={}
                if (self.contains(self.expandPartId,item.partId)) {
                      obj.expand = true
                }else {
                      obj.expand = false
                 }
                obj.partId = item.partId
                obj.title = item.title
                obj.children =  item.children
                report.children.push(obj)
                })
            })
           }
        },(error)=>{
    })
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
     contains(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
            return true;
         }
        }
        return false;
    },
    //提交/审核报告
    commitReport(){
        var self = this;
        var isPositiveNum;
        if(self.singleBg == true)
        {
            isPositiveNum = 2;
        }else
        {
            isPositiveNum = 1;
        }

        const PostDoneReport={
            url:'/ids-server/user/v1/report/commit',
            method:'Post',
            data:{
                iraId:self.$route.params.id,
                findings:self.image,
                impression:self.diagnostic,
                isPositive:isPositiveNum,
            }
        }
        self.http(PostDoneReport).then((res)=>{
         var self = this;
            if (res.data.code === 1)
            {
                this.$Message.success('已提交');
                self.$router.push('/index/image')
            }else{
                this.$Message.error(res.data.msg);
            }
        },(error)=>{
            console.log(error)
        });
      },
    auditAgain(){
      var self = this;
      var isPositiveNum;
      if(self.singleBg == true)
      {
        isPositiveNum = 2;
      }else
      {
        isPositiveNum = 1;
      }

      const PostDoneReport={
        url:'/ids-server/user/v1/report/reaudit',
        method:'Post',
        data:{
          iraId:self.$route.params.id,
          findings:self.image,
          impression:self.diagnostic,
          isPositive:isPositiveNum,
        }
      }
      self.http(PostDoneReport).then((res)=>{
        var self = this;
        if (res.data.code === 1)
        {
          this.$Message.success('已提交');
          self.$router.push('/index/image')
        }else{
          this.$Message.error(res.data.msg);
        }
      },(error)=>{
        console.log(error)
      });


    },
    reportPrint(){
        this.$router.push('/Finished/'+this.$route.params.id)
    },
    //取消报告
    cancleAudit(){
        var self = this;
        const PostCancleReport={
            url:'/ids-server/user/v1/report/cancel',
            method:'Post',
            data:{
                iraId:self.$route.params.id,
            }
        }
        self.http(PostCancleReport).then((res)=>{
            var self = this;
            if (res.data.code === 1)
            {
                this.$Message.success('已取消');
                self.$router.push('/index/image')
            }else {
                this.$Message.error(res.data.msg);
            }
        },(error)=>{
            console.log(error)
        });
    },

  },

  mounted() {
    var self = this;
    this.getReportInformation();
    document.getElementById("Tree").style.height =document.documentElement.clientHeight - 70 + "px";
    this.reportDicom="../../dist/static/Ipacs1/PcView.html?time="+Math.floor(Math.random()*1000);
    console.log(this.reportDicom)
    this.reportState =  window.sessionStorage.getItem('reportState');
   // alert(this.reportState)
    if(this.reportState == 101 || this.reportState ==104)
    {
        //一分钟自动请求诊断中（轮询.
        self.ref = setInterval(function(){
            self.keepDoReport();
        },60000);


        //三十秒自动保存（轮询）
        self.saveMethod = setInterval(function(){
            self.saveRecords();
        },30000);
    }
  },
    //页面退出销毁定时器
    beforeDestroy() {
        if(this.ref) { //如果定时器还在运行 或者直接关闭，不用判断
            clearInterval(this.ref); //关闭
        }
        if(self.saveMethod) { //如果定时器还在运行 或者直接关闭，不用判断
            clearInterval(self.saveMethod); //关闭
        }
    },
  components:{
    Application
  },

};


</script>
<style lang="less">
    .Tree {
        background: #f8f8f9;
        overflow-y: auto;
    }
    .Card {
        margin: 0 10px;
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
    .reportBar .ivu-tabs-bar{
        background:#fff;
        line-height: 30px;
        border-bottom: none;
    }
</style>
