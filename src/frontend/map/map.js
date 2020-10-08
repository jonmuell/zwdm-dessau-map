import axios from "axios";

import EventView from "../event/event.vue";

export default {
    name: "map-view",
    components: {EventView},
    mounted: function () {
        this.$nextTick(() => {
            mapboxgl.accessToken = this.MAPBOX_API_KEY;
            this.initMap(this.map);
        });
    },
    data: () => {
        return {
            MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
            defaultSidebar: {
                title: "Title",
                description: "Description",
                address: "Adresse"
            },
            currentLocationId: null,
            locations: [],
            events: []
        }
    },
    computed: {
        currentLocation: function () {
            return this.locations.filter(entry => entry.id === this.currentLocationId)[0];
        },
        sidebar: function () {
            if (this.currentLocationId) {
                this.getEvents();
                const obj = this.currentLocation;

                return {
                    title: obj.title,
                    description: obj.description,
                    address: obj.address
                };
            } else {
                return this.defaultSidebar
            }
        },
        map: () => new mapboxgl.Map({
            container: 'map',
            center: [12.24, 51.83],
            zoom: 14,
            style: 'mapbox://styles/zeigwasdumachst/ckfjtlbo32i5a19ntppurfagk'
        })
    },
    methods: {
        getEvents: function () {
            this.events = [];
            const pageName = this.currentLocation.fbPageName;

            axios.get("/data/events", {params: {pageName}})
            .then((res) => {
                this.events = res.data;
            })
            .catch((err) => {
                this.events = [];
                console.error(err);
            });
        },
        initMap: function (map) {
            const vm = this;
            map.on('load', function () {
                axios.get("/data")
                .then((res) => {
                    vm.locations = res.data;
                    const mapData = vm.locations.map((entry) => {
                        return {
                            'type': 'Feature',
                            'properties': {
                                'id': entry.id,
                                'description': entry.title,
                                'icon': entry.icon
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [entry.position.lon,
                                    entry.position.lat]
                            }
                        }
                    });

                    map.addSource('places', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': mapData
                        }
                    });

                    // Add a layer showing the places.
                    map.addLayer({
                        'id': 'places',
                        'type': 'symbol',
                        'source': 'places',
                        'layout': {
                            'text-field': ['get', 'description'],
                            'text-variable-anchor': ['top', 'bottom', 'left',
                                'right'],
                            'text-radial-offset': 0.5,
                            'text-justify': 'auto',
                            'icon-image': '{icon}-15',
                            'icon-allow-overlap': true
                        }
                    });

                    // When a click event occurs on a feature in the places layer, open a popup at the
                    // location of the feature, with description HTML from its properties.
                    map.on('click', 'places', function (e) {
                        const id = e.features[0].properties.id;
                        vm.currentLocationId = id;
                    });

                    // Change the cursor to a pointer when the mouse is over the places layer.
                    map.on('mouseenter', 'places', function () {
                        map.getCanvas().style.cursor = 'pointer';
                    });

                    // Change it back to a pointer when it leaves.
                    map.on('mouseleave', 'places', function () {
                        map.getCanvas().style.cursor = '';
                    });
                })
                .catch((err) => {
                    console.error(err);
                })

            });

        }
    }
}