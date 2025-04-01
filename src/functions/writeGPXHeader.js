const writeGpxHeader = (log, activity) => {
  const header =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<gpx version="1.1" creator="Run.apk mk12ok" ' +
    'xsi:schemaLocation="http://www.topopgrafix.com/GPX/1/1 ' +
    'http://www.topografix.com/GPX/1/1/gpx.datStringxsd ' +
    'http://www.garmin.com/xmlschemas/GpxExtensions/v3 ' +
    'http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd ' +
    'http://www.garmin.com/xmlschemas/TrackPointExtension/v1 ' +
    'http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd" ' +
    'xmlns="http://www.topografix.com/GPX/1/1" ' +
    'xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" ' +
    'xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" ' +
    'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n';
  app.WriteFile(log, header, 'Append');
  app.WriteFile(log, '  <trk>\n' + '    <type>' + activity.toUpperCase() + '</type>\n' + '    <trkseg>\n', 'Append');
};

export default writeGpxHeader;
