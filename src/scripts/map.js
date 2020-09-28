const data = [
  {
    "id": "ZWDM",
    "title": "Zeig was du machst!",
    "description": "Ein toller Laden"
  }
];

var map = new mapboxgl.Map({
    container: 'map',
    center: [12.24, 51.83],
    zoom: 14,
    style: 'mapbox://styles/zeigwasdumachst/ckfjtlbo32i5a19ntppurfagk'
});

// var marker = new mapboxgl.Marker()
// .setLngLat([12.246593, 51.836805])
// .addTo(map);

map.on('load', function () {
    map.addSource('places', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'id': 'ZWDM',
                        'icon': 'theatre'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [12.246593, 51.836805]
                    }
                },
            ]
        }
    });

// Add a layer showing the places.
    map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
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
    });

// Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

// Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';
    });
});
