import Home from './pages/Home/Home.vue'
import Login from './pages/Login/Login.vue'

let routes = [{
        path: '/',
        component: Home,
        name: '',
        hidden: true
    },
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    }
]

export default routes