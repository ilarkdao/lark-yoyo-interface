import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'

import Test from '../components/Test'
import ArtNft from '../components/ArtNft'
import CreateNft from '../components/CreateNft'
import PhotoNft from '../components/PhotoNft'
import CreatePhotoNft from '../components/CreatePhotoNft'

import Pool from '../components/Pool'
import Bridge from '../components/Bridge'
import LarkFarm from '../components/farm/LarkFarm'
import WyoyoLp from '../components/farm/WyoyoLp'

import Wallet from "../components/Wallet"
import Contract from "../components/about/Contract"
import Contact from "../components/about/Contact"
import DelegatorLists from "../components/about/DelegatorLists"


Vue.use(VueRouter)

const routes = [
	// {
	//   path: '/test',
	//   name: 'test',
	//   component: Test,
	// },
	{
	  path: '/',
	  name: 'ArtNft',
	  component: ArtNft,
	},
	{
	  path: '/photograph',
	  name: 'PhotoNft',
	  component: PhotoNft,
	},
  {
    path: '/pool',
    name: 'pool',
    component: Pool,
		meta:{
				requireAuth:true
		}
  },
	
	{
	  path: '/bridge',
	  name: 'bridge',
	  component: Bridge,
		meta:{
				requireAuth:true
		}
	}, 
	
	{
	  path: '/wyoyofarm',
	  name: 'WyoyoLp',
	  component: WyoyoLp,
	  meta:{
	    requireAuth:true
	  }
	},
  {
    path: '/larkfarm',
    name: 'larkfarm',
    component: LarkFarm,
    meta:{
      requireAuth:true
    }
  },

  {
    path: '/art',
    name: 'CreateNft',
    component: CreateNft,
    meta:{
      requireAuth:true
    }
  },
	{
	  path: '/createphoto',
	  name: 'CreatePhotoNft',
	  component: CreatePhotoNft,
	  meta:{
	    requireAuth:true
	  }
	},

  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/wallet',
    name: 'wallet',
    component: Wallet,
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/contract',
    name: 'contract',
    component: Contract
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/delegatorlists',
    name: 'delegatorlists',
    component: DelegatorLists
  },

]

const router = new VueRouter({
  mode: 'history',
  // mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
