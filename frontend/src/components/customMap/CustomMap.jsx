import { useState } from 'react';
import {
  APIProvider,
  Marker,
  InfoWindow,
  Map,
} from '@vis.gl/react-google-maps';
import './Styles.css';

export default function CustomMap({ lat, lng }) {
  const [markerLocation, setMarkerLocation] = useState({
    lat: lat,
    lng: lng,
  });
  const [open, setOpen] = useState();

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div className='map-container'>
        <Map
          style={{ borderRadius: '20px' }}
          defaultZoom={14}
          defaultCenter={markerLocation}
          gestureHandling={'greedy'}
          disableDefaultUI
        >
          <Marker position={markerLocation} onClick={() => setOpen(true)} />

          {open && (
            <InfoWindow
              position={markerLocation}
              onCloseClick={() => setOpen(false)}
            >
              <p>Ubicación</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
