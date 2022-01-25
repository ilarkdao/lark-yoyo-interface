<template>
  <div class="wallet">
    <div>
      <div class="changebox">
        <h5>{{ $t('message.userlogin') }}</h5>
      </div>

      <!-- yoyow -->
      <div class="round-box">
        <div class="round-box-title-container">
          <p class="box-title">
            <img class="coin-icon" src="../../static/images/yoyow.png" alt="yoyow">
          </p>
          <p class="box-title">
            <b-input
              class="mb-2 mr-sm-2 mb-sm-0 user"
              :placeholder="$t('message.yoyowAccout')" v-model="username"
            ></b-input>
          </p>
        </div>
      </div>

      <!-- polygon -->
      <div class="round-box">
        <div class="round-box-title-container">
          <p class="box-title">
            <img class="coin-icon" src="../../static/images/metamask.png" alt="polygon">
          </p>
          <p class="box-title">
            {{ addr }}
          </p>
        </div>
      </div>

      <div class="loginbtn">
        <b-button variant="outline-primary" @click="login" :disabled="!loadingFlag">{{ $t('message.login') }}</b-button>
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
              {{ maskInfo }}
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
    name: "Login",
    data() {
      return {
        username:'',
        addr: '',
        isLoading: true,
        loadingFlag: false,
        showMask:false,
				maskInfo:"",
      }
    },
    methods:{
      async login(){
        this.loadingFlag = true
        if(this.addr !== '' && this.username !== ''){
					let res = await this.axios.request({
							method: 'post',
									url: 'https://api-bj.yoyow.one',
									headers: {'X-Requested-With': 'XMLHttpRequest',		
													 "Content-Type": "application/json;charset=utf-8"},					
									data: {"jsonrpc": "2.0", "method": "call", "params": [0, "get_accounts_by_uid", [[this.username]]], "id": 1}
						})
					// console.log(888, res0.data.result[0].memo_key) 
					// console.log(1589, res.data.result[0] == null) 
					if(res.data.result[0] == null){
						this.showMask = true
						this.maskInfo = "此YOYO帐号不存在！"
					}else{
						let username = this.username
						console.log(' Welcome.', username)
						this.$store.commit('saveUser', {username: username, addr: this.addr})
						this.$router.push({path:'/'})
					}

				}
      },
			
			hideMask(){
			  this.showMask=false
			},
    },
    components: {
      SmallLoading
    },

    mounted() {
      let that = this
      async function main(){
        await that.sleep()
        //yoyow
        
				
        //metamask
        let accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        that.addr = accounts[0]

        that.isLoading = false
        that.loadingFlag = true

      }
      main()
    }

  }
</script>

<style scoped>
  .wallet{
    width: 50rem;
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


  .changebox p:hover{
    color: rgb(92, 91, 91) !important;
  }



  .round-box{
    border-radius: 20px;
    border: 1px solid rgb(247, 248, 250);
    padding:8px 14px;
    margin: 0 auto;
    width: 28rem;
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
    margin-bottom: 1rem;
  }

  .box-title{
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    font-weight: 500;
    font-size: 14px;
    color: rgb(86, 90, 105);
  }


  .coin-icon{
    margin-top: 15px;
    height:45px;
  }


  .user{
    margin-top: 15px;
    width:19rem;
  }
  .loginbtn{
    text-align: center;
    margin-top: 1rem;
  }

  .loginbtn:disabled{
    color: gray;
    cursor: auto;
    box-shadow: none;
    outline: none;
    opacity: 1;
    background-color: rgb(237, 238, 242);
  }

</style>

