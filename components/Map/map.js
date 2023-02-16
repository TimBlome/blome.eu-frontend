import { useEffect } from "react"
import L from "leaflet"
import * as ReactLeaflet from "react-leaflet"
import "leaflet/dist/leaflet.css"

import styles from "./map.module.css"

const { MapContainer } = ReactLeaflet
const iconUrl = "/icons8-van-64.png"
const shadowUrl = "/marker-shadow.png"

const Map = ({ children, className, ...rest }) => {
  let mapClassName = styles.map

  if (className) {
    mapClassName = `${mapClassName} ${className}`
  }
  useEffect(() => {
    ;(async function init() {
      delete L.Icon.Default.prototype._getIconUrl

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconUrl,
        iconUrl: iconUrl,
        shadowUrl: shadowUrl,
        iconAnchor: [20, 20],
        shadowAnchor: [20, 30],
      })
    })()
  }, [])

  return (
    <MapContainer className={mapClassName} {...rest}>
      {children(ReactLeaflet)}
    </MapContainer>
  )
}

export default Map
