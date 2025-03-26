import Data from '../data/data';

const zoom = 15;
const initialPosition = Data.myPosition;

const initMap = async () => {
  if (typeof google !== 'undefined') {
    const { Map, StyledMapType } = await google.maps.importLibrary('maps');
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
    // Create an array of styles.
    var styles = [
        {
          stylers: [{ hue: '#B3E9FF' }, { saturation: -80 }, { gamma: 0.3 }],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ lightness: 100 }, { visibility: 'simplified' }],
        },
        {
          featureType: 'road',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }],
        },
      ],
      // Create a new StyledMapType object, passing it the array of styles,
      // as well as the name to be displayed on the map type control.
      styledMap = new StyledMapType(styles, { name: 'Styled Map' });

    window.map = new Map(document.getElementById('map'), {
      center: initialPosition,
      zoom: zoom,
      mapId: 'RUNNER_MAP',
      streetViewControl: false,
      zoomControl: false,
      mapTypeControl: false,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'RUNNER_MAP'],
      },
    });

    window.myTrack = new google.maps.Polyline({
      strokeColor: 'red',
      strokeOpacity: 1.0,
      strokeWeight: 6,
    });
    window.myTrackCoordinates = myTrack.getPath();
    myTrack.setMap(map);

    const startLatLng = new google.maps.LatLng(50.061667, 19.937222);

    window.marker = new AdvancedMarkerElement({
      map: window.map,
      position: startLatLng,
    });

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('RUNNER_MAP', styledMap);
    map.setMapTypeId('RUNNER_MAP');
    map.setCenter(initialPosition);
  } // if (google)
}; // function initMap

export default initMap;
