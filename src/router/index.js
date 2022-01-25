import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'

import Test from '../components/Test'
import ArtNft from '../components/ArtNft'
import CreateNft from '../components/CreateNft'
import PhotoNft from '../components/PhotoNft'
import CreatePhotoNft from '../components/CreatePhotoNft'

import Pool from '../components/Pool'
import SlpFarm from '../components/farm/SlpFarm'

import Wallet from "../components/Wallet"
import Contract from "../components/about/Contract"
import Contact from "../components/about/Contact"
import DelegatorLists from "../components/about/DelegatorLists"
import Newbie from "../components/about/Newbie"


Vue.use(VueRouter)

const routes = [
	{
	  path: '/test',
	  name: 'test',
	  component: Test,
	},
	{
	  path: '/art',
	  name: 'ArtNft',
	  component: ArtNft,
	},
	{
	  path: '/photograph',
	  name: 'PhotoNft',
	  component: PhotoNft,
	},
  {
    path: '/',
    name: 'pool',
    component: Pool,
		meta:{
				requireAuth:true
		}
  },
  {
    path: '/farm',
    name: 'slpfarm',
    component: SlpFarm,
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
	  path: '/newbie',
	  name: 'newbie',
	  component: Newbie
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
