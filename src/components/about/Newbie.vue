<template>
  <div id="content">
    <h1>新手入门</h1>

   <h4>简介</h4>
    <p>Lark将是一系列智能合约的协议集，映射现实中的价值关系，以实现价值维度的元宇宙。整体将采用模块化、渐进式地设计，
		以实现可拓展、可叠加的协议效果。它将包含这些模块：
		去中心化社交YOYOW + DeFi + NFT + DAO等。它将在DAO的组织形式下进行协作，以实现自组织自进化自完成。</p>
		
		<p>
		Lark YOYO将实现YOYO的登录和发布功能，YOYO的质押功能(Staking YOYO, Earn LARK)，YOYO LP mining，
		NFT的发布铸造功能，艺术策展人机制。
		</p>

    <h4>三步开启质押奖励：</h4>
		<p>第一步：在YOYO手机钱包中对见证人：384452518 进行质押。</p>
		
		
		<p>第二步：在YOYO钱包中对见证人：384452518 进行转帐10个YOYO，并在备注中填入需绑定的"以太坊地址"，这步非常重要！
		如下图所示：</p>
		<b-img src="https://ipfs.ilark.io/ipfs/QmX64SjcRdYtWo4MqwZ9kGvwYX3x8DKkqK4zadkvvNtcKy" rounded></b-img>
		
		<p>第三步：回到网站前端(https://yoyo.ilark.io), 点击"开启质押奖励"!</p>
   

    <h4> 安装MetaMask插件钱包</h4>
    <p>建议使用Brave, 或Chrome, 或Opera这几款浏览器，并同时安装MetaMask插件钱包。</p>

    
    <h4>切换到Polygon网络</h4>
		<p>Lark采用的是Polygon网络，所以在使用前需要配置网络参数并切换到Polygon网络（MetaMask中设置），如下所示：</p>
    <p>网络设置：</p>
    <p>Network Name: Polygon </p>
    <p>New RPC URL: https://polygon-rpc.com</p>
    <p>ChainID: 137</p>
    <p>Symbol: MATIC</p>
    <p>Block Explorer URL: https://polygonscan.com</p>



  </div>
</template>

<script>

  export default {
    name: "Newbie",
    data() {
      return {

      }
    },

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

