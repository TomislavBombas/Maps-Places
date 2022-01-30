let map;
let latitude = 44.432311;
let longitude = 20.636281;
let zoomLevel = 7;
let infoW;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: zoomLevel,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#9b0000"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ]
  });
  
  appendMapPins();
}


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    initMap()
  }
}

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  zoomLevel = 12;
  initMap()
}
const bettyPin = 'https://betty.rs/wp-content/uploads/2018/07/betty-ikonica-mapa-e1531413341200.png';
function appendMapPins () {
  Object.values(places).forEach ((item,index)=>{
    const infoWin = '<div class="content"><h3>'+item['name']+'</h3><p style="font-size:10px;">'+item['address']+'</p></div>';
    const infowindow = new google.maps.InfoWindow({
      content: infoWin,
    });
    
    let marker = new google.maps.Marker({
      position: {lat: item['coords'][0], lng: item['coords'][1]},
      map,
      title: item['name'],
      icon: bettyPin,
    });

    marker.addListener("click", () => {
      if (infoW) {
        infoW.close();
      }
      infoW = infowindow;
      infoW.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    });

    marker.setMap(map);

  });
}

function centerMap (coords) {
  let newCenter = { lat: coords[0], lng: coords[1] };
  map.setCenter(newCenter);
  map.setZoom(15);
}

function populatePharmacyList (){
  let phar = document.getElementById('places');
  let pharTable = document.createElement('table');
  let pharBody = document.createElement('tbody');
  pharTable.appendChild(pharBody)
  phar.appendChild(pharTable);
  let row = document.createElement('tr');
  row.classList.add('headerRow');
  let cell = document.createElement('td');
  cell.innerHTML = 'Apoteka';
  row.appendChild(cell);
  cell = document.createElement('td');
  cell.innerHTML = 'Grad';
  row.appendChild(cell);
  cell = document.createElement('td');
  cell.innerHTML = 'Adresa';
  row.appendChild(cell);
  pharBody.appendChild(row);
  Object.values(places).forEach ((item,index)=>{
    row = document.createElement('tr');
    //row.setAttribute ('lat', item['coords'][0]);
    //row.setAttribute ('lng', item['coords'][1]);
    row.addEventListener('click', ()=>{centerMap(item['coords'])});
    cell = document.createElement('td');
    cell.innerHTML = item['name'];
    row.appendChild(cell);
    cell = document.createElement('td');
    cell.innerHTML = item['city'];
    row.appendChild(cell);
    cell = document.createElement('td');
    cell.innerHTML = item['address'];
    row.appendChild(cell);
    pharBody.appendChild(row);
  });
}

function startMaps (){
  if (Object.values(places).length > 0) {
    places.sort((a,b) => {
      if(a['city'] > b['city']) return 1;
      if(a['city'] < b['city']) return -1;
      return 0;
    });
    populatePharmacyList();
    getLocation();
  }
  
}

window.addEventListener('load', startMaps)