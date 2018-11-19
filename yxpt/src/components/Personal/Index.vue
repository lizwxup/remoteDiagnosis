<template>
    <div class="layout">
                <card>
                    <Tabs :animated="false" @on-click="messageNotice">
                        <TabPane label="我的资料">
                            <!--我的资料-->

                            <div id="myInformationContent"  style="height: 450px;display: block">
                                <div style="float: left;width:270px;margin-top: 20px">
                                    <div style="margin-top: 10px">
                                        <div class="inputName ">手机号:&nbsp&nbsp</div>
                                        <i-input v-model ="phoneNumber" disabled="disabled" class="s_parts"    placeholder="" style="width: 200px;"></i-input>
                                    </div>
                                    <div style="margin-top: 10px">
                                        <div class="inputName">姓名:&nbsp&nbsp</div>
                                        <i-input v-model ="userName" disabled="disabled" placeholder=""  class="s_parts" style="width: 200px;"></i-input>
                                    </div>
                                    <div style="margin-top: 10px">
                                        <div class="inputName">医院:&nbsp&nbsp</div>
                                        <i-input v-model="hospital" disabled="disabled" placeholder=""  class="s_parts" style="width: 200px;"></i-input>
                                    </div>
                                    <div style="margin-top: 10px">
                                        <div class="inputName">科室:&nbsp&nbsp</div>
                                        <i-input v-model="departmentText" disabled="disabled" placeholder=""  class="s_parts" style="width: 200px;"></i-input>
                                    </div>
                                    <div style="margin-top: 10px">
                                        <div class="inputName">职称:&nbsp&nbsp</div>
                                        <i-input v-model="titleText" disabled="disabled" placeholder=""  class="s_parts" style="width: 200px;"></i-input>
                                    </div>
                                    <div style="margin-top: 10px">
                                        <div class="inputName">擅长部位:&nbsp&nbsp</div>
                                        <i-input v-model="bodyText" disabled="disabled" placeholder=""  class="s_parts" style="width: 200px;"></i-input>
                                    </div>
                                    <div style="margin-top: 10px">
                                        <div class="inputName">擅长设备:&nbsp&nbsp</div>
                                        <i-input v-model="equipmentText" disabled="disabled" placeholder=""  class="s_parts" style="width: 200px;"></i-input>
                                    </div>
                                </div>
                                <div style="margin-left: 120px;width:400px;float: left;height: 400px;margin-top: 20px">
                                    <div style="margin-top: 10px;margin-bottom: 15px;">
                                        <div class="inputName" style="text-align: right;float: left">头像:&nbsp&nbsp</div>
                                        <div style="width:100px;height:100px;">
                                             <div class="userImgBg" id="userImage">
                                            </div>
                                        </div>
                                       
                                    </div>
                                    <div style="margin-top: 20px">
                                        <div class="inputName" style="text-align: right">个人简介:&nbsp&nbsp</div>
                                        <i-input v-model = "personIntroduceText" disabled="disabled" type="textarea" :maxlength = "100"  style="width: 260px;" @on-change="personIntroduce"></i-input>
                                    </div>

                                    <div style="margin-top: 30px">
                                        <div class="inputName" style="text-align: right">备注:&nbsp&nbsp</div>
                                        <i-input v-model = "moreOtherText" disabled="disabled" type="textarea" :maxlength = "100"  style="width: 260px;" @on-change="moreOther"></i-input>
                                    </div>
                                    <div style="margin-top: 30px">
                                        <Button type="primary" style="margin-left: 260px" @click="editPersonInformation">编辑</Button>
                                    </div>
                                </div>
                            </div>

                            <div id="myInformationContentt"  style="height: 450px;display: none">
                                <div style="float: left;width:270px;margin-top: 20px">
                                    <div style="margin-top: 10px">
                                        <div class="inputName ">手机号:&nbsp&nbsp</div>
                                        <i-input v-model ="phoneNumber" disabled="disabled" class="s_parts"   placeholder="" style="width: 200px;"></i-input>
                                    </div>
                                    <div style="margin-top: 10px">
                                        <div class="inputName">姓名:&nbsp&nbsp</div>
                                        <i-input v-model ="userName" placeholder=""  class="s_partss" style="width: 200px;">李漫长</i-input>
                                    </div>
                                    <div style="margin-top: 10px">
                                        <div class="inputName">医院:&nbsp&nbsp</div>
                                        <i-input v-model ="hospital" placeholder=""  class="s_partss" style="width: 200px;">李漫长</i-input>
                                    </div>
                                    <div style="margin-top: 10px">
                                        <div class="inputName">科室:&nbsp&nbsp</div>
                                        <Select v-model="selDepartment" style="width:200px">
                                            <Option v-for="item in departmentList" :value="item.udtId" :key="item.udtId">{{ item.name}}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin-top: 10px">
                                        <div class="inputName">职称:&nbsp&nbsp</div>
                                        <Select v-model="selTitle" style="width:200px">
                                            <Option v-for="item in titleList" :value="item.uttId" :key="item.uttId">{{ item.name}}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin-top: 10px">
                                        <div class="inputName">擅长部位:&nbsp&nbsp</div>
                                        <Select v-model="selBody" style="width:200px" >
                                            <Option v-for="item in bodyList" :value="item.id" :key="item.id">{{ item.name}}</Option>
                                        </Select>
                                    </div>
                                    <div style="margin-top: 10px">
                                        <div class="inputName">擅长设备:&nbsp&nbsp</div>
                                        <Select v-model="selEquipment" style="width:200px">
                                            <Option v-for="item in equipmentList" :value="item.id" :key="item.id">{{ item.name}}</Option>
                                        </Select>
                                    </div>
                                </div>
                                <div style="margin-left: 120px;width:400px;float: left;height: 400px;margin-top: 20px">
                                   <!-- <Upload action="//jsonplaceholder.typicode.com/posts/"> -->
                                        <div style="margin-top: 10px;margin-bottom: 15px;">
                                            <div class="inputName" style="text-align: right;float: left">头像:&nbsp&nbsp</div>
                                            <div style="width:100px;height:100px">
                                                 <div class="userImgBg" id="userImagee">
                                                <div class="userImg" @click="modifyAvatar">修改头像</div>
                                            </div>
                                            </div>
                                           
                                            <my-upload url="http://49.4.9.162:8080/ums-server/user/v1/avatar" 
                                                img-format="jpg"
                                                :width="400"
                                                :height="300"
                                                 field="avatar"
                                                 key="0"
                                                :no-rotate="false"
                                                :value.sync="show1"
                                                v-on:cropUploadSuccess ="UploadSuccess"
                                                v-on:getValue='getvalueMsg'
                                                v-on:cropSuccess="cropSuccess">
                                            </my-upload>
                                        </div>
                                   <!-- </Upload> -->
                                    <div style="margin-top: 10px">
                                        <div class="inputName" style="text-align: right">个人简介:&nbsp&nbsp</div>
                                        <i-input v-model = "personIntroduceText" type="textarea" :maxlength = "100" placeholder="请输入..." style="width: 260px;" @on-change="personIntroduce"></i-input>
                                        <div style="width:320px;line-height:30px;text-align:right;" id="personIntroduceNumberr">0/100</div>
                                    </div>
                                    <div style="margin-top: 10px">
                                        <div class="inputName" style="text-align: right">备注:&nbsp&nbsp</div>
                                        <i-input v-model = "moreOtherText" type="textarea" :maxlength = "100" placeholder="请输入..." style="width: 260px;" @on-change="moreOther"></i-input>
                                        <div style="width:320px;line-height:30px;text-align:right;" id="moreOtherNumberr">0/100</div>
                                    </div>
                                    <div style="margin-top: 10px">
                                        <Button type="warning" style="margin-left: 180px;float: left" @click="cancleEdit">取消</Button>
                                        <Button type="primary" style="margin-left: 30px;float: left" @click="editDone">完成</Button>
                                    </div>
                                </div>
                            </div>

                        </TabPane>
                        <TabPane label="修改密码">
                            <!--修改密码-->
                            <div id="changePwContent" style="height: 450px">
                                <div style="margin-top: 10px">
                                    <div  class="inputName" style="width: 80px;">旧密码:&nbsp&nbsp</div>
                                    <i-input type="password" v-model ="password" placeholder=""  class="s_partss"  style="width: 200px;background-color: darkgray;float: left"></i-input>
                                    <!--<span class="inputName" style="color: red;width: 200px;">&nbsp&nbsp旧密码输入不正确</span>-->
                                </div>
                                <div style="clear: both;padding-top: 10px">
                                    <div class="inputName" style="width: 80px;">新密码:&nbsp&nbsp</div>
                                    <i-input type="password" v-model ="newPW" placeholder=""  class="s_partss"  style="width: 200px;background-color: darkgray"></i-input>
                                </div>
                                <div style="margin-top: 10px">
                                    <div class="inputName" style="width: 80px;">确认新密码:&nbsp&nbsp</div>
                                    <i-input type="password" v-model ="newPWAgain" placeholder=""  class="s_partss"  style="width: 200px;background-color: darkgray;float: left"></i-input>
                                    <!--<span class="inputName" style="color: red;width: 200px;">&nbsp&nbsp两次输入不一致</span>-->
                                </div>
                                <div style="clear: both"></div>
                                <Button type="primary" style="margin-left: 150px;margin-top: 30px" @click="changePW">提交</Button>
                            </div>
                        </TabPane>
                       <!-- <TabPane  label="消息通知" >
                            <!--消息通知
                            <div id="messageNoticeContent" style="height: 450px;">
                                <!--消息列表
                                <div id="messageNoticeList" style="display: block">
                                    <div @click= "messageNoticeListItem()" style="height: 40px;">
                                        <div style="float: left;width: 8px;height: 8px;background-color: red;border-radius: 8px;margin-top:14px;margin-right: 5px"></div>
                                        <div style="float: left;line-height:40px">您有一份待诊断报告</div>
                                        <Button type="error" size="small" style="float: right;margin-top: 6px">删除</Button>
                                        <div style="float: right;line-height: 40px;margin-right: 10px">2018-02-04</div>
                                    </div>
                                    <div @click= "messageNoticeListItem()" style="height: 40px;">
                                        <div style="float: left;width: 8px;height: 8px;background-color: white;border-radius: 8px;margin-top:14px;margin-right: 5px"></div>
                                        <div style="float: left;line-height:40px">您有一份待诊断报告</div>
                                        <Button type="error" size="small" style="float: right;margin-top: 6px">删除</Button>
                                        <div style="float: right;line-height: 40px;margin-right: 10px">2018-02-04</div>
                                    </div>
                                    <Page :total="1000" :current="2" @on-change="pageChange" style="position: fixed;bottom:150px;width: 100%;text-align: center;margin-left: -150px"></Page>
                                </div>
                                <!--消息详情
                                <div id="messageNoticeDetail" style="display: none">
                                    <div style="font-size: 14px;color: black;line-height: 40px">转诊通知</div>
                                    <div style="font-size: 12px;color: darkgray;line-height: 30px">2018-09-18&nbsp&nbsp&nbsp&nbsp13:25</div>
                                    <textarea style="width: 100%;height: 360px;padding: 10px;" readonly="readonly">这是一份被转诊报告</textarea>
                                </div>
                            </div>
                        </TabPane>-->
                    </Tabs>
                </card>
    </div>
</template>

<script>
    import ApiSetting from '../../utils/api.js'
    import MyUpload from './upload'
    export default{
        data () {
            return {
                show1: false,
                avatarUrl1: null,
                avatarUrl2: null,
                avatarUrl3: null,
               // otherParams: "avatar",
                phoneNumber: '',
                userName:'',
                hospital: '',
                departmentList: [
                ],
                selDepartment: '',
                departmentText:'',
                titleList: [
                ],
                selTitle: '',
                titleText:'',
                bodyList: [
                ],
                selBody: '',
                bodyText:'',
                equipmentList: [

                ],
                selEquipment: '',
                equipmentText:'',
                personIntroduceText:'',
                moreOtherText:'',
                password:'',
                newPW:'',
                newPWAgain:'',
                userAvatar:'',
                getPublicKey:'',
            }
        },
    methods:{
    //切换用户图片
        cropSuccess(data, field, key) {
			if (field == 'avatar1') {
				this.avatarUrl1 = data;
			} else {
				this.avatarUrl3 = data;
			}
            document.getElementById("userImage").style.background = "url("+data+") "
            document.getElementById("userImagee").style.background = "url("+data+")";
            document.getElementById("userImagee").style.backgroundSize= "100% 100%";
            document.getElementById("userImage").style.backgroundSize= "100% 100%";
		},
        getvalueMsg(data){
            this.show1 = false
        },
		UploadSuccess(data, field, key) {
            self.userAvatar  = data.data.avatar
            document.getElementById("userImage").style.background = "url("+data.data.avatar+")"
            document.getElementById("userImagee").style.background = "url("+data.data.avatar+")";
            document.getElementById("userImagee").style.backgroundSize= "100% 100%";
            document.getElementById("userImage").style.backgroundSize= "100% 100%";
		},
		cropUploadFail(status, field, key) {
                this.$Message.warning('上传失败')
		},
        modifyAvatar (){
            let {show1} = this;
			this.show1 = !show1;
        },
        messageNotice(name) {
            if(name == 2){
                document.getElementById("messageNoticeList").style.display="block";
                document.getElementById("messageNoticeDetail").style.display="none";
            }
        },
        messageNoticeListItem()
        {
            document.getElementById("messageNoticeList").style.display="none";
            document.getElementById("messageNoticeDetail").style.display="block";
        },
//        编辑个人简介字数控制
        personIntroduce(){
            document.getElementById('personIntroduceNumberr').innerHTML = this.personIntroduceText.length + '/100';

        },
//        编辑个人更多字数控制
        moreOther(){
            document.getElementById('moreOtherNumberr').innerHTML = this.moreOtherText.length + '/100';
        },
//         页码变化
        pageChange(page){
            console.log(page);
        },
//        编辑个人信息
        editPersonInformation()
        {
            document.getElementById("myInformationContent").style.display="none";
            document.getElementById("myInformationContentt").style.display="block";

            var self = this;

            //获取科室列表
            const getDeptInformation={
                    url:'/ums-server/user/v1/depts',
                    method:'get',
                    data:{
                    }
            };
            self.http(getDeptInformation).then((res)=>{


                if (res.data.code === 1)
                {
                    self.departmentList = res.data.data;
                } else {

                    this.$Message.error(res.data.msg);

                }
            },(error)=>{
                console.log(error)
            });

//            获取职称列表
            const getTitleInformation={
                url:'/ums-server/user/v1/titles',
                method:'get',
                data:{
                }
            };
            self.http(getTitleInformation).then((res)=>{


                if (res.data.code === 1)
                {
                    self.titleList = res.data.data;
                } else {

                    this.$Message.error(res.data.msg);

                }
            },(error)=>{
                console.log(error)
            });

//          获取部位列表
            const getPartInformation={
                url:'/eds-server/v1/dict/exam/part',
                method:'get',
                data:{
                }
            };
            self.http(getPartInformation).then((res)=>{


                if (res.data.code === 1)
                {
                    self.bodyList = res.data.data;
                } else {

                    this.$Message.error(res.data.msg);

                }
            },(error)=>{
                console.log(error)
            });

//          获取设备列表
            const getEqipmentInformation={
                url:'/eds-server/v1/dict/exam/modality',
                method:'get',
                data:{
                }
            };
            self.http(getEqipmentInformation).then((res)=>{
                if (res.data.code === 1)
                {
                    self.equipmentList = res.data.data;
                } else {

                    this.$Message.error(res.data.msg);

                }
            },(error)=>{
                console.log(error)
            });
        },
//        个人信息编辑完成
        editDone()
        {
               var self = this;
                if(this.userName == '')
                {
                    self.$Message.warning('请填写姓名');
                }else if(this.hospital == '')
                {
                    self.$Message.warning('请填写医院名称');
                }else if(this.selDepartment == '')
                {
                    self.$Message.warning('请选择科室');
                }else if(this.selTitle == '')
                {
                    self.$Message.warning('请选择职称');
                }else if(this.selBody == '')
                {
                    self.$Message.warning('请选择擅长部位');
                }else if(this.selEquipment == '')
                {
                    self.$Message.warning('请选择擅长设备');
                }else{

                    const putEditDoneInformation={
                        //url:'/ums-server/user/v1/user/info?name='+this.userName,
                        url:"/ums-server/user/v1/user/info?name="+this.userName+
                                '&hospital='+this.hospital+
                                '&deptId='+this.selDepartment+'&titleId='+this.selTitle+'&partId='+ this.selBody +'&modalityId='+this.selEquipment+'&description='+ this.personIntroduceText +'&remark='+this.moreOtherText,
                        method:'put',
//                        data:{
//                            name: this.userName,
//                            hospital:this.hospital,
//                            deptId:this.selDepartment,
//                            titleId:this.selTitle,
//                            partId:this.selBody,
//                            modalityId:this.selEquipment,
//                            description:this.personIntroduceText,
//                            remark:this.moreOtherText,
//                        },
                    };
                    self.http(putEditDoneInformation).then((res)=>{
                        if (res.data.code === 1)
                        {   
                         
                            alert('编辑完成');
                            document.getElementById("myInformationContent").style.display="block";
                            document.getElementById("myInformationContentt").style.display="none";
                            var  emptyStr = "未填写";
                            if(res.data.data.phone == '')
                            {
                                self.phoneNumber = emptyStr;
                            }else
                            {
                                self.phoneNumber = res.data.data.phone;
                            }
                            if(res.data.data.name == '')
                            {
                                self.userName = emptyStr;
                            }else
                            {
                                self.userName = res.data.data.name;
                            }
                            if(res.data.data.hospital == '')
                            {
                                self.hospital = emptyStr;
                            }else
                            {
                                self.hospital = res.data.data.hospital;
                            }
                            if(res.data.data.deptName == '')
                            {
                                self.departmentText = emptyStr;
                            }else
                            {
                                self.selDepartment =  res.data.data.deptId;
                                self.departmentText = res.data.data.deptName;
                            }
                            if(res.data.data.titleName == '')
                            {

                                self.titleText = emptyStr;

                            }else
                            {
                                self.titleText = res.data.data.titleName;
                                self.selTitle = res.data.data.titleId;
                            }
                            if(res.data.data.partName == '')
                            {
                                self.bodyText = emptyStr;
                            }else
                            {
                                self.bodyText = res.data.data.partName;
                                self.selBody = res.data.data.partId;

                            }
                            if(res.data.data.modalityName == '')
                            {
                                self.equipmentText = emptyStr;
                            }else
                            {
                                self.selEquipment = res.data.data.modalityId;
                                self.equipmentText =  res.data.data.modalityName;
                            }
                            if(res.data.data.description == '')
                            {
                                self.personIntroduceText = emptyStr;
                            }else
                            {
                                self.personIntroduceText = res.data.data.description;
                            }
                            if(res.data.data.remark == '')
                            {
                                self.moreOtherText = emptyStr;
                            }else
                            {
                                self.moreOtherText = res.data.data.remark;
                            }
                            if(res.data.data.avatar == '')
                            {
                                document.getElementById("userImage").style.background= "url(../../assets/logo.png) no-repeat center";
                                document.getElementById("userImagee").style.background= "url(../../assets/logo.png) no-repeat center";
                                document.getElementById("userImagee").style.backgroundSize= "100% 100%";
                                document.getElementById("userImage").style.backgroundSize= "100% 100%";


                            }else
                            {
                                
                                document.getElementById("userImage").style.background = "url("+res.data.data.avatar+")";
                                document.getElementById("userImagee").style.background = "url("+res.data.data.avatar+")";
                                document.getElementById("userImagee").style.backgroundSize= "100% 100%";
                                document.getElementById("userImage").style.backgroundSize= "100% 100%";
                            }

                        } else {

                            this.$Message.error(res.data.msg);

                        }
                    },(error)=>{
                        console.log(error)
                    });


                }
//            document.getElementById("myInformationContent").style.display="block";
//            document.getElementById("myInformationContentt").style.display="none";


        },
//        取消个人信息编辑
        cancleEdit()
        {
            var self = this;
            self.selDepartment = "";
            self.selTitle = "";
            self.selBody = "";
            self.selEquipment = "";
            self.getPersonInformation();

        },
//      获取个人信息
        getPersonInformation()
        {
            var self = this;
            const serviceModule = {
                getPersonInformation:{
                    url:'/ums-server/user/v1/user/info',
                    method:'get',
                    data:{
                    }
                }
            };
            self.http(serviceModule.getPersonInformation).then((res)=>{
                if (res.data.code === 1)
                {
                    document.getElementById("myInformationContent").style.display="block";
                    document.getElementById("myInformationContentt").style.display="none";
                    var  emptyStr = "未填写";
                    if(res.data.data.phone == '')
                    {
                        self.phoneNumber = emptyStr;
                    }else
                    {
                        self.phoneNumber = res.data.data.phone;
                    }
                    if(res.data.data.name == '')
                    {
                        self.userName = emptyStr;
                    }else
                    {
                        self.userName = res.data.data.name;
                    }
                    if(res.data.data.hospital == '')
                    {
                        self.hospital = emptyStr;
                    }else
                    {
                        self.hospital = res.data.data.hospital;
                    }
                    if(res.data.data.deptName == '')
                    {
                        self.departmentText = emptyStr;
                    }else
                    {
                        self.selDepartment =  res.data.data.deptId;
                        self.departmentText = res.data.data.deptName;
                    }
                    if(res.data.data.titleName == '')
                    {

                        self.titleText = emptyStr;

                    }else
                    {
                        self.titleText = res.data.data.titleName;
                        self.selTitle = res.data.data.titleId;
                    }
                    if(res.data.data.partName == '')
                    {
                        self.bodyText = emptyStr;
                    }else
                    {
                        self.bodyText = res.data.data.partName;
                        self.selBody = res.data.data.partId;

                    }
                    if(res.data.data.modalityName == '')
                    {
                        self.equipmentText = emptyStr;
                    }else
                    {
                        self.selEquipment = res.data.data.modalityId;
                        self.equipmentText =  res.data.data.modalityName;
                    }
                    if(res.data.data.description == '')
                    {
                        self.personIntroduceText = emptyStr;
                    }else
                    {
                        self.personIntroduceText = res.data.data.description;
                    }
                    if(res.data.data.remark == '')
                    {
                        self.moreOtherText = emptyStr;
                    }else
                    {
                        self.moreOtherText = res.data.data.remark;
                    }
                    if(res.data.data.avatar == '')
                    {
                        document.getElementById("userImage").style.background= "url(../../assets/logo.png) no-repeat center ";
                        document.getElementById("userImagee").style.background= "url(../../assets/logo.png) no-repeat center";
                        document.getElementById("userImagee").style.backgroundSize= "100% 100%";
                        document.getElementById("userImage").style.backgroundSize= "100% 100%";
                    }else
                    {
                        document.getElementById("userImage").style.background = "url("+res.data.data.avatar+")"
                        document.getElementById("userImagee").style.background = "url("+res.data.data.avatar+")";
                        document.getElementById("userImagee").style.backgroundSize= "100% 100%";
                        document.getElementById("userImage").style.backgroundSize= "100% 100%";
                    }
                } else {
                    this.$Message.error(res.data.msg);
                }
            },(error)=>{
                console.log(error)
            });
        },
        // 修改密码
        changePW(){
            var self = this ;
            if(self.password=='')
            {
                self.$Message.warning('请输入旧密码');
            }else if (self.newPW==''){
                self.$Message.warning('请输入新密码');
            }else if(self.newPWAgain==''){
                self.$Message.warning('请再次输入新密码');
            }else
            {
                if(self.newPW == self.newPWAgain)
                {
                    var encrypt = new JSEncrypt();
                    encrypt.setPublicKey(self.getPublicKey)
                    var oldpw = encrypt.encrypt(self.password);
                    var newpw = encrypt.encrypt(self.newPW);
                    const changepw={
                        url:'/ums-server/user/v1/user/pwd',
                        method:'put'
                    };
                    var params = {
                        oldPwd:oldpw,
                        newPwd:newpw
                    }
                    self.http(changepw).then((res)=>{
                        if (res.data.code === 1)
                        {
                          self.$Message.success('修改成功');
                          self.$router.push('/login')

                        } else {
                            this.$Message.error(res.data.msg);
                        }
                    },(error)=>{
                        console.log(error)
                    });
                }else
                {
                    this.$Message.warning('新密码两次输入不一致');
                }
            }
        },
    },

    mounted() {
        var self = this;
        self.getPersonInformation();


        //获取公钥
        var self = this
        self.http(ApiSetting.getLocation).then((res)=>{
            self.getPublicKey = res.data.data
        },(error)=>{
            console.log(error)
        })
    },
    components:{
        MyUpload
    }


}

</script>
<style lang="less">
    .inputName
    {
        line-height: 32px;
        font-size: 12px;
        float: left;
        width: 60px;
    }
    .s_parts .ivu-input
    {
        /*background-color:@default-input-bg;*/
        border: none;
        border-radius:0;
    }
    .s_partss .ivu-input
    {
        background-color:@default-input-bg;
        border: none;
        border-radius:0;
    }
    .ivu-select-selection {
        background-color: @default-input-bg;
    }
    .userImgBg
    {
        width:100%;
        height: 100%;
        border-radius: 50px;
        margin-left: 70px;
        background: url(../../assets/logo.png) no-repeat center;
        background-size : 100% 100%;

    }
    .userImg
    {
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        color: white;
        border-radius: 50px;

        background-color: rgba(237,245,254,0.2);
        font-size: 14px;
        font-weight: 200;
    }
    textarea.ivu-input {
        font-size: 12px;
        height:60px;
    }

</style>