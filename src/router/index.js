import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Index from '@/components/Index'
import Login from '@/components/Login'

import SmallSupermarket from '@/components/Finance/SmallSupermarket'
import SmallSupermarketDetail from '@/components/Finance/SmallSupermarketDetail'
import SmallSupermarketApply from '@/components/Finance/SmallSupermarketApply'
import SmallSupermarketApplyDetail from '@/components/Finance/SmallSupermarketApplyDetail'

import CreditManager from '@/components/Finance/CreditManager'
import CreditManagerApply from '@/components/Finance/CreditManagerApply'
import CreditManagerApplyDetail from '@/components/Finance/CreditManagerApplyDetail'

import BankLoan from '@/components/Finance/BankLoan'
import BankLoanApplyfirst from '@/components/Finance/BankLoanApplyfirst'
import BankLoanApplysecond from '@/components/Finance/BankLoanApplysecond'
import BankLoanApplythird from '@/components/Finance/BankLoanApplythird'

import CardSupermarket from '@/components/Finance/CardSupermarket'
import CardSupermarketProduct from '@/components/Finance/CardSupermarketProduct'
import CardSupermarketDetail from '@/components/Finance/CardSupermarketDetail'
import CardSupermarketfirst from '@/components/Finance/CardSupermarketfirst'
import CardSupermarketsecond from '@/components/Finance/CardSupermarketsecond'

import CarSupermarket from '@/components/Finance/CarSupermarket'
import CarSupermarketDeatil from '@/components/Finance/CarSupermarketDeatil'

import POSSupermarket from '@/components/Finance/POSSupermarket'
import POSSupermarketDetail from '@/components/Finance/POSSupermarketDetail'
import POSSupermarketOrder from '@/components/Finance/POSSupermarketOrder'
import POSSupermarketSubmitOrder from '@/components/Finance/POSSupermarketSubmitOrder'

import Flow from '@/components/Help/Flow'
import Flowone from '@/components/Help/Flowone'
import Formmanual from '@/components/Help/Formmanual'
import HelpCenter from '@/components/Help/HelpCenter'

import Find from '@/components/Find'
import FindDteail from '@/components/FindDteail'

import User from '@/components/User'
import Info from '@/components/User/Info'
// import Certification from '@/components/User/Certification'
import Order from '@/components/User/Order'
import POSOrder from '@/components/User/POSOrder'
import Address from '@/components/User/Address'
import Spread from '@/components/User/Spread'
import Recommend from '@/components/User/Recommend'
import Money from '@/components/User/Money'


Vue.use(Router)

export default new Router({
  routes: [
    { 
      path: '/',name: '小火金融',component: Index,
      children:[
        { path: '/', component: Home, name: '小火金融' },       
        { path: '/Finance/SmallSupermarket', component: SmallSupermarket, name: '小额超市' },       
        { path: '/Finance/SmallSupermarketDetail/:id', component: SmallSupermarketDetail, name: '小额超市详情' },       
        { path: '/Finance/SmallSupermarketApply/:id', component: SmallSupermarketApply, name: '小额超市申请' },       
        { path: '/Finance/SmallSupermarketApplyDetail/:id', component: SmallSupermarketApplyDetail, name: '小额超市申请详情' },       
        
        { path: '/Finance/CreditManager', component: CreditManager, name: '信贷经理' },       
        { path: '/Finance/CreditManagerApply/:id', component: CreditManagerApply, name: '信贷经理申请' },       
        { path: '/Finance/CreditManagerApplyDetail/:id', component: CreditManagerApplyDetail, name: '信贷经理申请详情' },       
        
        { path: '/Finance/BankLoan', component: BankLoan, name: '银行借贷' },       
        { path: '/Finance/BankLoanApplyfirst/:id', component: BankLoanApplyfirst, name: '银行借贷申请' },       
        { path: '/Finance/BankLoanApplysecond/:id', component: BankLoanApplysecond, name: '银行借贷第二步' },       
        { path: '/Finance/BankLoanApplythird/:id', component: BankLoanApplythird, name: '银行借贷第三步' },       
        
        { path: '/Finance/CardSupermarket', component: CardSupermarket, name: '信用卡超市' },
        { path: '/Finance/CardSupermarketProduct/:id', component: CardSupermarketProduct, name: '信用卡超市商品' },
        { path: '/Finance/CardSupermarketDetail/:id', component: CardSupermarketDetail, name: '信用卡商品详情' },
        { path: '/Finance/CardSupermarketfirst/:id', component: CardSupermarketfirst, name: '信用卡商品申请第一步' },
        { path: '/Finance/CardSupermarketsecond/:id', component: CardSupermarketsecond, name: '信用卡商品申请第二步' },
        
        { path: '/Finance/CarSupermarket', component: CarSupermarket, name: '车险超市' },       
        { path: '/Finance/CarSupermarketDeatil/:id', component: CarSupermarketDeatil, name: '车险超市详情' },       
        
        { path: '/Finance/POSSupermarket', component: POSSupermarket, name: 'POS超市' },       
        { path: '/Finance/POSSupermarketDetail/:id', component: POSSupermarketDetail, name: 'POS超市详情' },       
        { path: '/Finance/POSSupermarketOrder/:id', component: POSSupermarketOrder, name: 'POS超市订单' },       
        { path: '/Finance/POSSupermarketSubmitOrder/:id', component: POSSupermarketSubmitOrder, name: 'POS超市提交订单' },       
        
        { path: '/Help/Flow', component: Flow, name: '流程说明' },       
        { path: '/Help/Flowone/:id', component: Flowone, name: '信用卡申请流程' }, 
    
        { path: '/Help/Formmanual', component: Formmanual, name: '平台手册' },       
        { path: '/Help/HelpCenter', component: HelpCenter, name: '帮助中心' },         
    
        { path: '/Find',name: '发现',component: Find},
        { path: '/FindDteail/:id',name: '发现详情',component: FindDteail},
      
        {
          path: '/User', component: User,
          children: [
            {path: '/User', component: Info,name: '个人信息'},
            // {path: '/User/Certification', component: Certification,name: '个人信息-实名认证'},
            {path: '/User/Order', component: Order,name: '我的订单'},
            {path: '/User/POSOrder', component: POSOrder,name: 'POS订单'},
            {path: '/User/Address', component: Address,name: '收货地址'},
            {path: '/User/Spread', component: Spread,name: '推广管理'},
            {path: '/User/Recommend', component: Recommend,name: '专属推荐人'},
            {path: '/User/Money', component: Money,name: '我的钱包'},
          ]
        },
      ]
    },
    { path: '/Login',name: '登录',component: Login,},
  ]
})
