var location_src;
var location_dst;
var autocomplete_src
var autocomplete_dst

function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 10
  });

  var input = document.getElementById('pac-source');
  var destination = document.getElementById('pac-destination');


  autocomplete_src = new google.maps.places.Autocomplete(input);
  autocomplete_dst = new google.maps.places.Autocomplete(destination);

  // autocomplete_src.bindTo('bounds', map);
  // autocomplete_dst.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();


  var marker_src = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  var marker_dst = new google.maps.Marker({
    map:map,
    anchorPoint: new google.maps.Point(0,-35)
  })


  autocomplete_src.addListener('place_changed', function() {
        infowindow.close();
        marker_src.setVisible(false);
        location_src = autocomplete_src.getPlace();

        if (!location_src.geometry) {
          window.alert("Autocomplete's returned place contains no geometry");
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (location_src.geometry.viewport) 
        {
          map.fitBounds(location_src.geometry.viewport);
        } else 
        {
          map.setCenter(location_src.geometry.location);
          map.setZoom(10);  // Why 17? Because it looks good.
        }


        marker_src.setIcon(/** @type {google.maps.Icon} */({
          url: location_src.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(35, 35)
        }));
        marker_src.setPosition(location_src.geometry.location);
        marker_src.setVisible(true);


        var address = '';
        if (location_src.address_components) 
        {
          address = [
            (location_src.address_components[0] && location_src.address_components[0].short_name || ''),
            (location_src.address_components[1] && location_src.address_components[1].short_name || ''),
            (location_src.address_components[2] && location_src.address_components[2].short_name || '')
          ].join(' ');
        }

        infowindow.setContent('<div><strong>' + location_src.name + '</strong><br>' + address);
        infowindow.open(map, marker_src);
  });


  autocomplete_dst.addListener('place_changed', function() {

        infowindow.close();
        marker_dst.setVisible(false);
        location_dst = autocomplete_dst.getPlace();
        
        if (!location_dst.geometry) {
          window.alert("Autocomplete's returned place contains no geometry");
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (location_dst.geometry.viewport) 
        {
          map.fitBounds(location_dst.geometry.viewport);
        } else 
        {
          map.setCenter(location_dst.geometry.location);
          map.setZoom(10);  // Why 17? Because it looks good.
        }


        marker_dst.setIcon(/** @type {google.maps.Icon} */({
          url: location_dst.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(35, 35)
        }));
        marker_dst.setPosition(location_dst.geometry.location);
        marker_dst.setVisible(true);


        var address = '';
        if (location_dst.address_components) 
        {
          address = [
            (location_dst.address_components[0] && location_dst.address_components[0].short_name || ''),
            (location_dst.address_components[1] && location_dst.address_components[1].short_name || ''),
            (location_dst.address_components[2] && location_dst.address_components[2].short_name || '')
          ].join(' ');
        }

        infowindow.setContent('<div><strong>' + location_dst.name + '</strong><br>' + address);
        infowindow.open(map, marker_dst);
  });
}