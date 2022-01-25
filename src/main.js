import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Web3 from 'web3'
import axios from 'axios'
import VueI18n from 'vue-i18n'
import {create} from 'ipfs-http-client'


Vue.use(BootstrapVue)
Vue.use(VueI18n)

//设置语言包
const DEFAULT_LANG = navigator.language
const LOCALE_KEY = 'localeLanguage'

const i18n = new VueI18n({
  // locale:'en',
  locale:'zh-CN',
  messages: {
    'zh-CN': require('./assets/lang/zh_CN'),
    'en': require('./assets/lang/EN')
  },
  fallbackLocale: 'zh-CN'
})

const setup = lang => {
  if (lang === undefined){
    lang = window.localStorage.getItem(LOCALE_KEY)
    if (i18n.messages[lang] === undefined){
      lang = DEFAULT_LANG
    }
  }
  window.localStorage.setItem(LOCALE_KEY, lang)
  Object.keys(i18n.messages).forEach(lang => {
    document.body.classList.remove(`lang-${lang}`)
  })
  document.body.classList.add(`lang-${lang}`)
  document.body.setAttribute('lang', lang)

  Vue.config.lang = lang
  i18n.locale = lang
}
setup()


//设置ipfs节点, ,挂载到全局
const ipfs = create({ host: 'ipfs.ilark.io', port: '9001', protocol: 'https' })
Vue.prototype.ipfs = ipfs

//Polygon网络
let web3
let web4
if (typeof window.ethereum !== 'undefined'){
  console.log(111, "metamask")
  web3 = new Web3(window.ethereum)

  let url = "https://polygon-rpc.com"
	// let url = "https://matic-mainnet.chainstacklabs.com"
  let web3Provider2 = new Web3.providers.HttpProvider(url)
  web4 = new Web3(web3Provider2)
	// console.log(112, "web4", web4)

} else {
  console.log(222, "无metamask")
  alert("没有安装metamask！\n 请安装！ https://metamask.io ")
}

//contract
let larkToken = "0x4cE8485608F78921Fbc0F96e63c0566B1b176Db0"
let larkPool = "0xD48cA0B1a9C143c8570e34F5C0dE5a9E29ffB3d3"
let yoyoStakingPool = "0xC8f01C3cbD3558e461bb6072D0b870eDEc7bD7fd"
// let lpToken = "0xf6d625e6168f8b3cd96cbf3b8a32bece38d0775a"  //DAI-LARK

let mintFee = 50
let addGas = 5e9  //5 GWei


// import {timeFormat} from "./utils/timeFormat"
// import {formatSeconds} from "./utils/formatSeconds"
// import {getstr} from "./utils/getstr"
// import {approve} from "./utils/approve"
import {sleep} from "./utils/sleep"  
import {unlockWallet} from "./utils/unlockWallet"
import {formatData} from "./utils/formatData"
import {getDelegateInstance} from "./utils/pool/getDelegateInstance"
import {getPoolInstance} from "./utils/pool/getPoolInstance"
import {getLarkInstance} from "./utils/token/getLarkInstance"
// import {getArtInstance} from "./utils/art/getArtInstance" 


// Vue.prototype.timeFormat = timeFormat
// Vue.prototype.formatSeconds = formatSeconds
// Vue.prototype.getstr  = getstr
// Vue.prototype.approve = approve
Vue.prototype.web3 = web3
Vue.prototype.web4 = web4
Vue.prototype.sleep  = sleep 
Vue.prototype.unlockWallet  = unlockWallet
Vue.prototype.formatData = formatData 
Vue.prototype.getDelegateInstance = getDelegateInstance
Vue.prototype.getPoolInstance = getPoolInstance
Vue.prototype.getLarkInstance = getLarkInstance
// Vue.prototype.getArtInstance = getArtInstance
// Vue.prototype.lpToken = lpToken
Vue.prototype.larkToken = larkToken  
Vue.prototype.larkPool = larkPool
Vue.prototype.yoyoStakingPool = yoyoStakingPool
// Vue.prototype.larkArtNFT = larkArtNFT
// Vue.prototype.larkPhotoNFT = larkPhotoNFT
Vue.prototype.addGas = addGas
Vue.prototype.axios = axios 
Vue.prototype.mintFee = mintFee 


Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach(function (to, from, next) {
  if(to.meta.requireAuth){
    // 要去的url只有登陆成功后才能访问
    if (store.state.username) {
      next()
    } else {
      next({name: 'login'})
    }
  }else{
    next()
  }
})

