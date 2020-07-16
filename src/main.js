import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import './global-components'

import AppLayout from './components/AppLayout.vue'

new Vue({
    el: '#app',
    render: h => h(AppLayout),
    // Provide the router to the app
    router,
})