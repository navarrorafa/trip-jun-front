import React, { useContext, useEffect, useState } from 'react'
import { Tooltip, YAxis, Legend, XAxis, CartesianGrid, LineChart, BarChart, Line, Bar, ResponsiveContainer } from "recharts";
import { useFetch } from '../../hook/useFetch';
import { UserContext } from '../../context/UserContext';

export const GraphicsCorto = () => {
  const [user, setUser] = useState()
  const { userStatus } = useContext(UserContext);
  const { uid } = userStatus
  const url = `http://localhost:3000/api/v1/consulta/corta/${uid}`;
  const response = useFetch(url, "GET");
  const { data } = response;

  useEffect(() => {

    setUser(data)

  }, [response])

  let history = [];
  let historialReverso = [];

  if (user && Array.isArray(user.data)) {

    historialReverso = user.data.map((item, index) => ({

      date: item.fecha, 
      barrio: item.neighbourhood_encoded, 
      bedrooms: " Habs: " + item.bedrooms,
      estrellas:  item.Grouped_reviews + " / 5★",
      min: item.precio_minimo_estancia,
      max: item.precio_maximo_estancia

    }))
      .reverse();

    history = historialReverso.slice(0, 5);
  }

  return (

    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={800} height={500} data={history}>
        <Bar dataKey="min" fill="#2196F3" />
        <Bar dataKey="max" fill="#0D4FD4" />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis xAxisId="0" dataKey="date" tick={false} />
        <XAxis xAxisId="1" dataKey="barrio" dx={5} />
        <XAxis xAxisId="2" dataKey="estrellas" />
        <XAxis xAxisId="3" dataKey="bedrooms" />
        <YAxis />
        <Tooltip />
        <Legend />
      </BarChart>
    </ResponsiveContainer>


  )



}
