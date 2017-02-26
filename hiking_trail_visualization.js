var map = L.map('map').setView([37.518943, -122.138206], 10);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function toDOM(_) {
    if (typeof DOMParser === 'undefined') {
        return (new xmldom.DOMParser()).parseFromString(_.toString());
    } else {
        return (new DOMParser()).parseFromString(_, 'text/xml');
    }
}

$.getScript('togeojson.js', function () {
    $.getJSON('trails.json', function(data) {
        console.debug(data);
        console.log(data['numTrails']);
        for (var i = 0; i < data['numTrails']; i++) {
            var trail = data[i];
            $.ajax('data/' + trail).done(function(gpx) {
                // The first argument of toGeoJSON.gpx(...) must be a GPX document as an XML DOM - not as a string.
                var geoJSON = toGeoJSON.gpx(toDOM(gpx));
                L.geoJSON(geoJSON).addTo(map);
                startPoint = getHikeStartPoint(geoJSON);
                hikeName = getHikeName(geoJSON);
                hikeTime = getHikeTime(geoJSON);
                L.marker([startPoint[1], startPoint[0]]).addTo(map)
                    .bindPopup("<b>" + hikeName + "</b><br>" + hikeTime);
            });
        }
    });
});

function getHikeStartPoint(geoJSON) {
    return geoJSON["features"][0]["geometry"]["coordinates"][0];
}

function getHikeName(geoJSON) {
    return geoJSON["features"][0]["properties"]["name"];
}

function getHikeTime(geoJSON) {
    return geoJSON["features"][0]["properties"]["time"].replace("T", " ").replace("Z", "\n");
}