<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
       
        
            <div style="" id="pageContent">
                <Content style="padding: 20px" >
                    <Tabs :animated="false" class="default-body-bg">
                        <!--<TabPane label="申请单">-->

                            <!--<Card style="margin-top: 10px">-->
                                <!--<div style="width: 100%">-->
                                    <!--&lt;!&ndash;<div style="height: 20px;margin-top: 10px;float: left;width: 5px;margin-right: 10px;" class="defaultBg"></div>&ndash;&gt;-->
                                    <!--<div style="line-height: 40px;font-size: 14px;">患者信息</div>-->
                                    <!--<div style="margin-top: 10px">-->
                                        <!--<table width="100%" class="CSSearchTbl" cellpadding="0" cellspacing="0">-->
                                            <!--<tr>-->
                                                <!--<td class="tdRight">姓名:</td>-->
                                                <!--<td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>-->
                                                <!--<td class="tdRight">性别:</td>-->
                                                <!--<td class="tdLeft">-->
                                                    <!--<Select v-model="selSex" style="width:150px">-->
                                                        <!--<Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label}}</Option>-->
                                                    <!--</Select>-->
                                                <!--</td>-->
                                                <!--<td class="tdRight">年龄:</td>-->
                                                <!--<td class="tdLeft">-->
                                                    <!--<Select v-model="selAge" style="width:90px">-->
                                                        <!--<Option v-for="item in ageList" :value="item.value" :key="item.value">{{ item.label}}</Option>-->
                                                    <!--</Select>-->
                                                    <!--<Select v-model="selTimeType" style="width:60px">-->
                                                        <!--<Option v-for="item in timeTypeList" :value="item.value" :key="item.value">{{ item.label}}</Option>-->
                                                    <!--</Select>-->
                                                <!--</td>-->
                                                <!--<td class="tdRight">门诊号:</td>-->
                                                <!--<td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>-->
                                                <!--<td class="tdRight">住院号:</td>-->
                                                <!--<td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>-->
                                            <!--</tr>-->
                                            <!--<tr>-->
                                                <!--<td class="tdRight">床位号:</td>-->
                                                <!--<td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>-->
                                                <!--<td class="tdRight">科室:</td>-->
                                                <!--<td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>-->
                                                <!--<td class="tdRight">患者来源:</td>-->
                                                <!--<td class="tdLeft">-->
                                                    <!--<Select v-model="selSource" style="width:150px">-->
                                                        <!--<Option v-for="item in sourceList" :value="item.value" :key="item.value">{{ item.label}}</Option>-->
                                                    <!--</Select>-->
                                                <!--</td>-->
                                                <!--<td class="tdRight">是否急诊:</td>-->
                                                <!--<td class="tdLeft">-->
                                                    <!--<Select v-model="selIsEmergency" style="width:150px">-->
                                                        <!--<Option v-for="item in isEmergencyList" :value="item.value" :key="item.value">{{ item.label}}</Option>-->
                                                    <!--</Select>-->
                                                <!--</td>-->
                                                <!--<td class="tdRight">检查日期:</td>-->
                                                <!--<td class="tdLeft">-->
                                                    <!--<Col span="12">-->
                                                    <!--<DatePicker type="date" placeholder="Select date" class="date" ></DatePicker>-->
                                                    <!--</Col>-->
                                                <!--</td>-->
                                            <!--</tr>-->
                                            <!--<tr>-->
                                                <!--<td class="tdRight">身高:</td>-->
                                                <!--<td class="tdLeft"><i-input class="s_parts" style="width: 120px"></i-input><span>&nbsp&nbspcm</span></td>-->
                                                <!--<td class="tdRight">体重:</td>-->
                                                <!--<td class="tdLeft"><i-input class="s_parts" style="width: 120px"></i-input><span>&nbsp&nbspkg</span></td>-->
                                                <!--<td class="tdRight">婚姻状况:</td>-->
                                                <!--<td class="tdLeft">-->
                                                    <!--<Select v-model="selMarriage" style="width:150px">-->
                                                        <!--<Option v-for="item in marriageList" :value="item.value" :key="item.value">{{ item.label}}</Option>-->
                                                    <!--</Select>-->
                                                <!--</td>-->
                                                <!--<td class="tdRight">联系方式:</td>-->
                                                <!--<td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>-->
                                            <!--</tr>-->
                                        <!--</table>-->
                                    <!--</div>-->

                                <!--</div>-->
                            <!--</Card >-->
                            <!--<Card style="margin-top: 10px">-->
                                <!--<div style="width: 100%;">-->
                                    <!--&lt;!&ndash;<div style="height: 20px;margin-top: 10px;float: left;width: 5px;margin-right: 10px;" class="defaultBg"></div>&ndash;&gt;-->
                                    <!--<div style="line-height: 40px;font-size: 14px;">检查信息</div>-->

                                    <!--<div style="margin-top: 10px">-->
                                        <!--<table width="100%" class="CSSearchTbl" cellpadding="0" cellspacing="0">-->
                                            <!--<tr>-->
                                                <!--<td class="tdRight">检查类型:</td>-->
                                                <!--<td class="tdLeft">-->
                                                    <!--<Select v-model="selCheckType" style="width:150px">-->
                                                        <!--<Option v-for="item in checkTypeList" :value="item.value" :key="item.value">{{ item.label}}</Option>-->
                                                    <!--</Select>-->
                                                <!--</td>-->
                                                <!--<td class="tdRight">检查部位:</td>-->
                                                <!--<td class="tdLeft">-->
                                                    <!--<Select v-model="selCheckBody" style="width:150px">-->
                                                        <!--<Option v-for="item in checkBodyList" :value="item.value" :key="item.value">{{ item.label}}</Option>-->
                                                    <!--</Select>-->
                                                <!--</td>-->
                                                <!--<td class="tdRight">检查项目:</td>-->
                                                <!--<td class="tdLeft">-->
                                                    <!--<Select v-model="selCheckItem" style="width:150px">-->
                                                        <!--<Option v-for="item in checkItemList" :value="item.value" :key="item.value">{{ item.label}}</Option>-->
                                                    <!--</Select>-->
                                                <!--</td>-->
                                                <!--<td class="tdRight">是否增强:</td>-->
                                                <!--<td class="tdLeft">-->
                                                    <!--<Select v-model="selIsBigger" style="width:150px">-->
                                                        <!--<Option v-for="item in isBiggerList" :value="item.value" :key="item.value">{{ item.label}}</Option>-->
                                                    <!--</Select>-->
                                                <!--</td>-->
                                                <!--<td class="tdRight">发起医师:</td>-->
                                                <!--<td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>-->
                                            <!--</tr>-->

                                            <!--<tr>-->
                                                <!--<td class="tdRight">技师:</td>-->
                                                <!--<td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>-->
                                                <!--<td class="tdRight">检查号:</td>-->
                                                <!--<td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>-->
                                                <!--<td class="tdRight">影像号:</td>-->
                                                <!--<td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>-->
                                            <!--</tr>-->

                                        <!--</table>-->
                                    <!--</div>-->

                                <!--</div>-->
                            <!--</Card>-->
                            <!--<Card style="margin-top: 10px">-->
                                <!--<div style="width: 100%;">-->
                                    <!--&lt;!&ndash;<div style="height: 20px;margin-top: 10px;float: left;width: 5px;margin-right: 10px;" class="defaultBg"></div>&ndash;&gt;-->
                                    <!--<div style="line-height: 40px;font-size: 14px;">其他信息</div>-->
                                    <!--<tr>-->
                                        <!--<td class="tdRight">主诉:</td>-->
                                        <!--<td class="tdLeft"><Input  type="textarea" placeholder="Enter something..." class="other_parts"/></td>-->
                                    <!--</tr>-->
                                    <!--<tr>-->
                                        <!--<td class="tdRight">病史:</td>-->
                                        <!--<td class="tdLeft"><Input  type="textarea" placeholder="Enter something..." class="other_parts"/></td>-->
                                    <!--</tr>-->
                                    <!--<tr>-->
                                        <!--<td class="tdRight">其他说名:</td>-->
                                        <!--<td class="tdLeft"><Input  type="textarea" placeholder="Enter something..." class="other_parts"/></td>-->
                                    <!--</tr>-->
                                    <!--<tr>-->
                                        <!--<td class="tdRight">附件:</td>-->
                                        <!--<td class="tdLeft"><div  class="otherMore" ></div></td>-->
                                    <!--</tr>-->
                                <!--</div>-->
                                <!--<div style="text-align: center;margin-top: 20px;width: 100%">-->
                                    <!--<Button type="primary" >返回</Button>-->
                                <!--</div>-->
                            <!--</Card>-->

                        <!--</TabPane>-->
                        <TabPane label="报告单">
                            <div class="reportListBG" >
                                <div style="font-size: 16px;font-weight: 400;margin: 10px" id="hospital">西安交通大学第一附属医院</div>
                                <div style="font-size: 14px;font-weight: 400;margin: 10px" id="equipment">CT检查报告单</div>
                                <div>
                                    <span style="width: 50%;height: 40px;float: left;text-align: left" id="checkTime"></span>
                                    <span style="width: 50%;height: 40px;float: left;text-align: left" id="patientID"></span> 
                                </div>
                                <div>
                                    <span style="width: 100%;height: 40px;float: left;text-align: left" id="checkID"></span>
                                </div>
                                <div class="line"></div>
                                <div>
                                    <span style="width: 33%;height: 40px;float: left;text-align: left" id="name"></span>
                                    <span style="width: 34%;height: 40px;float: left;text-align: left" id="sex"></span>
                                    <span style="width: 33%;height: 40px;float: left;text-align: left" id="age"></span>
                                </div>
                                <div style="clear: both;width: 100%;height: 40px;text-align: left" id="checkItem"></div>
                                <Checkbox v-model="single" style="clear: both;width: 100%;height: 30px;text-align: left" disabled>增强</Checkbox>
                                <div class="line"></div>
                                <div style="clear: both;width: 100%;line-height: 50px;text-align: left">影像所见</div>
                                <div style="clear: both;width: 90%;line-height: 30px;margin-left: 5%; text-align: left;min-height: 100px" id="finding"></div>
                                <div style="clear: both;width: 100%;line-height: 50px;text-align: left">诊断意见</div>
                                <div style="clear: both;width: 90%;line-height: 30px;margin-left: 5%; text-align: left;min-height: 100px" id="impression" ></div>
                                <div class="line"></div>
                                <div >
                                    <Checkbox v-model="singleBg" style="height: 40px;float: right;" disabled>阳性</Checkbox>
                                </div>
                                <div style="clear: both">
                                    <span style="width: 40%;height: 40px;float: left;text-align: left" id="reportTime"></span>
                                    <span style="width: 30%;height: 40px;float: left;text-align: left" id="reportDoctor">诊断医师: 叶丽仪</span>
                                    <span style="width: 30%;height: 40px;float: left;text-align: left" id="auditDoctor">审核医师: 王一刀</span>
                                </div>
                                <div style="clear: both">
                                    此报告仅供本院临床医生参考
                                </div>
                               
                            </div>
                        </TabPane>
                        <!--<TabPane label="影像浏览">影像浏览</TabPane>-->
                    </Tabs>
                      <div style="display:flex;">
                            <Button @click="exportContent" type="primary">导出Word文档</Button>
                            <Button @click="exportPrint" type="warning" style="margin-left:30px;">在线打印</Button>
                      </div>
                </Content>
            </div>
        </Layout>
    </div>
</template>
<script>
    export default{
        data () {
            return {
                single: '',
                singleBg: '',
            }
        },
        methods:{
            getReportInformation(){
                var self = this;
                const getPersonInformation={
                    url:'/ids-server/user/v1/report/?iraId='+self.$route.params.id,
                    method:'get'
                };
                self.http(getPersonInformation).then((res)=>{
                    var self = this;

                    if (res.data.code === 1)
                    {
                        console.log(res.data.data)
                       // $("#name").text("姓名");

                        document.getElementById("name").innerHTML = "姓名:"+res.data.data.name;


                        if(res.data.data.gender == 1)
                        {
                            document.getElementById('sex').innerHTML =  "性别:  "+'男'
                        }else if(res.data.data.gender == 2)
                        {
                            document.getElementById('sex').innerHTML =  "性别:  "+'女'
                        }else
                        {
                            document.getElementById('sex').innerHTML=  "性别:  "+'未知'
                        }
                        if(res.data.data.ageUnit ==1)
                        {
                            document.getElementById('age').innerHTML ="年龄:  "+ res.data.data.age +'岁'
                        }else if(res.data.data.ageUnit ==2)
                        {
                            document.getElementById('age').innerHTML ="年龄:  "+  res.data.data.age +'月'
                        }else if(res.data.data.ageUnit ==3)
                        {
                            document.getElementById('age').innerHTML ="年龄:  "+  res.data.data.age +'天'
                        }else if(res.data.data.ageUnit ==4)
                        {
                            document.getElementById('age').innerHTML ="年龄:  "+  res.data.data.age +'时'
                        }

                        document.getElementById('checkTime').innerHTML  ="检查日期:  "+ self.timestampToTime(res.data.data.examTime)
                        document.getElementById("patientID").innerHTML = "ID:  "+res.data.data.patientId
                        document.getElementById("checkID").innerHTML = "检查号:  "+res.data.data.examNo


                        var checkList =  res.data.data.itemList;
                        document.getElementById("equipment").innerHTML=checkList[0].emy_name+'检查报告单';
                        var checkItemName;
                        for(var i = 0;i<checkList.length;i++)
                        {
                            if(i==0)
                            {
                                checkItemName = checkList[i].ep_name+"("+checkList[i].em_name+")"
                            }else
                            {
                                checkItemName = checkItemName +"/"+ checkList[i].ep_name+"("+checkList[i].em_name+")"
                            }
                        }
                        document.getElementById("checkItem").innerHTML="检查项目:  "+ checkItemName
                        if(checkList[0].is_enhance == 2)
                        {
                            self.single = true;
                        }else
                        {
                            self.single = false;
                        }
                        document.getElementById("finding").innerHTML = res.data.data.findings
                        document.getElementById("impression").innerHTML = res.data.data.impression

                        if(res.data.data.reportTime == 0)
                        {
                            document.getElementById("reportTime").innerHTML = "报告时间:  "+''
                        }else
                        {
                            document.getElementById("reportTime").innerHTML = "报告时间:  "+ self.timestampToTime(res.data.data.reportTime)
                        }
                        document.getElementById("reportDoctor").innerHTML = "诊断医生:  "+ res.data.data.reportDoctor
                        document.getElementById("auditDoctor").innerHTML = "审核医生:  "+ res.data.data.auditDoctor

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
            exportContent(){  
            var fileName = typeof fileName !== 'undefined' ? fileName : "检查报告";            
            var staticStyle = {                
                mhtml: {                    
                    top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location                        
                        .href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
                    head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n",
                    body: "<body>_body_</body>"                
                }            
            };            
            var options = {                
                maxWidth: 624            
            };            
            var markup = $('#pageContent').clone();            
            markup.each(function () {                
                var self = $(this);                
                if (self.is(':hidden'))self.remove();            
            });            
            var images = Array();            
            var img = markup.find('img');            
            for (var i = 0; i < img.length; i++) {                
                var w = Math.min(img[i].width, options.maxWidth);                
                var h = img[i].height * (w / img[i].width);                
                var canvas = document.createElement("CANVAS");                
                canvas.width = w;                
                canvas.height = h;                
                var context = canvas.getContext('2d');                
                context.drawImage(img[i], 0, 0, w, h);                
                var uri = canvas.toDataURL("image/png");                
                $(img[i]).attr("src", img[i].src);                
                img[i].width = w;                
                img[i].height = h;                
                images[i] = {                    
                    type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
                    encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
                    location: $(img[i]).attr("src"),
                    data: uri.substring(uri.indexOf(",") + 1)                
                };            
            }            
            var mhtmlBottom = "\n";            
            for (var i = 0; i < images.length; i++) {                
                mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";                
                mhtmlBottom += "Content-Location: " + images[i].location + "\n";                
                mhtmlBottom += "Content-Type: " + images[i].type + "\n";                
                mhtmlBottom += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";                
                mhtmlBottom += images[i].data + "\n\n";            
            }            
            mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";            
            var styles ='.tdRight{text-align:right;padding:10px;}.tdLeft{text-align:left;padding:10px;}.inputStyle{width:150px;}.s_parts .ivu-input{background-color:@default-input-bg;border:none;border-radius:0;}.other_parts  textarea.ivu-input{background-color:@default-input-bg;border:none;border-radius:0;height:100px;width:700px;}.date  .ivu-input{background-color:@default-input-bg;width:150px;}.ivu-select-selection{background-color:@default-input-bg;}.reportListBG{width:600px;margin-left:auto;margin-right:auto;margin-top:30px;padding:40px;text-align:center;border-width:1px;border-color:black;border-style:solid;background-color:white;}.line{width:100%;height:1px;background-color:grey;margin-top:15px;margin-bottom:10px;clear:both}.ivu-tabs-nav-scroll{background-color:white;}.otherMore{width:120px;height:120px;background:url(../../assets/logo.png) no-repeat center;background-size:100%;}';
            var fileContent = staticStyle.mhtml.top.replace("_html_", staticStyle.mhtml.head.replace("_styles_", styles) + 
            staticStyle.mhtml.body.replace("_body_", markup.html())) + mhtmlBottom;            
            var blob = new Blob([fileContent], {                
                type: "application/msword;charset=utf-8"            
            });            
              saveAs(blob, fileName + ".doc");          
            },
            exportPrint(){
                window.print()
                //window.document.body.innerHTML = $('.reportListBG');
            }
                                
       },
        mounted() {

            var self = this;
            self.getReportInformation();

        },
    }

</script>
<style lang="less">
    .tdRight
    {
        text-align: right;
        padding: 10px;
    }
    .tdLeft
    {
        text-align: left;
        padding: 10px;
    }
    .inputStyle
    {
        width: 150px;
    }
    .s_parts .ivu-input
    {
        background-color:@default-input-bg;
        border: none;
        border-radius:0;
    }
    .other_parts  textarea.ivu-input
    {
        background-color:@default-input-bg;
        border: none;
        border-radius:0;
        height: 100px;
        width: 700px;
    }
    .date  .ivu-input
    {
        background-color:@default-input-bg;
        width: 150px;
    }
    .ivu-select-selection {
        background-color: @default-input-bg;
    }
    .reportListBG
    {
        width: 600px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 30px;
        padding: 40px;
        text-align: center;
        border-width: 1px;
        border-color: black;
        border-style: solid;
        background-color: white;
    }
    .line
    {
        width: 100%;
        height: 1px;
        background-color: grey;
        margin-top: 15px;
        margin-bottom: 10px;
        clear:both
    }
    .ivu-tabs-nav-scroll
    {
        background-color: white;
    }
    .otherMore
    {
        width: 120px;
        height: 120px;
        background: url(../../assets/logo.png) no-repeat center;
        background-size:100%;
    }
</style>