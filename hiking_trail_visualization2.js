var map = L.map('map').setView([37.518943, -122.138206], 10);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([37.714592, -122.102062]).addTo(map)
    .bindPopup("<b>Upcoming: Saturday 2pm Lake Chabot Regional Park</b>");

$.getJSON('trails.json', function(data) {
    console.debug(data);
    var numTrails = data['numTrails'];
    document.getElementById('caption').innerHTML = "Wuzhou's " + numTrails + " Hikes in Bay Area (and Beyond)";
    for (var i = 0; i < numTrails; i++) {
        var trail = data[i];
        console.log(trail);
    }
});