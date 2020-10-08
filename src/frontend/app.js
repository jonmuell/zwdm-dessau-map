import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import MapView from "./map/map.vue";
import AddDataView from "./addData/addData.vue";

let routes = [
    {path: '/', component: MapView},
    {path: '/add', component: AddDataView}
]

let router = new VueRouter({routes})

new Vue({router}).$mount('#app');