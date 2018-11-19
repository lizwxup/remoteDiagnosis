<template>
    <div>
        <el-container>
            <el-header style="height:65px;border-bottom: 1px solid #dfdfdf; margin-top:12px; box-shadow: 0px 1px 0px #ccc;">
                <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col :span="6" class="index-logo"><div class="grid-content bg-purple"><img :src="myurl" width="50%"></div></el-col>
                    <el-col :span="9"><div class="grid-content bg-purple-light"></div></el-col>
                    <el-col :span="3" style="display:flex">
                        <div class="grid-content bg-purple">
                            <el-badge :value="100" :max="10" class="item" style="margin-top:10px;">
                                 <i class="el-icon-bell"></i>
                            </el-badge>     
                        </div>
                        <div style="padding-top:10px;">
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                    <img :src="head" style="margin-right:10px;vertical-align:middle" width='30px'>lzlzl<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown" split-button>
                                    <el-dropdown-item><i class="el-icon-upload"></i>移动APP下载</el-dropdown-item>
                                    <el-dropdown-item><i class="el-icon-star-on"></i>我的用户中心</el-dropdown-item>
                                    <el-dropdown-item><i class="el-icon-setting">个人设置</i></el-dropdown-item>
                                    <el-dropdown-item divided><i class="el-icon-sold-out"></i>退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                           </el-dropdown>
                        </div>
                    </el-col>
               </el-row>
            </el-header>
            <el-container>
                 <Aside></Aside>
                <el-container>
                    <el-main>
                    <div class="index-main" style="display:flex;justify-content:space-around">
                    <div style="display:flex;line-height:32px;">
                         检索日期：
                        <el-date-picker
                            v-model="value7"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            size="small"
                            :picker-options="pickerOptions2"
                            >
                        </el-date-picker>
                        <div>
                            <el-tooltip class="item" effect="dark" content="刷新" placement="bottom-start"><i class="el-icon-refresh"></i></el-tooltip>
                            <el-tooltip class="item" effect="dark" content="过滤信息" placement="bottom-start"><i class="el-icon-d-caret" @click="dialogFormVisible = true"></i></el-tooltip>
                        </div>
                    </div>
                    <el-dialog title="按不同的过滤条件选择检查列表" :visible.sync="dialogFormVisible" style="color:#fff;">
                        <h3>按报告状态的筛选</h3>
                        <el-row>
                            <el-button round>未申请</el-button>
                            <el-button type="primary" round>已申请</el-button>
                            <el-button type="success" round>未审核</el-button>
                            <el-button type="info" round>已审核</el-button>
                            <el-button type="warning" round>已打印</el-button>
                            <el-button type="danger" round>全部</el-button>
                        </el-row>
                         <h3>按设备类型的筛选</h3>
                         <el-row>
                            <el-button round>CR</el-button>
                            <el-button type="primary" round>DR</el-button>
                            <el-button type="success" round>DX</el-button>
                            <el-button type="info" round>CT</el-button>
                            <el-button type="warning" round>MR</el-button>
                        </el-row>
                         <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                        </div>
                    </el-dialog>
                    <div>
                         <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select" size="small">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>    
                    </div>   
                   <Table></Table>
                  </el-main>
                    
                </el-container>
            </el-container>
            </el-container>
    </div>
</template>
<script>
import myurl from '../../../static/img/logo3.png'
import head from '../../../static/img/head.png'
import Aside from '../../components/Aside.vue'
import Table from '../../components/Table.vue'
    export default {
        data () {
           return {
            myurl,
            value7:'',
            radio:'',
            head,
            searchValue:'',
            dialogFormVisible: false,
            formLabelWidth: '100px',
            pickerOptions2: {
              shortcuts: [
                    {
                    text: '今天',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 );
                        picker.$emit('pick', [start, end]);
                    }
                },{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                },{
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24* 30);
                        picker.$emit('pick', [start, end]);
                    }
                }]
           }
          }
        },
        methods:{

        },
        mounted () {
             var self = this;
             self.$notify({
                    title: '温馨提示',
                    message: '您当前有'+18+'份报告未填写',
                    position: 'bottom-right',
                    type:'info',
                    duration: 0
           });
           console.log(window.localStorage.getItem('content'))
        },
        components:{
            Aside,
            Table
        }   
    }
</script>
<style lang="scss">
  $tablethbackground:#e6f7ff;
  $tablethColor:#676464;
  $fontColor:#23426b;
    .index-logo{
        text-align:left;
        font-size:18px;
        margin-left: 20px;
        div{
            margin-top:-22px;
        }
    }
    .el-container{
        padding-top:10px;
    }
    .index-top{
        height:90px;
        width:100%;
        border:1px solid green;
       
    }
    .el-table th{
        background:$tablethbackground;
        padding:0;
        color:$tablethColor;
    }
    h3{
        border-bottom:1px solid #ccc;
        line-height:40px;
        text-align:left;
    }
    .index-main{
        margin-bottom:20px;
        i.el-icon-refresh{
            margin-left:30px !important;
        }
        i.el-icon-refresh,.el-icon-d-caret{
            color: $fontColor;
            font-size: 24px;
            font-weight: bold;
            margin:4px 15px 0px;
        }
    }
    .el-notification__title,.el-notification .el-icon-info{
        color:$fontColor;
    }
    .el-icon-bell{
        font-size:30px;
        color: $fontColor;
    }
    .el-input-group__append{
        background:$fontColor;
        color:#fff;
        font-size:18px;
    }
    .el-icon-news{
        font-size:25px;
        margin-right:20px;
        color:$fontColor;
    }
    .el-dropdown-link{
        font-size:18px;
        margin-left:50px;
    }
    .el-dialog__header{
        background:$fontColor;
        span,.el-dialog__close,.el-dialog__headerbtn:hover .el-dialog__close{
            color:#fff;
        }
    }
    .el-button.is-round{
        padding:12px 18px;
    }
</style>