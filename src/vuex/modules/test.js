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
const mutations = {
    add: (state) => {
        state.count++;
    },
    reduce: (state) => {
        state.count--;
    }
}

//异步的变换方法
const actions = {
    addAction: (context) => {
        context.commit('add');
        setTimeout(() => {
           context.commit('reduce'); 
        }, 2000);
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}