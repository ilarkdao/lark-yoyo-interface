import wyoyow from '../../../public/Wyoyo.json'

const getWyoyoInstance = async function(){
  let instance = new this.web3.eth.Contract(wyoyow.abi, this.wyoyo)
  // console.log(289, 'YoyoStaking',instance, this.yoyoStakingPool)

  //将得到的数据存入vuex中
  this.$store.commit('saveWyoyoInstance', instance)

  let instance2 = new this.web4.eth.Contract(wyoyow.abi, this.wyoyo)
  //将得到的数据存入vuex中
  this.$store.commit('saveWyoyoInstance2', instance2)
}

export {getWyoyoInstance}
