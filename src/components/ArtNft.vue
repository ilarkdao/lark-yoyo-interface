<template>
  <div class="article">
    <b-input
      id="inline-form-input-name"
      class="mb-2 mr-sm-2 mb-sm-0 search"
      placeholder="search" v-model="keywords"
    ></b-input>

    <div class="lists">
        <!--列表-->
        <b-container class="bv-example-row">
          <b-row >
              <b-col sm="12" md="6" lg="4" v-for="post in search(keywords)">
                <div class="content" >
									<b-img :src="post.image" fluid-grow rounded class="courseimg"></b-img>
                  <div class="title">
                    <span style="font-size: 1.2rem">{{ post.name }}</span><br>
                    <p class="posttime"><span style="margin-right: 0.7rem">@{{post.attributes[0].value}}</span>   
										{{timeFormat(post.attributes[1].value)}} </p> 
                  </div>
                  <p style="padding: 0 1rem 2.5rem 1rem">{{ post.description | abstractFn }}</p>
									<div class="opensealink">- <a :href=openseaLink+post.id target="_blank" class="openseatext">{{ $t('message.opensea') }}</a> - </div>
                </div>
								
              </b-col>
          </b-row>
        </b-container>

        <div style="clear:both;"></div>
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
              {{ maskInfo }} <br>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- <div class="btn">
      <b-button variant="outline-primary" @click="getNext">more</b-button>
    </div> -->
  </div>
</template>

<script>
    import SmallLoading from './SmallLoading'
    export default {
        name: "ArtNft",
      data(){
          return{
            keywords:'',
            posts:[],
            author:'',
            permlink:'',
            isLoading: true,

            showMask:false,
            maskInfo:"",
            hash: '',

          }
      },
      methods:{
				async getAllURI(){
					let instance = this.$store.state.artInstance2
				
					// let xid = await instance.methods.id().call()
					// console.log(22, "id", xid) //ownerOf
					// let owner = await instance.methods.ownerOf(id).call()
					// console.log(68, owner)
					
					let uri = await instance.methods.getAllURI().call()				
					let work = []
					for(let i = 0; i < uri.length; i ++){					
						// this.getContent(uri[i].slice(-46))
						let res = await this.getContent(uri[i].slice(-46))
						res.id = i
						work.push(res)
					}
					
					this.posts = work.reverse()

					//将得到的数据存入vuex中
					this.$store.commit('saveCreated', this.posts)
				},
				utf8ArrayToStr(array) {
				  let out, i, len, c
				  let char2, char3
				  out = ""
				  len = array.length
				  i = 0
				  while(i < len) {
				      c = array[i++]
				      switch(c >> 4)
				      {
				          case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
				          // 0xxxxxxx
				          out += String.fromCharCode(c)
				          break
				          case 12: case 13:
				          // 110x xxxx   10xx xxxx
				          char2 = array[i++]
				          out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F))
				          break
				          case 14:
				              // 1110 xxxx  10xx xxxx  10xx xxxx
				              char2 = array[i++];
				              char3 = array[i++];
				              out += String.fromCharCode(((c & 0x0F) << 12) |
				                  ((char2 & 0x3F) << 6) |
				                  ((char3 & 0x3F) << 0))
				              break
				      }
				  }
				  return out
				},
				async getContent(hash){
					for await (const chunk of this.ipfs.cat(hash)) {
						return JSON.parse(this.utf8ArrayToStr(chunk))
					}
				},
        search(keywords){
          let posts = this.posts
          return posts.filter(item => {
            if(item.name.includes(keywords)){
              // console.log(166, '查到了！')
              return item
            }
          })
        },

      },

      components: {
        SmallLoading
      },

      mounted() {
        let that = this
        let instance = this.$store.state.artInstance2
        async function main(){
          if(Object.keys(instance).length === 0){
            //如果刷新页面, instance未定义
            // console.log(888, "instance为空，是刷新页面")
            await that.getArtInstance()
						await that.getLarkInstance()
						await that.getAllURI()
            that.isLoading = false
          } else{
      			// console.log(444, "切换页面")				
						if(that.$store.state.created != false){
							that.posts = that.$store.state.created
							that.isLoading = false
						}else{
							await that.getAllURI()
							that.isLoading = false
						}
						
          }
      
        }
        main()
      },

      filters:{
				abstractFn(res){
					return res.substring(0,180)
				},
        
        
      },
    }
</script>

<style scoped>

  .article{
    /* margin-top: 3rem; */
    width: 80%;
    margin: 0 auto;
  }
  .lists{
    width: 85%;
    margin: 0 auto;
  }
  .posttime{
    font-size: 0.8rem;
    display: inline;
  }

  .content{
    color: rgba(55,53,58,0.75);
    /* float: left; */
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    /* height: 30rem; */
		height:95%;
    border: 1px solid #ebebeb;
    box-shadow: 3px 3px 2px #ebebeb;
  }


  .content2{
    color: rgba(55,53,58,0.75);
    align: center;
    margin: 3rem auto;
    padding-bottom: 0.5rem;
    width: 50%;
    border: 1px solid #ddd;
    box-shadow: 5px 5px 3px #ebebeb;
    /*background-color: rgba(58,46,52,0.04);*/
  }
  .title{
    text-align: center;
    width: 95%;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
	
 .courseimg{
		max-width: 100%; 
		height: auto;
  }
	
	.opensealink{
		text-align: center;
		margin-bottom: 1rem;
		height: 4rem; 
		padding-top: 1rem;
		padding-left: 3rem;
		padding-right: 3rem;
		position:absolute;
		bottom:0px;
	}
	.openseatext{
		color:#80722f;
	}
  a{
    color: rgba(55,53,58,0.75);
  }

  a:hover{
    color: darkcyan;
    text-decoration: none;
  }

  .btn{
    display: block;
    margin: 0 auto;
    margin-bottom: 1rem;
  }
  .btn-outline-primary {
    color: rgba(55,53,58,0.75);
    border-color: rgba(55,53,58,0.75);
  }
  .btn-outline-primary:hover{
    background-color: chocolate;
    border: none;
  }

  .search{
    margin: 0.5rem auto !important;
    width: 80%;
  }

</style>
