import { useEffect } from 'react';
import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import styles from './Map.module.css';
import iconUrl from '../../assets/icons/icons8-van-64.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const { MapContainer } = ReactLeaflet;

const Map = ({ children, className, ...rest }) => {
  let mapClassName = styles.map;

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete L.Icon.Default.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: shadowUrl.src,
        iconAnchor:[20,20],
        shadowAnchor:[20,30]
      });
    })();
  }, []);

  return (
    <MapContainer className={mapClassName} {...rest}>
      {children(ReactLeaflet)}
    </MapContainer>
  )
}

export default Map;