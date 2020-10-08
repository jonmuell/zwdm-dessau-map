import Vue from 'vue'
import MapView from "./map/map.vue";

new Vue({
    el: "#app",
    components: {MapView},
    render: h => h(MapView)
});