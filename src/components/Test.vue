<template>
  <div id="content">
    <h1>联系我们</h1>

    <div class="text">
    <p><strong>twitter</strong> <br>
      @larkneer
    </p>

    <p><strong>Gmail</strong> <br>
      larkneer@gmail.com
    </p>

    <p><strong>捐赠</strong> <br>
      tron: TK8QT9SNHzXZW6EgtWGDzAHvEdD8goT1W6 <br>
      <img src="https://steemjiang.com:8081/ipfs/QmZxooGJwcXvyYAVzyv8FL1WA1tW4Gxq1nnS4auefTGBDe" style="width:250px;" alt="捐赠">
    </p>


    </div>


  </div>
</template>

<script>

  export default {
    name: "Index",
    data() {
      return {

      }
    },
		
		methods:{
			test2(){
				const httpHandler = this.axios.create({
				        headers: { "Content-Type": "application/json;charset=utf-8" }, //即将被发送的自定义请求头
				        withCredentials: true //
				      })
							//// baseURL: 'https://steemjiang.com:8091/rpc',
							//url: 'https://api-bj.yoyow.one/rpc',
				let uri = "https://steemjiang.com:8091/rpc"; 
				let formdata = {"jsonrpc": "2.0", "method": "call", "params": [0, "get_full_accounts_by_uid", [["384452518"],{}]], "id": 1}
				
				let formdata2 = {"jsonrpc": "2.0", "method": "call", "params":[0,"get_post",["375867735","365964252",10]], "id": 0}
				this.axios({
				    url: 'https://steemjiang.com:8091/rpc',
				    method: 'post',
				    data: formdata2,
				    headers: { "Content-Type": "application/json",
						'Access-Control-Allow-Origin': '*'},
				  }).then((res) => {
				    console.log(899, res)
				  })			
			},
			testm(){
				//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
				//'Access-Control-Allow-Origin': '*',
				this.axios.request({
				    method: 'post',
						url: 'https://api-bj.yoyow.one',
						headers: {'X-Requested-With': 'XMLHttpRequest',		
											"Content-Type": "application/json;charset=utf-8"},					
						data: {"jsonrpc": "2.0", "method": "call", "params": [0, "get_accounts_by_uid", [["384452518"]]], "id": 1}
				  })
				  .then( (arg) => {
				      console.log(222,arg)  
				      })
				  .catch((error) => {
				    console.log(333,error)
				    })
			},
			testp(){
				//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
				//'Access-Control-Allow-Origin': '*',
				this.axios.request({
				    method: 'post',
						url: 'https://api-bj.yoyow.one',
						headers: {'X-Requested-With': 'XMLHttpRequest',		
											"Content-Type": "application/json;charset=utf-8"},					
						data: {"jsonrpc": "2.0", "method": "call", "params": [0, "get_accounts_by_uid", [["3856899855"]]], "id": 1}
				  })
				  .then( (arg) => {
				      console.log(5889,arg)  
				      })
				  .catch((error) => {
				    console.log(333,error)
				    })
			},
			test(){
				//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
				//'Access-Control-Allow-Origin': '*',
				this.axios.request({
				    method: 'post',
						url: 'https://api-bj.yoyow.one',
						// baseURL: 'https://api-bj.yoyow.one',
						// baseURL: 'https://steemjiang.com:8091/rpc',
						headers: {'X-Requested-With': 'XMLHttpRequest',		
											"Content-Type": "application/json;charset=utf-8"},					
						data: {"jsonrpc": "2.0", "method": "call", "params": ["history", "get_relative_account_history", [384452518, null, 0,10,0]], "id": 1}
				  })
				  .then( (arg) => {
				      console.log(255,arg)  
				      })
				  .catch((error) => {
				    console.log(333,error)
				    })
			}
		},
		
		mounted() {
			this.testm()
			this.testp()
			// this.test()
		}


  }
</script>

<style scoped>
  h1{
    font-size: 2rem;
    text-align: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ddd;
  }
  #content{
    color: rgba(55,53,58,0.75);
    align: center;
    margin: 1rem auto;
    width: 60%;
    padding-bottom: 0.2rem;
  }
  .text{
    line-height: 1.8rem;
  }

  a{
    color: rgba(55,53,58,0.75);
  }

  a:hover{
    color: darkcyan;
    text-decoration: none;
  }

  .btn-outline-primary {
    color: rgba(55,53,58,0.75);
    border-color: rgba(55,53,58,0.75);
  }
  .btn-outline-primary:hover{
    background-color: chocolate;
  }
</style>


