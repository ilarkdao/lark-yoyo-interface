<template>
  <div class="wallet">
    <div>
      <div class="changebox">
        <p :class="[yoyoFlag ? 'titleSelected' : 'titleUnSelected']" @click="beforeYoyo">YOYO</p>
        <p :class="[wyoyoFlag ? 'titleSelected' : 'titleUnSelected']" @click="beforeWyoyo">WYOYO</p>
      </div>

        <!--yoyo兑换-->
        <div v-if="yoyoFlag" class="exchange">
					<div class="round-box">
						<div class="round-box-title-container">
							<div class="box-title">
							  在YOYO钱包中对：439202012 进行转帐，并在备注中填入绑定的"以太坊地址"。如下图所示：<br><br>
								WYOYO一般会在30分钟内到帐！ <br><br>
								转帐最小额度为10YOYO，小于10YOYO的转帐将无法到帐！
							</div>
						</div><br><br>
												
						<div class="round-box-title-container">
						  <div><img src="https://ipfs.ilark.io/ipfs/QmeUo4SCbb5547sG6wE95XQzqF9gLdZvZNJVW6LGzd7vRJ" class="img-fluid" alt="Responsive image"></div>
						</div>							
					</div>
        </div>

      <!--wyoyo兑换-->
      <div v-if="wyoyoFlag" class="exchange">
        <!-- 上面的框 -->
        <div class="round-box">
          <div class="round-box-title-container">
            <p class="box-title">
              from
            </p>
            <p class="box-title">
              {{ $t('message.balance') }}: {{ balanceOf }} WYOYO
            </p>
          </div>
          <div class="round-box-content-container">
            <input
                    class="mb-2 mr-sm-2 mb-sm-0 user input"
                    :class="checkWyoyoFlag ? 'isok': 'isfalse'"
                    placeholder="0.0" v-model="transWyoyoValue"
                    @keyup="checkTransWyoyoValue" type="number" inputmode="decimal"
                    pattern="^[0-9]*[.,]?[0-9]*$" spellcheck="false" value>
            <div style="display:flex">
              <button class="maxBtn" @click="fillMaxWyoyoTrans">Max</button>
              <img class="coin-icon" src="../../static/images/wyoyo.svg" alt="" >
              <div style="margin-top:18px;margin-left:8px">WYOYO</div>
            </div>
          </div>
        </div>
        <!-- 下面的框 -->
        <div class="round-box">
          <div class="round-box-title-container">
            <p class="box-title">
              to
            </p>
          </div>
          <div class="round-box-content-container">
            <input
                    class="mb-2 mr-sm-2 mb-sm-0 user input"
                    placeholder="0.0" v-model="transWyoyoValue"
                    pattern="^[0-9]*[.,]?[0-9]*$" spellcheck="false" value>
            <div style="display:flex">
              <img class="coin-icon" src="../../static/images/yoyo.svg" alt="yoyo">
              <div style="margin-top:18px;margin-left:8px">YOYO</div>
            </div>
          </div>
        </div>
				
        <!-- 按钮 -->
        <div class="confirm-box">
          <button class="confirm-btn" @click="polygonToYoyo" :disabled="!canTransWyoyoFlag">
            {{ $t('message.confirmconvert') }}
          </button>
        </div>

        <!-- 兑换率 -->
        <p style="width:100%;text-align:center;font-size:14px;color:gray;margin:0;padding-top:8px">
					最低转帐额不小于 10 WYOYO
        </p>

      </div>

    </div>

    <!--加载动画-->
    <transition name="fade">
      <SmallLoading v-if="isLoading"></SmallLoading>
    </transition>
     <!-- 错误提示弹窗 -->
    <transition name="fade">
      <div class="mask" v-if="showMask" @click="hideMask">
        <div class="mask-box">
          <div class="mask-info">
            <div class="mask-info-text">
              <div v-if="successFlag">
                <img src="../../static/images/success.jpg" class="d-inline-block align-top" alt="success">
              </div>
              <div v-else>
                <img src="../../static/images/error.jpg" class="d-inline-block align-top" alt="error">
              </div>
              {{ maskInfo }}<br>
            </div>
          </div>
        </div>
      </div>
    </transition>
		
  </div>
</template>

<script>
  import SmallLoading from './SmallLoading'
  export default {
    name: "Bridge",
    data() {
      return {
        balanceOf: '', 
        balanceOf2: '',
        isLoading: true,

        yoyoFlag: true,
        wyoyoFlag: false,

        showMask: false,
        maskInfo:'',

        transWyoyoValue: '',
        checkWyoyoFlag: true,
        canTransWyoyoFlag: false,

      }
    },
    methods: {
      beforeYoyo(){
        this.yoyoFlag = true
        this.wyoyoFlag = false
      },
      beforeWyoyo(){
        this.yoyoFlag = false
        this.wyoyoFlag = true
      },
      async getWyoyoBalance(){
        let addr = this.$store.state.addr
        let instance = this.$store.state.wyoyoInstance2
        let res = await instance.methods.balanceOf(addr).call()
				let res2 = this.web4.utils.fromWei(res, "ether")	
				
        this.balanceOf = this.formatData(res2)
        this.balanceOf2 = res2
      },
			
			async polygonToYoyo(){
			  try {			
					await this.unlockWallet()
					this.isLoading = true
					this.canTransWyoyoFlag = false
					let user = this.$store.state.username
					let addr = this.$store.state.addr
					let instance = this.$store.state.wyoyoInstance
					
					//销毁WYOYO polygonToYoyo(uint256 _yoyoAccount, uint256 _amount)
					let s = await this.web4.eth.getGasPrice()
					let gasPrice = parseFloat(s) + this.addGas
					let option = {
					  from: addr,
					  gasPrice: gasPrice
					}
					let amount = this.web4.utils.toWei(this.transWyoyoValue, 'ether')
					let res = await instance.methods.polygonToYoyo(user, amount).send(option)
					// console.log(688, res)
					if(res.status === true){
						axios.request({
							method: 'post',
							url: 'https://staking.larkneer.com/polygonToYoyo',
							// url: 'http://localhost:5300/polygonToYoyo',
							data:{
								hash: res.transactionHash
							}
						})
							.then(arg => {
								if(arg.data === "ok"){
									this.showMask = true
									this.successFlag = true
									this.maskInfo = "转帐成功！"
									this.transWyoyoValue = ''
									this.getWyoyoBalance()
									this.isLoading = false
								}else{
									this.showMask = true
									this.successFlag = false
									this.transWyoyoValue = ''
									this.maskInfo = "转帐失败！\n 请检查后重试！"
								}
							})
							.catch(error => {
								this.showMask = true
								this.successFlag = false
								this.transWyoyoValue = ''
								this.maskInfo = "错误！\n" + error
								
							})
					}
			   }  catch(e){
					this.showMask = true
					this.successFlag = false
					this.transWyoyoValue = ''
					this.maskInfo = "错误！\n" + e
			  }
			},
			

      hideMask(){
        this.showMask=false
      },
			async waiting(){
				return new Promise(resolve => {
					setTimeout(resolve, 2000)  //2秒
				})
			},

      async checkTransWyoyoValue(){
				await this.waiting()
				this.transWyoyoValue = parseFloat(this.transWyoyoValue).toFixed(3)
        let reg = /^\d+(\.\d+)?$/
        let res = reg.test(this.transWyoyoValue)
        let res1 = false
        if(parseFloat(this.transWyoyoValue) >= 1){
          res1 = true
        }
				let res2 = parseFloat(this.transWyoyoValue) <= parseFloat(this.balanceOf2)
        this.canTransWyoyoFlag = res1 && res && res2
        this.checkWyoyoFlag = this.canTransWyoyoFlag
				
      },
      fillMaxWyoyoTrans(){
				this.transWyoyoValue = parseFloat(this.balanceOf2)
        this.checkTransWyoyoValue()
      },
    },

    components: {
      SmallLoading,
      },

    mounted() {
      if(!this.$store.state.username){
        this.$router.push({path: '/login'})
      }
      let that = this
      let instance = this.$store.state.wyoyoInstance2
      async  function main(){
        if(Object.keys(instance).length === 0){
          //如果刷新页面, instance未定义
          // console.log(888, "bridge instance为空，是刷新页面")
          try{
            await that.getWyoyoInstance()
						await that.getWyoyoBalance()

          }catch(e){
            that.maskInfo = that.$t('message.tryrefreshpage')+"\n"+e
            that.showMask = true
          }
        } else{
          // console.log(22333, "bridge, 啥也没干！")
          try{
            await that.getWyoyoBalance()
          }catch(e){
            that.maskInfo = that.$t('message.tryrefreshpage')+"\n"+e
            that.showMask = true
          }
        }
        that.isLoading = false
      }
      main()
    },

    }
</script>

<style scoped>

  .wallet{
    width: 45%;
    max-width: 520px;
    min-width: 400px;
    margin: 2.5rem auto;
    padding: 1.5rem 1rem 2rem 1rem;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 30px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 3px 16px 24px, rgba(0, 0, 0, 0.01) 3px 24px 32px;
    border-radius: 30px;
    display: block;
    z-index: 1;
    box-sizing: border-box;
  }
.changebox{
  display: flex;
  justify-content: space-evenly;
  padding: 1em;
}

.changebox p{
  font-weight: 400;
  color: darkgray;
  font-size: 1.2rem;
  cursor: pointer;
}

.titleSelected{
color: rgb(30, 30, 30) !important;
font-weight: 500 !important;
}

.titleUnSelected{
color: darkgray !important;
font-weight: 400 !important;
}

.changebox p:hover{
  color: rgb(92, 91, 91) !important;
}

  .user{
    margin-top: 1rem;
    width: 30rem;
  }


.round-box{
      border-radius: 20px;
      border: 1px solid rgb(247, 248, 250);
      padding:8px 14px;
      margin-bottom: 1rem;
}

.round-box-title-container{
     display: flex;
    flex-flow: row nowrap;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(0, 0, 0);
    font-size: 0.75rem;
    line-height: 1rem;;
    box-sizing: border-box;
    justify-content: space-between;
    -webkit-box-pack: justify;
    height: 100%;
}
.round-box-content-container{
    display: flex;
    flex-flow: row nowrap;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(0, 0, 0);
    font-size: 1rem;
    line-height: 1.2rem;;
    box-sizing: border-box;
    padding-top: 14px;
    justify-content: space-between;
    -webkit-box-pack: justify;
    height: 100%;
}

.box-title{
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 500;
    font-size: 14px;
    color: rgb(86, 90, 105);
}

.input{
  color: rgb(0, 0, 0);
    width: 100%;
    position: relative;
    font-weight: 500;
    outline: none;
    border: none;
    flex: 1 1 auto;
    background-color: rgb(255, 255, 255);
    font-size: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0px;
    appearance: textfield;
}
.maxBtn{
  height: 100%;
  margin-top: 16px;
    background-color: rgb(253, 234, 241);
    border: 1px solid rgb(253, 234, 241);
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    margin-right: 0.5rem;
    color: rgb(255, 0, 122);
    user-select: none;
}

.maxBtn:focus{
  border: 1px solid rgb(255, 0, 122);
    outline: none;
}

.maxBtn:hover{
      border: 1px solid rgb(255, 0, 122);
}
.pink-arrow-box{
  margin-bottom:1rem;
  display:flex;
  align-items:center;
  align-content: center;
  width:100%;
  text-align: center;
}
.coin-icon{
  margin-top: 15px;
  width:24px;
  height:24px;
}

.pink-arrow{
  cursor: pointer;
}

  .confirm-box{
    margin-top: 1em;
    display: flex;
    justify-content: space-around;
  }

  .confirm-btn{
     padding: 12px;
    /* width: 100%; */
    flex: 1;
    text-align: center;
    border-radius: 20px;
    outline: none;
    border: 1px solid transparent;
    text-decoration: none;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    flex-wrap: nowrap;
    -webkit-box-align: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    z-index: 1;
    background-color: rgb(253, 234, 241);
    color: rgb(255, 0, 122);
    font-size: 16px;
    font-weight: 500;
    user-select: none;
  }

.confirm-btn:hover{
  background-color: rgb(251, 220, 230);
}

.confirm-btn:disabled{
  color: rgb(136, 141, 155);
  cursor: auto;
  box-shadow: none;
  outline: none;
  opacity: 1;
  background-color: rgb(237, 238, 242);
}


  .mask{
    z-index: 2000;
    overflow: hidden;
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
}

 .mask-box{
    position: relative;
    max-width: 280px;
    width: 100%;
    background: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 30px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 3px 16px 24px, rgba(0, 0, 0, 0.01) 3px 24px 32px;
    border-radius: 10px;
    padding: 1rem;
    display: block;
    z-index: 100;
    box-sizing: border-box;
    margin-top: -50vh;
 }

 .mask-info{
   display: flex;
   align-content: center;
 }

 .mask-info-text{
   text-align: center;
   width: 100%;
 }

  .exchange{
    /* width: 30rem; */
    margin-top: 1rem;
  }

  .isok{
    /*margin-top: 1.5rem;*/
    /*width: 50%;*/
    /*background-color: chartreuse;*/
  }
  .isfalse{
    /*margin-top: 1.5rem;*/
    /*width: 50%;*/
    background-color: crimson;
  }
</style>

