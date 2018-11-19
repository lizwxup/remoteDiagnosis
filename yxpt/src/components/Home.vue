<template>
    <div class="layout">
    
        <Layout :style="{minHeight: '100vh'}">  
               <Sider  :collapsed-width="78" v-model="isCollapsed">
                <div><img :src="logo"  alt="" width="200px" height="55px"></div>
                     <Menu  ref="contactMenu"  :class="menuitemClasses" @on-select="navigateToNav"  
                         :active-name="activeName" width="auto" >
                        <MenuItem   v-for="(itemAside,index) in asideArr"  :key="index"  :name="itemAside.path">
                            <Icon :type="itemAside.icon"></Icon>
                            <span>{{itemAside.roleName}}</span>
                        </MenuItem>
                    </Menu>
            </Sider>       
            <Layout style="margin-left:30px;">
               <header-top></header-top>
               <div v-if="path==='/index/image' || path==='/index/consultroom' ||  path==='/index/apply'" >  
               </div> 
               <Content>
                    <div>
                        <router-view> </router-view>
                    </div>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import logo from '../../static/img/logo.png'
import SearchTime from './Common/SearchTime.vue' 
import HeaderTop from './Common/Header.vue' 
import TableCont from './Common/table.vue'
    export default {
        data () {
            return {
                isCollapsed: false,
                logo,
                path:'',
                height:{
                   height:'900px'
                },
                asideArr:[],
                activeName:'',
                selected:false
            };
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                     this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods:{
            navigateToNav (name) {
                 var self = this
                 self.activeName = name;
                 self.$router.push({path:'/index'+name})
                 self.path = self.$route.path
            }
           
        },
        watch: {
			$route(to, from) {
				this.$store.state.pageIndex = 1
			}
		},
        mounted(){
             var self = this, strConent,pathCon = self.$route.path ;
             let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
               self.height.height = h-87 +'px'
               self.path = pathCon
               strConent = pathCon.lastIndexOf("\/")
               self.activeName  = pathCon.substring(strConent, pathCon.length)
               var authArr = eval('('+sessionStorage.getItem('auth')+')')
               var allItem;
                authArr.forEach(function(item,index){
                    if (item.roleName === '我的诊室') {
                        item.icon ="clipboard"
                        item.path = "/consultroom"
                    }else if (item.roleName === '诊断大厅') {
                        item.icon ="easel"
                        item.path = "/image"    
                    } else if (item.roleName === '发起诊断') {
                        item.icon ="compose"
                        item.path = "/diagnosis"
                    } else if (item.roleName === '我的申请') {
                         item.icon ="funnel"
                         item.path = "/apply"
                    }else if (item.roleName === '报告评分') {
                         item.icon ="clipboard"
                         item.path = "/score"
                    }
                    allItem  = item     
                    self.asideArr.push(allItem)
                }) 
                self.asideArr.push(
                       {"roleName":"我的统计","icon":"clipboard","path":"/statistics","id":"4","childern":[]},
                       {"roleName":"个人中心","icon":"android-contact","path":"/person","id":"7","childern":[]}
                )
                self.$nextTick(() => {
                    self.$refs.contactMenu.updateActiveName()
                });
        },   
        components:{
            SearchTime,
            HeaderTop,
            TableCont
        }
    }
</script>
<style lang="less">
    .layout-con{
        height: 100%;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }

</style>