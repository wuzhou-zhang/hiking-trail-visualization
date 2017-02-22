var map = new mapboxgl.Map({
   container: 'map',
   style: 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json',
   center: [-122.03096808382432, 37.32132523505534],
   zoom: 19
});
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');