import React from 'react'
import './Graph.css';
import PieChart from './PieChart'
import PieChart2 from './PieChart2'
import Form from './Form'
import {LineChart,ResponsiveContainer,Legend, Tooltip,Line,XAxis,YAxis,CartesianGrid} from 'recharts';


// Sample chart data
const pdata = [
    {
        month: 'January',//name
        rate: 4, //student
        satisfaction: 90
    },
    {
        month: 'February',
        rate: 3,
        satisfaction: 60
    },
    {
        month: 'March',
        rate: 2,
        satisfaction: 40
    },
    {
        month: 'April',
        rate: 5,
        satisfaction: 98
    },
    {
        month: 'May',
        rate: 4,
        satisfaction: 70
    },
    {
        month: 'June',
        rate: 4,
        satisfaction: 75
    },
    {
        month: 'July',
        rate: 4,
        satisfaction: 69
    },
    {
        month: 'August',
        rate: 3,
        satisfaction: 50
    },
    {
        month: 'September',
        rate: 5,
        satisfaction: 80
    },
    {
        month: 'October',
        rate: 4,
        satisfaction: 75
    },
    {
        month: 'November',
        rate: 5,
        satisfaction: 85
    },
    {
        month: 'December',
        rate: 5,
        satisfaction: 90
    },
];

export default function Graph() {
  return (
    <div className='body'>
        <div className='left'>
         <Form/>
        </div>
        

        <div className='right'>
            <div className='up'>
            <h2 className="text-heading">Customer Satisfaction and Rate</h2>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={pdata} margin={{ right: 300 }}>
                    <CartesianGrid />
                    <XAxis dataKey="month" 
                        interval={'preserveStartEnd'} />
                    <YAxis></YAxis>
                    <Legend />
                    <Tooltip />
                    <Line dataKey="rate"
                        stroke="black" activeDot={{ r: 8 }} />
                    <Line dataKey="satisfaction"
                        stroke="red" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
            </div>
            <div className='bottom'>
                <div className='b_left'>
                   <PieChart/>
                </div>
                <div className='b_right'>
                    <PieChart2/>
                </div>
            </div>
        </div>
              
    </div>
  )
}
