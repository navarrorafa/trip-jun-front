import React, { useEffect, useState } from 'react';

import { dataFetch } from '../../helpers/dataFetch';
import { Tooltip, YAxis, Legend, XAxis, CartesianGrid, Line, Bar, LineChart, BarChart } from "recharts"
import { useFetch } from '../../hook/useFetch';




export const Graphics = () => {
  const [infouser, setInfouser] = useState("")
  const url = "http://localhost:3000/api/v1/consulta/qMWcVHfDngYKJ6wiAUswa2UhAq12"
  const response = useFetch(url, "GET")
  const { data } = response

  console.log(response)
  console.log(data.data)
  const history = data.data

  console.log(history)

  const mapeado = () => {
    history.map((item, index) =>{
if(index<=6) {
  <p>{item.fecha}</p>
}

      
    })

  }
  /*const historial = [

    { anyo: { fecha: data.data[0].fecha, barrio: "Barrio: " + data.data[0].barrio, habit: " Habitaciones: " + data.data[0].hab }, precio: data.data[0].area },
    { anyo: { fecha: data.data[1].fecha, barrio: "Barrio: " + data.data[1].barrio, habit: " Habitaciones: " + data.data[1].hab }, precio: data.data[1].area },
    { anyo: { fecha: data.data[2].fecha, barrio: "Barrio: " + data.data[2].barrio, habit: " Habitaciones: " + data.data[2].hab }, precio: data.data[2].area },
    { anyo: { fecha: data.data[3].fecha, barrio: "Barrio: " + data.data[3].barrio, habit: " Habitaciones: " + data.data[3].hab }, precio: data.data[3].area },
    { anyo: { fecha: data.data[4].fecha, barrio: "Barrio: " + data.data[4].barrio, habit: " Habitaciones: " + data.data[4].hab }, precio: data.data[4].area },

  ]*/




  return (
    <div></div>
  )

}