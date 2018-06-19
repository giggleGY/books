import Vue from 'vue'
import Router from 'vue-router'

import BookShelf from '../components/BookShelf.vue'

/*书城*/
import BooksCity from '../components/city/BooksCity.vue'
import Page1 from '../components/city/pages/page1/index.vue';
import Page2 from '../components/city/pages/page2/index.vue';
import Page3 from '../components/city/pages/page3/index.vue';
import Page4 from '../components/city/pages/page4/index.vue';
import Page5 from '../components/city/pages/page5/index.vue';
import Page6 from '../components/city/pages/page6/index.vue';
import Page7 from '../components/city/pages/page7/index.vue';
import Page8 from '../components/city/pages/page8/index.vue';
import Page9 from '../components/city/pages/page9/index.vue';
import Page10 from '../components/city/pages/page10/index.vue';

import cityClassify from '../components/city/cityClassify.vue'
import classDetail from '../components/city/classDetail.vue'


/*小说详情*/
import BookDetail from '../components/BookDetail.vue'
import Reader from '../components/BookDetail/Reader.vue'


import BookClub from '../components/BookClub/BookClub.vue'

import Mine from '../components/Mine/Mine.vue'
import register from '../components/Mine/register.vue'
import login from '../components/Mine/login.vue'

Vue.use(Router);

export default new Router({
  routes: [
      {path: '/', name: 'BookShelf', component: BookShelf},
      /*书城*/
      {path: '/city/BooksCity', name: 'BooksCity', component: BooksCity,
        children:[
          {path:'page1',component:Page1},
          {path:'page2',component:Page2},
          {path:'page3',component:Page3},
          {path:'page4',component:Page4},
          {path:'page5',component:Page5},
          {path:'page6',component:Page6},
          {path:'page7',component:Page7},
          {path:'page8',component:Page8},
          {path:'page9',component:Page9},
          {path:'page10',component:Page10}
        ],redirect:'/city/BooksCity/page1'},
        /*书城分类*/
      {path: '/city/cityClassify', name: 'cityClassify', component: cityClassify},
      {path: '/city/classDetail/:cid', name: 'classDetail', component: classDetail},

      {path: '/BookDetail/:book_name', name: 'BookDetail', component: BookDetail},
      {path: '/BookDetail/Reader/:bid', name: 'Reader', component: Reader},



      {path: '/BookClub/BookClub', name: 'BookClub', component: BookClub},
      {path: '/Mine/Mine', name: 'Mine', component: Mine},
      {path: '/Mine/register', name: 'register', component: register},
      {path: '/Mine/login', name: 'login', component: login}
  ]
})
