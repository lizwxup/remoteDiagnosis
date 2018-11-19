
<template>
    <div class="layout">
    <Card>
         <div>
            <div class="selectName">统计类型:&nbsp</div>
            <Select v-model="statisticsType" class="selectStyle" @on-change="selStatisticType">
            <Option v-for="item in statisticsTypeList" :value="item.value" :key="item.value">{{ item.label}}</Option>
            </Select>
            <div class="selectName" style="margin-left: 30px">检查类型:&nbsp</div>
            <Select v-model="checkType" class="selectStyle" @on-change="selEquipmentType">
                <Option v-for="item in checkTypeList" :value="item.id" :key="item.id">{{ item.name}}</Option>
            </Select>
            <div class="selectName" style="margin-left: 30px">报告时间:&nbsp</div>
            <DatePicker @on-change="selDate" type="daterange" placement="bottom-end" placeholder="Select date" class="selectStyle" style="width: 200px"></DatePicker>
            <div class="selectName" style="margin-left: 30px">申请医院:&nbsp</div>
            <Select v-model="hospital" class="selectStyle" @on-change="selHospital">
                <Option v-for="item in hospitalList" :value="item.id" :key="item.id">{{ item.name}}</Option>
            </Select>
        </div>
        <div style="clear: both"></div>
        <div style="width: 100%;height: 1px;margin-top: 20px;background-color: lightgrey"></div>
        <div style="margin-top: 40px">
            <div style="width: 80%;float: left;text-align: center">
                <div class="defaultColor">报告数统计</div>
                <div style="width: 100%;height:450px" id="bingzhuangtu"></div>
            </div>
            <!--<div style="width: 1px;height: 360px;background-color: lightgrey;float: left"></div>-->
            <!--<div style="width: 49%;float: left;height: 50px;text-align: center" >-->
                <!--<div class="defaultColor">诊断时间统计</div>-->
                <!--<div style="width: 100%;height:400px" id="zhexiantu"></div>-->
            <!--</div>-->
        </div>
        <div style="clear: both"></div>
    </Card>

    </div>
</template>
<script>
export default{
        data () {
            return {
                statisticsTypeList: [
                    {
                        value: '1',
                        label: '申请'
                    },
                    {
                        value: '2',
                        label: '诊断'
                    }
                    ,
                    {
                        value: '3',
                        label: '审核'
                    }
                ],
                statisticsType: '2',
                checkTypeList: [],
                checkType: '',
                hospitalList: [
                ],
                hospital: '',
                noPrintNum:2,
                printNum:1,
                rejectedNum:1,
                startTime:'',
                endTime:'',
            }
        },
        methods:{
          //选择日期
          selDate(time,type){
            this.startTime = new Date(time[0]).getTime();
            this.endTime   = new Date(time[1]).getTime();
            this.getStatisticData();
          },
          //选择诊断类型
          selStatisticType(){
            this.getStatisticData();
          },
          //选择检查类型
          selEquipmentType(){
            this.getStatisticData();
          },
          //选择医院
          selHospital(){
            this.getStatisticData();
          },
          //获取医院列表
          getHospitalList(){
            var self = this;
            const getHospitalList={
              url:'/ums-server/user/v1/organzation/simple',
              method:'get',
            };
            self.http(getHospitalList).then((res)=>{
              if(res.data.code === 1)
              {
                self.hospitalList = res.data.data;
              }else{
                this.$Message.error(res.data.msg);
              }
            },(error)=>{
              console.log(error)
            });
          },
          //获取设备列表
          getEquipmentList(){
            var self = this;
            const getEqipmentInformation={
              url:'/eds-server/v1/dict/exam/modality',
              method:'get',
            };
            self.http(getEqipmentInformation).then((res)=>{
              if (res.data.code === 1)
              {
              self.checkTypeList = res.data.data;
              } else {
                this.$Message.error(res.data.msg);
              }
            },(error)=>{
              console.log(error)
            });
          },
          //获取统计数据
          getStatisticData(){
            var self = this;
            const getStatistic={
              url:'/ids-server/user/v1/myStatistics?type='+self.statisticsType+'&emyId='+self.checkType+'&hospitalId='+self.hospital+'&startTime='+self.startTime+'&endTime='+self.endTime,
              method:'get'
            }
            self.http(getStatistic).then((res)=>{
              if (res.data.code === 1)
              {
                self.noPrintNum = res.data.data.noPrint;
                self.printNum = res.data.data.printed;
                self.rejectedNum = res.data.data.rejected;
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('bingzhuangtu'));
                // 指定图表的配置项和数据
                var option = {
                  tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                  },
                  legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: ['未打印', '已打印', '已驳回']
                  },
                  series: [
                    {
                      name: '访问来源',
                      type: 'pie',
                      radius: ['50%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [
                        {
                          value: self.noPrintNum,
                          name: '未打印',
                          itemStyle: {
                            // 点的颜色。
                            color: new echarts.graphic.LinearGradient(
                              0, 0, 0, 1,
                              [
                                {offset: 0, color: 'rgb(95,167,251)'},
                                {offset: 0.5, color: 'rgb(95,167,251)'},
                                {offset: 1, color: 'rgb(255,255,255)'}
                              ]
                            )
                          },
                        },
                        {
                          value: self.printNum,
                          name: '已打印',
                          itemStyle: {
                            // 点的颜色。
                            color: new echarts.graphic.LinearGradient(
                              0, 0, 0, 1,
                              [
                                {offset: 0, color: 'rgb(255,120,253)'},
                                {offset: 0.5, color: 'rgb(255,120,253)'},
                                {offset: 1, color: 'rgb(255,255,255)'}
                              ]
                            )
                          },
                        },

                        {
                          value:self.rejectedNum,
                          name: '已驳回',
                          itemStyle: {
                            // 点的颜色。
                            color: new echarts.graphic.LinearGradient(
                              0, 0, 0, 1,
                              [
                                {offset: 0, color: 'rgb(153,153,153)'},
                                {offset: 0.5, color: 'rgb(153,153,153)'},
                                {offset: 1, color: 'rgb(255,255,255)'}
                              ]
                            )
                          },
                        },
                      ]
                    }
                  ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);

//                  var myChartt = echarts.init(document.getElementById('zhexiantu'));
//                // 指定图表的配置项和数据
//                var optionn =
//                {
//                  xAxis: {
//                    type: 'category',
//                    boundaryGap: false,
//                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//                  },
//                  yAxis: {
//                    type: 'value',
//                    name: '已诊时间(h)',
//                  },
//                  series: [{
//                    data: [820, 932, 901, 934, 1290, 1330, 1320],
//                    type: 'line',
//                    areaStyle: {
//                      //内部颜色
//                      normal: {
//                        color: new echarts.graphic.LinearGradient(
//                          0, 0, 0, 1,
//                          [
//                            {offset: 0, color: 'rgb(150,200,250)'},
//                            {offset: 0.5, color: 'rgb(209,226,251)'},
//                            {offset: 1, color: 'rgb(255,255,255)'}
//                          ]
//                        )
//                      }
//                    },
//                    lineStyle:
//                    {
//                      color: 'rgb(150,200,250)'
//                    },
//                  }]
//                };
//                myChartt.setOption(optionn);
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
            this.getStatisticData();
            this.getEquipmentList();
            this.getHospitalList();
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
    width: 150px !important;
}

</style>
