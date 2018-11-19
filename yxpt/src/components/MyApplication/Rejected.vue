<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <div style="">
                <Content style="padding: 20px">
                    <Tabs :animated="false" class="default-body-bg">
                        <TabPane label="申请单">

                            <Card style="margin-top: 10px">
                                <div style="width: 100%">
                                    <!--<div style="height: 20px;margin-top: 10px;float: left;width: 5px;margin-right: 10px;" class="defaultBg"></div>-->
                                    <div style="line-height: 40px;font-size: 14px;">患者信息</div>

                                    <div style="margin-top: 10px">
                                        <table width="100%" class="CSSearchTbl" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td class="tdRight">姓名:</td>
                                                <td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>
                                                <td class="tdRight">性别:</td>
                                                <td class="tdLeft">
                                                    <Select v-model="selSex" style="width:150px">
                                                        <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label}}</Option>
                                                    </Select>
                                                </td>
                                                <td class="tdRight">年龄:</td>
                                                <td class="tdLeft">
                                                    <Select v-model="selAge" style="width:90px">
                                                        <Option v-for="item in ageList" :value="item.value" :key="item.value">{{ item.label}}</Option>
                                                    </Select>
                                                    <Select v-model="selTimeType" style="width:60px">
                                                        <Option v-for="item in timeTypeList" :value="item.value" :key="item.value">{{ item.label}}</Option>
                                                    </Select>
                                                </td>
                                                <td class="tdRight">门诊号:</td>
                                                <td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>
                                                <td class="tdRight">住院号:</td>
                                                <td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>
                                            </tr>
                                            <tr>
                                                <td class="tdRight">床位号:</td>
                                                <td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>
                                                <td class="tdRight">科室:</td>
                                                <td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>
                                                <td class="tdRight">患者来源:</td>
                                                <td class="tdLeft">
                                                    <Select v-model="selSource" style="width:150px">
                                                        <Option v-for="item in sourceList" :value="item.value" :key="item.value">{{ item.label}}</Option>
                                                    </Select>
                                                </td>
                                                <td class="tdRight">是否急诊:</td>
                                                <td class="tdLeft">
                                                    <Select v-model="selIsEmergency" style="width:150px">
                                                        <Option v-for="item in isEmergencyList" :value="item.value" :key="item.value">{{ item.label}}</Option>
                                                    </Select>
                                                </td>
                                                <td class="tdRight">检查日期:</td>
                                                <td class="tdLeft">
                                                    <Col span="12">
                                                    <DatePicker type="date" placeholder="Select date" class="date" ></DatePicker>
                                                    </Col>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="tdRight">身高:</td>
                                                <td class="tdLeft"><i-input class="s_parts" style="width: 120px"></i-input><span>&nbsp&nbspcm</span></td>
                                                <td class="tdRight">体重:</td>
                                                <td class="tdLeft"><i-input class="s_parts" style="width: 120px"></i-input><span>&nbsp&nbspkg</span></td>
                                                <td class="tdRight">婚姻状况:</td>
                                                <td class="tdLeft">
                                                    <Select v-model="selMarriage" style="width:150px">
                                                        <Option v-for="item in marriageList" :value="item.value" :key="item.value">{{ item.label}}</Option>
                                                    </Select>
                                                </td>
                                                <td class="tdRight">联系方式:</td>
                                                <td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>
                                            </tr>
                                        </table>
                                    </div>

                                </div>
                            </Card >
                            <Card style="margin-top: 10px">
                                <div style="width: 100%;">
                                    <!--<div style="height: 20px;margin-top: 10px;float: left;width: 5px;margin-right: 10px;" class="defaultBg"></div>-->
                                    <div style="line-height: 40px;font-size: 14px;">检查信息</div>

                                    <div style="margin-top: 10px">
                                        <table width="100%" class="CSSearchTbl" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td class="tdRight">检查类型:</td>
                                                <td class="tdLeft">
                                                    <Select v-model="selCheckType" style="width:150px">
                                                        <Option v-for="item in checkTypeList" :value="item.value" :key="item.value">{{ item.label}}</Option>
                                                    </Select>
                                                </td>
                                                <td class="tdRight">检查部位:</td>
                                                <td class="tdLeft">
                                                    <Select v-model="selCheckBody" style="width:150px">
                                                        <Option v-for="item in checkBodyList" :value="item.value" :key="item.value">{{ item.label}}</Option>
                                                    </Select>
                                                </td>
                                                <td class="tdRight">检查项目:</td>
                                                <td class="tdLeft">
                                                    <Select v-model="selCheckItem" style="width:150px">
                                                        <Option v-for="item in checkItemList" :value="item.value" :key="item.value">{{ item.label}}</Option>
                                                    </Select>
                                                </td>
                                                <td class="tdRight">是否增强:</td>
                                                <td class="tdLeft">
                                                    <Select v-model="selIsBigger" style="width:150px">
                                                        <Option v-for="item in isBiggerList" :value="item.value" :key="item.value">{{ item.label}}</Option>
                                                    </Select>
                                                </td>
                                                <td class="tdRight">发起医师:</td>
                                                <td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>
                                            </tr>

                                            <tr>
                                                <td class="tdRight">技师:</td>
                                                <td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>
                                                <td class="tdRight">检查号:</td>
                                                <td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>
                                                <td class="tdRight">影像号:</td>
                                                <td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>
                                            </tr>

                                        </table>
                                    </div>

                                </div>
                            </Card>
                            <Card style="margin-top: 10px">
                                <div style="width: 100%;">
                                    <!--<div style="height: 20px;margin-top: 10px;float: left;width: 5px;margin-right: 10px;" class="defaultBg"></div>-->
                                    <div style="line-height: 40px;font-size: 14px;">其他信息</div>
                                    <tr>
                                        <td class="tdRight">主诉:</td>
                                        <td class="tdLeft"><Input  type="textarea" placeholder="Enter something..." class="other_parts"/></td>
                                    </tr>
                                    <tr>
                                        <td class="tdRight">病史:</td>
                                        <td class="tdLeft"><Input  type="textarea" placeholder="Enter something..." class="other_parts"/></td>
                                    </tr>
                                    <tr>
                                        <td class="tdRight">其他说名:</td>
                                        <td class="tdLeft"><Input  type="textarea" placeholder="Enter something..." class="other_parts"/></td>
                                    </tr>
                                    <tr>
                                        <td class="tdRight">附件:</td>
                                        <td class="tdLeft"><div  class="otherMore" ></div></td>
                                    </tr>
                                    <tr>
                                        <td class="tdRight" style="color: red">驳回原因:</td>
                                        <td class="tdLeft"><Input  style="color: red;" type="textarea" placeholder="Enter something..." class="other_parts"/></td>
                                    </tr>
                                    <div style="text-align: center;margin-top: 20px;width: 100%">
                                        <td class="tdRight">驳回医生:</td>
                                        <td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>
                                        <td class="tdRight">驳回时间:</td>
                                        <td class="tdLeft"><i-input class="inputStyle s_parts"></i-input></td>
                                    </div>

                                </div>
                                <div style="text-align: center;margin-top: 20px;width: 100%">
                                    <Button type="primary" >重新申请</Button>
                                    <Button type="primary" >返回</Button>
                                </div>
                            </Card>

                        </TabPane>

                        <TabPane label="影像浏览">影像浏览</TabPane>
                    </Tabs>
                </Content>
            </div>
        </Layout>
    </div>
</template>
<script>
    export default{
        data () {
            return {

            }
        },
        methods:{

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