
	mapboxgl.accessToken ="pk.eyJ1Ijoia2IxMmtlc2hhdiIsImEiOiJjbWJnaWphZmUwNzVwMmxwaDU2ZWVocW04In0.5RdRxBssv00wv9usPkbz4A";
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });
  
  // Add marker at provided coordinates
  new mapboxgl.Marker({ color: 'red' })
    .setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup({offset: 25, className: 'my-class'})
    .setHTML("<p>Exact location provided after booking</p>")
    .setMaxWidth("300px"))
    .addTo(map);

