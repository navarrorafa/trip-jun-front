import React, { useContext, useEffect, useState } from 'react';
import { Tooltip, YAxis, Legend, XAxis, CartesianGrid, LineChart, BarChart, Line, Bar, ResponsiveContainer } from "recharts";
import { useFetch } from '../../hook/useFetch';
import { UserContext } from '../../context/UserContext';

export const Graphics = () => {
  const [user, setUser] = useState()
  const { userStatus } = useContext(UserContext);
  const { uid } = userStatus
  const url = `http://localhost:3000/api/v1/consulta/${uid}`;
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

      fecha: item.fecha, 
      barrio: item.barrio, 
      habit: "Cuartos:" + item.hab ,
      precio: item.prediction
    }))
      .reverse();

    history = historialReverso.slice(0, 8);
  }

  console.log(history);

  return (

    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={800} height={500} data={history}>
        <Bar dataKey="precio" fill="#2196F3" />
        
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis xAxisId="0" dataKey="fecha" tick={false} />
        <XAxis xAxisId="1" dataKey="barrio" dx={5}/>
        <XAxis xAxisId="2" dataKey="habit" dx={5}  />
        <YAxis />
        <Tooltip />
        <Legend />
      </BarChart>
      </ResponsiveContainer>
   

  );
};
