//状态树
const state = {
    isLogin: false,
    user: {
        uid: '',
        name: '',
        password: ''
    } 
}

//过滤器
const getters = {
    doneTodos: state => {
        return state.todos.filter(todo => todo.done);
    }
}

//变化方法
const mutations = {
    change: (state,userinfo) => {
        state.isLogin = true;
        state.user.uid = userinfo.uid;
        state.user.name = userinfo.name;
        state.user.password = userinfo.password;
    },
    cancel: (state) => {
        state.isLogin = false;
        state.user.uid = '';
        state.user.name = '';
        state.user.password = '';
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