var map = L.map('map').setView([37.2869580, -122.0506130], 15);

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
	$.ajax('data/Fremont_Older_Open_Space_Preserve_Hike.gpx').done(function(gpx) {
        // The first argument of toGeoJSON.gpx(...) must be a GPX document as an XML DOM - not as a string.
        var geoJSON = toGeoJSON.gpx(toDOM(gpx));
        console.log(geoJSON);
        L.geoJSON(geoJSON).addTo(map);
	});
});

