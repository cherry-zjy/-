import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Index from '@/components/Index'

import MortgageLoan from '@/components/Business/MortgageLoan'
import FinancingLoan from '@/components/Business/FinancingLoan'
import FinanceLease from '@/components/Business/FinanceLease'

import Development from '@/components/Development/Development'

import News from '@/components/News/News'

import AboutUs from '@/components/AboutUs/AboutUs'


Vue.use(Router)

export default new Router({
  routes: [
    { 
      path: '/',name: '快子金融',component: Index,
      children:[
        { path: '/', component: Home, name: '快子金融' },       
        { path: '/Business/MortgageLoan', component: MortgageLoan, name: '按揭贷款' },         
        { path: '/Business/FinancingLoan', component: FinancingLoan, name: '融资金贷款' },         
        { path: '/Business/FinanceLease', component: FinanceLease, name: '融资租赁' },
        
        { path: '/Development/Development', component: Development, name: '企业发展' },

        { path: '/News/News', component: News, name: '新闻资讯' },

        { path: '/AboutUs/AboutUs', component: AboutUs, name: '关于我们' },
      ]
    },
  ]
})
