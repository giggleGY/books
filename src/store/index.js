import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import localEvent from './local'

Vue.use(Vuex);

const state = {
  lastChapter:1,
  footer:true,
  bar: false,
  font_panel: false,
  font_icon: false,
  bg_color: 1,
  bg_night: false,
  fz_size: 18,
  curChapter: 0,
  windowHeight: '',
  list_panel: false,
  curBookDetailId: 1,
  curBookContentId: 1,
  isBack:false,
  userInfo: { //保存用户信息
      nick: null,
      ulevel: null,
      uid: null,
      portrait: null
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
