<template>
   <div>
        <Spin fix v-if="spinShow">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
            <Table :columns="columns"  
                :data="columsData"
                :stripe = 'false'
                :border = 'false'
                @on-row-click = "handleSignal"
                @on-row-dblclick = "handleSelectionMsg" 
                :row-class-name="tableRowClassName"
                :no-filtered-data-text="filterString">
            </Table>
            <Page :total="totalNum" :current="currentPage4" size="small" show-total  @on-change="pageChange"></Page>
   </div>

</template>
<script>
    import {mapState} from 'vuex'
    export default {
        props:['columns','columsData','totalNum','srcLink'],
        data () {
            return {
               // currentPage4:1,
                currentSelectIndex:0,
                filterString:''
            }
        },
        methods:{
            handleSelectionMsg (row, event, column) {
                //发起诊断端  跳转页面 diamsg/2 info
                //发起之后的操作  跳转页面  case iraid
                var self = this,path;
                if (row.ic_id === undefined) { //我的诊室
                     path =row.ID
                     self.$router.push({path:this.srcLink+path})
                } else {  //我的申请
                     path = row.ic_id
                     self.$router.push({path:this.srcLink+path})
                }
                 //if  image 跳转到内页 iraId    
                if (row.iraId != undefined) {
                    const goImageUrl ={
                        url:'/ids-server/user/v1/report/gate',
                        method:'post',
                        data:{
                          iraId:  row.iraId
                        }
                    }
                    self.http(goImageUrl).then(function(res){  
                        var imageData = res.data.data
                            window.sessionStorage.setItem("reportState",imageData.code);
                        if (self.$router.app._route.name === 'score') {
                            self.$router.push({path:'/score_cont/'+row.iraId})
                        } else{
                            if (imageData.code === 103) {
                                self.$Message.warning('无权限查看')
                                return false;
                            }  
                            self.$router.push({path:'/report/'+row.iraId})
                        }
                        //进入待诊断页面  101 
                        //进入可查看的页面 102
                        //进入审核报告模式成功 104 105
                        //可撤回  111 
                        //无权限查看  103
                    },function(error){
                    })
                }
            },
            tableRowClassName (row,index) {
                if ( this.srcLink === "/diamsg/") {
                      if (row.ic_id === this.currentSelectIndex ) {
                        return 'demo-table-info-row';
                    }   
                } else {
                  if (row.ID === undefined) {
                        if (row.iraId === this.currentSelectIndex ) {
                            return 'demo-table-info-row';
                        }
                    } else {
                        if (row.ID === this.currentSelectIndex) {
                            return 'demo-table-info-row';
                        }
                    }
                }
            },
            handleSignal(row, rowIndex){
                if (this.srcLink === "/diamsg/") {
                    this.currentSelectIndex = row.ic_id  
                    this.$store.commit('SELECT_INDEX',{ID:row.ic_id})     
                } else {
                     if (row.ID === undefined) {
                        this.currentSelectIndex = row.iraId  
                        this.$store.commit('SELECT_INDEX',{ID:row.iraId})
                      } else {
                        this.currentSelectIndex = row.ID
                        this.$store.commit('SELECT_INDEX',{ID:row.ID})
                      }  
                }
                this.$emit('sharePatient',row) 
           },
           pageChange(page){
             this.$store.commit('SELECT_PAGE',{pageIdx:page})
             this.$emit('getPageIndex',page) 
             //this.$parent.$parent.getImageCloudData(page,10,this.$store.state.startTime , this.$store.state.endTime ,'','','','')
           }
        },
       
        computed:{
            // ...mapState({
            //    spinShow: state => state.UPDATE_LOADING,
            // })
            currentPage4(){
                return  this.$store.state.pageIndex
            },
            spinShow(){
                return this.$store.state.UPDATE_LOADING
            }
        },
    }
</script>
<style lang="less">
 .ivu-table .demo-table-info-row td {
     background-color: @table-select-bg;
  }
  .ivu-table-filter-list-single li:nth-child(1){
      display:none;
  }
  .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
  }
  .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
  }
</style>

