import React from 'react'
import "./Chart.css"
import { userData } from "../DummyData"; 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart({ title, data, dataKey, grid }) {
  return (
      <div className='chart'>
          <h3 className='charttitle'>{title}</h3>
          <ResponsiveContainer width="100%" aspect={4 / 1}>
              <LineChart data={data}>
                  <XAxis dataKey="name" stroke="black" />
                  <YAxis />
                  <Line type="monotone" dataKey={dataKey} stroke="green" />
                  {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
                  <Tooltip />
                  <Legend />
              </LineChart>
          </ResponsiveContainer>
      </div>
  )
}
