var map = L.map('map').setView([37.518943, -122.138206], 10);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([37.714592, -122.102062]).addTo(map)
    .bindPopup("<b>Upcoming: Saturday 2pm Lake Chabot Regional Park</b>");

$.getJSON('trails_index.json', function(data) {
    console.debug(data);
    var numTrails = data['numTrails'];
    document.getElementById('caption').innerHTML = "Wuzhou's " + numTrails + " Hikes in Bay Area (and Beyond)";
    for (var i = 0; i < numTrails; i++) {
        var trail = data[i];
        $.getJSON('json_data/' + trail + '.json', function(data) {
            // map.addLayer(constructGtPathLayer(data['trace']));
            var hikeName = data['hikeName'];
            var startPoint = data['trace'][0];
            L.marker([startPoint[0], startPoint[1]]).addTo(map)
                .bindPopup("<b>" + hikeName + "</b>");
        });
    }
});


function constructGtPathLayer(fixErrorData) {
    var geojson = createGtPathGeojson(fixErrorData);

    var gtPathGeojson = L.geoJson(geojson, {
        style: function(feature, latlng) {
            var style = {
                fillColor: '#FF7F00',
                weight: 2,
                opacity: 0.5,
                color: 'blue',
                fillOpacity: 0.5
            };
            return style;
        },
        onEachFeature: function (feature, layer) {
            layer.on({
                mouseover: function(e) {
                    // TODO
                },
                mouseout: function(e) {
                    // TODO
                }
            });
        }
    });

    return gtPathGeojson;
}


function createGtPathGeojson(fixErrorData) {
    var featureList = [];

    for (var idx = 1; idx < fixErrorData.length; idx++) {
        var feature = {
            geometry: {
                type: 'LineString',
                coordinates: [
                    [ fixErrorData[idx - 1][1], fixErrorData[idx - 1][0] ],
                    [ fixErrorData[idx][1], fixErrorData[idx][0] ]
                ]
            },
            type: 'Feature',
            properties: {
                // TODO
            }
        };

        featureList.push(feature);
    }

    var featureCollection = {
        type: 'FeatureCollection',
        features: featureList
    };

    return featureCollection;
}