import Vue from 'vue'
import Router from 'vue-router'
import Right from '@/components/right/right'
import Test from '@/components/test/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Right
    },
    {
      path: '/news/:id',
      name: 'news',
      component: Test
    }
  ]
})
