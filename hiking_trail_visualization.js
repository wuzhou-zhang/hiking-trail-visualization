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

L.marker([37.666090, -122.494576]).addTo(map)
    .bindPopup("<b>Upcoming: Saturday 2pm Coastal Hike from Mussel Rock to Cliff House</b>");



$.getScript('moment.min.js', function () {
$.getScript('togeojson.js', function () {
    $.getJSON('trails.json', function(data) {
        console.debug(data);
        var numTrails = data['numTrails'];
        document.getElementById('caption').innerHTML = "Wuzhou's " + numTrails + " Hikes in Bay Area (and Beyond)";
        for (var i = 0; i < numTrails; i++) {
            var trail = data[i];
            $.ajax('data/' + trail).done(function(gpx) {
                // The first argument of toGeoJSON.gpx(...) must be a GPX document as an XML DOM - not as a string.
                var geoJSON = toGeoJSON.gpx(toDOM(gpx));
                L.geoJSON(geoJSON).addTo(map);
                var startPoint = getHikeStartPoint(geoJSON);
                var hikeName = getHikeName(geoJSON);
                var hikeTime = getHikeTime(geoJSON); // In PST
                L.marker([startPoint[1], startPoint[0]]).addTo(map)
                    .bindPopup("<b>" + hikeName + "</b><br>" + hikeTime);
            });
        }
    });
});
});

function getHikeStartPoint(geoJSON) {
    return geoJSON["features"][0]["geometry"]["coordinates"][0];
}

function getHikeName(geoJSON) {
    return geoJSON["features"][0]["properties"]["name"];
}

function getHikeTime(geoJSON) {
    var hikeTimeInUTC = geoJSON["features"][0]["properties"]["time"].replace("T", " ").replace("Z", "");
    var hikeTime = moment(hikeTimeInUTC);
    hikeTime.subtract('hours', 8); // The offset between PST and UTC is 8 hours
    return hikeTime.format('YYYY-MM-DD HH:mm:ss');
}