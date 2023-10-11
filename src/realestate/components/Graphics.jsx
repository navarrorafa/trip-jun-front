import React from 'react'
import { Tooltip, YAxis, Legend, XAxis, CartesianGrid, Line, LineChart } from "recharts"
const data = [
    { anyo: "2017", data: 32, cyber: 27, full: 10 },
    { anyo: "2018", data: 52, cyber: 37, full: 40 },
    { anyo: "2019", data: 12, cyber: 17, full: 30 },
    { anyo: 2020, data: 12, cyber: 20, full: 150 }]
export const Graphics = () => {
  return (
    <LineChart width={800} height={500} data={data}>
            <Line type="monotone" dataKey="data" stroke="#2196F3" />
            <Line type="monotone" dataKey="cyber" stroke="#8DCA46" />
            <Line type="monotone" dataKey="full" stroke="#00875D" />
            <CartesianGrid />
            <XAxis dataKey="anyo" />
            <YAxis />
            <Tooltip />
            <Legend />
        </LineChart>
  )
}