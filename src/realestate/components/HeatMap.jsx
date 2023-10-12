import React from 'react'
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer } from "react-leaflet"
export const HeatMap = () => {
  return (

    <MapContainer className="z-10" center={[40.399, -3.683]} zoom={12}>
      <TileLayer attribution="" url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" foo='bar' />
    </MapContainer>
  )
}