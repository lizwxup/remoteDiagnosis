<template>
    <div>
     <el-table :data="indexTable"  border  
        @row-dblclick="handleSelectionMsg"  
        @row-click="handleSignal"
        :row-class-name="tableRowClassName">
        <el-table-column prop="ID" label="标识号" width="140" align='center'  height=10>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120" align='center'>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width='120' align='center'>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="120" align='center'>
        </el-table-column>
        <el-table-column prop="date" label="检查日期" width="120" align='center'>
        </el-table-column>
        <el-table-column prop="resource" label="患者来源" align='center'>
                <template slot-scope="scope">
                <div slot="reference" class="name-wrapper"  v-if = 'scope.row.resource === "急诊"'>
                    <el-tag size="medium" style="background:red;color:#fff;">{{ scope.row.resource }}</el-tag>
                </div>
                 <div slot="reference" class="name-wrapper"  v-if = 'scope.row.resource === "门诊"'>
                    <el-tag size="medium" style="background:rgba(255, 51, 102, 1);color:#fff;">{{ scope.row.resource }}</el-tag>
                </div>
                 <div slot="reference" class="name-wrapper"  v-if = 'scope.row.resource === "住院"'>
                    <el-tag size="medium" style="background:green;color:#fff;">{{ scope.row.resource }}</el-tag>
                </div>
            </template>
        </el-table-column>
            <el-table-column prop="type" label="检查类型" align='center'>
        </el-table-column>
            <el-table-column prop="part" label="检查部位" align='center'>
        </el-table-column>
            <el-table-column prop="status" label="报告状态" align='center'>
                <template slot-scope="scope">
                <div slot="reference" class="name-wrapper" v-if = 'scope.row.status === "待诊断"'>
                    <el-tag   size="medium" style="background:rgba(0, 153, 0, 1);color:#fff;">{{ scope.row.status }}</el-tag>
                </div>
                <div slot="reference" class="name-wrapper" v-if = 'scope.row.status === "待审核"'>
                    <el-tag   size="medium" style="background:red;color:#fff;">{{ scope.row.status }}</el-tag>
                </div>
                <div slot="reference" class="name-wrapper" v-if = 'scope.row.status === "已完成"'>
                    <el-tag   size="medium" style="background:blue;color:#fff;">{{ scope.row.status }}</el-tag>
                </div>
            </template>
        </el-table-column>
            <el-table-column prop="applyDate" label="申请日期" align='center'  sortable>
        </el-table-column>
            <el-table-column prop="hospital" label="医院" align='center'>
        </el-table-column>
        </el-table>
        <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="40"
         style="margin-top:30px"
        :current-page="currentPage4"
        :page-sizes="[50, 100, 150, 200]"
        :page-size="100">
        </el-pagination>
    </div>        
</template>
<script>
    export default {
        data () {
            return {
                currentPage4:1,
                currentSelectIndex:0,
                 indexTable:[{
                    ID: '12987121',
                    name: '王小虎',
                    sex: '女',
                    age: '13',
                    date: '2017-2-1',
                    resource:'门诊',
                    type:'cT',
                    part:'退部',
                    status:'待诊断',
                    applyDate:'2019-2-10',
                    hospital:'西京医院'
              },{
                    ID: '12987122',
                    name: '王小虎',
                    sex: '女',
                    age: '13',
                    date: '2017-2-1',
                    resource:'急诊',
                    type:'cT',
                    part:'退部',
                    status:'待审核',
                    applyDate:'2019-2-10',
                    hospital:'西京医院'
            },
            {
                    ID: '12987123',
                    name: '王小虎',
                    sex: '女',
                    age: '13',
                    date: '2017-2-1',
                    resource:'住院',
                    type:'cT',
                    part:'退部',
                    status:'已完成',
                    applyDate:'2019-2-10',
                    hospital:'西京医院'
            }]
            }
        },
        methods:{
            handleSelectionMsg (row, event, column) {
                var self = this
                self.$router.push({path:'/detail/'+row.ID})
            },
            tableRowClassName ({row,rowIndex}) {
                if (row.ID === this.currentSelectIndex) {
                     return 'warning-row';
                }
            },
            handleSignal(row, event, column){
                this.currentSelectIndex = row.ID

            }
        }
    }
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }
</style>