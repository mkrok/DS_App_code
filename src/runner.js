// import '@fontsource/inter';
import MkButton from './components/button/button';
import MkApp from './components/app/app';
import MkHeader from './components/header/header';
import MkBody from './components/body/body';
import MkMap from './components/map/map';
import locOnChange from './functions/locOnChange';
import initMap from './functions/initMap';

var map;
window.onerror = function (msg, url, lineNo, columnNo, error) {
  var string = msg.toLowerCase();
  var substring = 'script error';
  if (string.indexOf(substring) > -1) {
    alert('Script Error: See Browser Console for Detail');
  } else {
    var message = [
      'Message: ' + msg,
      'URL: ' + url,
      'Line: ' + lineNo,
      'Column: ' + columnNo,
      'Error object: ' + JSON.stringify(error),
    ].join(' - ');
    alert(message);
  }
  return false;
};

window.onload = function () {
  try {
    window.loc = app.CreateLocator('GPS');
    window.myPosition = { lat: null, lng: null };
    app.SetOrientation('Portrait');
    loc.SetOnChange(locOnChange);
    loc.SetRate(0); //as often as possible
    loc.Start();
  } catch {
    console.error('Error creating the app locator');
  }
  map = initMap();
};
