import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login' 
import ImageIndex from '@/components/ImageCloud/ImageCloudIndex'   //影像大厅
import Person from '@/components/Personal/Index'
import BindPhone from '@/components/BindPhone'
import ForgetPassword from '@/components/ForgetPassword'
import Diagnosis from '@/components/Diagnosis/DiagnosisIndex'
import DiagnosisMsg from '@/components/Diagnosis/DiagnosisMsg'
import applicationUnfinished from '@/components/MyApplication/Unfinished'
import applicationRejected from '@/components/MyApplication/Rejected'
import applicationFinished from '@/components/MyApplication/Finished'
import appReportWrit from '@/components/MyConsultRoom/Report'
import myStatistics_diagnosis from '@/components/MyStatistics/Index'
import Apply from '@/components/MyApplication/ApplicateIndex'
import ConsultRoom from '@/components/MyConsultRoom/MyConsultRoomIndex'
import Statistics from '@/components/MyStatistics/Index'
import ReportScore from '@/components/ReportScore/Index'
import Home from '@/components/Home.vue'
Vue.use(Router)
 let routes =  [
   
    //绑定手机号
    {
      path: '/bphone',
      name: 'BindPhone',
      component: BindPhone
    },
    {  //忘记密码
      path: '/fgpass',
      name: 'ForgetPassword',
      component: ForgetPassword
    },
    //主页的内容
    {
      path: '/index',
      component: Home,
      name:'home',
      children: [
            { path: 'image', component: ImageIndex,name:'image', 
              meta: {
                pageTitle: '主页',
                keepAlive: true
              }},  //影像大厅
            { path: 'consultroom', component: ConsultRoom,name:'consultroom',
              meta: {
                pageTitle: '主页',
                keepAlive: true
             }}, //我的诊室
            { path: 'apply', component: Apply,name:'apply',
              meta: {
                pageTitle: '主页',
                keepAlive: true
              }},   //我的申请
            { path: 'person', component: Person,name:'person'},
            { path: 'diagnosis', component: Diagnosis,name:'diagnosis'},  //发起诊断
            { path: 'statistics', component: Statistics,name:'statistics'},
            { path: 'score', component: ReportScore,name:'score'}
        ]
    },
    {
      path: '/login',
      name: 'Login',
     // component: Login
      component: resolve => require(['../components/Login'], resolve),
    },
    {
      path: '/diamsg/:id',
      name: 'diamsg',
      component: DiagnosisMsg
    },
    {
      path:'/apply/:id',
      name: 'unfinished',
      component:applicationUnfinished
    },
    {
      path:'/person',
      name: 'Person',
      component:Person
    },
    {
      path:'/Rejected',
      name: 'applicationRejected',
      component:applicationRejected
    },
    {
      path:'/Finished/:id',
      name: 'applicationFinished',
      component:applicationFinished
    },
    {
      path:'/report/:id',
      name: 'appReportWrit',
      component:appReportWrit
    },
    { path: '/',
      redirect: '/login',
       component: Login
    },
    { path: '/score_cont/:id',
      name: 'score',
      component: resolve => require(['../components/ReportScore/ReportScoreContent'], resolve),
    },
    {
      path:'/myStatistics_diagnosis',
      name: 'myStatistics_diagnosis',
      component:myStatistics_diagnosis
    }
  ]
  const router = new Router({
    mode:'history',
    routes: routes
  });
  //  this.$router.addRoutes(this.menuitems)  
  router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) { //匹配到路由
      from.name ? next({name: from.name}) : next('/');
    } else {
      next();
    }
  });
export default router;