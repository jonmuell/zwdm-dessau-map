const axios = require("axios");

var map = new mapboxgl.Map({
    container: 'map',
    center: [12.24, 51.83],
    zoom: 14,
    style: 'mapbox://styles/zeigwasdumachst/ckfjtlbo32i5a19ntppurfagk'
});

map.on('load', function () {
    axios.get("/data")
    .then((res) => {
        const data = res.data;
        const mapData = data.map((entry) => {
            return {
                'type': 'Feature',
                'properties': {
                    'id': entry.id,
                    'description': entry.title,
                    'icon': entry.icon
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [entry.position.lon, entry.position.lat]
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
                'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
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

            const obj = data.filter(entry => entry.id === id)[0];

            $("#title").html(obj.title);
            $("#description").html(obj.description);
            $("#address").html(obj.address);
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
