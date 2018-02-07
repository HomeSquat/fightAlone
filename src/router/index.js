import Vue from 'vue'
import Router from 'vue-router'
import faDetails from '@/components/right/faDetails'
import Test from '@/components/right/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'test',
      component: Test
    },
    {
      path: '/fades/:id',
      name: 'fades',
      component: faDetails
    }
  ]
})
