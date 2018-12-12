import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Index from '@/components/Index'

import MortgageLoan from '@/components/Business/MortgageLoan'
import FinancingLoan from '@/components/Business/FinancingLoan'
import FinanceLease from '@/components/Business/FinanceLease'

import Development from '@/components/Development/Development'

import News from '@/components/News/News'
import News2 from '@/components/News/News2'
import News3 from '@/components/News/News3'
import NewsDetail from '@/components/News/NewsDetail'

import AboutUs from '@/components/AboutUs/AboutUs'
import SP from '@/components/AboutUs/SP'
import JoinUs from '@/components/AboutUs/JoinUs'
import Culture from '@/components/AboutUs/Culture'
import Address from '@/components/AboutUs/Address'


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

        { path: '/News/News', component: News, name: '公司动态' },
        { path: '/News/News2', component: News2, name: '行业动态' },
        { path: '/News/News3', component: News3, name: '媒体聚焦' },
        { path: '/News/NewsDetail/:id', component: NewsDetail, name: '新闻详情' },

        { path: '/AboutUs/AboutUs', component: AboutUs, name: '关于我们' },
        { path: '/AboutUs/SP', component: SP, name: 'SP招募' },
        { path: '/JoinUs/JoinUs', component: JoinUs, name: '招贤纳士' },
        { path: '/AboutUs/Culture', component: Culture, name: '企业文化' },
        { path: '/AboutUs/Address', component: Address, name: '公司地址' },
      ]
    },
  ]
})
