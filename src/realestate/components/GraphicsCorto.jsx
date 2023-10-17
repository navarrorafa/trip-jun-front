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


      console.log(response);
  console.log(user);

  let history = [];
  let historialReverso = [];

  if (user && Array.isArray(user.data)) {

    historialReverso = user.data.map((item, index) => ({

      anyo: { fecha: item.fecha, barrio: "Barrio: " + item.neighbourhood_encoded, bedrooms: " Habitaciones: " + item.bedrooms },
      min: item.precio_minimo_estancia,
      max:  item.precio_maximo_estancia

    }))
      .reverse();

    history = historialReverso.slice(0, 5);
  }

  console.log(history);



  return (

   <ResponsiveContainer width="100%" height="100%">
    <BarChart width={800} height={500} data={history}>
      <Bar dataKey="min" fill="#2196F3" />
      <Bar dataKey="max" fill="#0D4FD4" />
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis xAxisId="0" dataKey="anyo.fecha" />
      <XAxis xAxisId="1" dataKey="anyo.barrio" />
      <XAxis xAxisId="2" dataKey="anyo.habit" />
      <YAxis />
      <Tooltip />
      <Legend />
    </BarChart>
</ResponsiveContainer>  
  
  
    )



}
