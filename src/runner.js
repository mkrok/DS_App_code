import MkButton from './components/button/button';
import MkApp from './components/app/app';
import MkHeader from './components/header/header';
import MkBody from './components/body/body';
import MkMap from './components/map/map';
import MkCounter from './components/counter/counter';
import MkDistance from './components/distance/distance';
import MkTimer from './components/timer/timer';
import Timer from './state/timer';
import locOnChange from './functions/locOnChange';
import initMap from './functions/initMap';
import './style.css';
import config from './config.json';
import googleMapsBootloader from './functions/googleMapsBootloader';
import state from './state/state';

googleMapsBootloader(config.googleMapsToken);

window.onerror = function (msg, url, lineNo, columnNo, error) {
  const string = msg.toLowerCase();
  const substring = 'script error';
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
  _AddPermissions('Location, Storage, SMS');
  initMap();
  Timer.play();
  window.loc = app.CreateLocator('GPS');
  window.myPosition = { lat: null, lng: null };
  app.SetOrientation('Portrait');
  loc.SetOnChange(locOnChange);
  loc.SetRate(1); // update frequency in seconds
  loc.Start();
  app.TextToSpeech('application started');
};
