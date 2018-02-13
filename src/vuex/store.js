import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


//状态树
const state = {
    count: 100,
    todos: [
        { id: 1, text: '...', done: true },
        { id: 1, text: '...', done: true },
        { id: 2, text: '...', done: false }
      ]
}

//过滤器
const getters = {
    doneTodos: state => {
        return state.todos.filter(todo => todo.done);
    }
}

//变化方法
const mutation = {
    increment : state => {
        state.count++;
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutation
})