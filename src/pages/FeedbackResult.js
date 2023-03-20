import React from 'react'
import Chart from '../charts/Chart'
import Featured from '../charts/Featured'
import "./Home.css"
import { userData } from "../DummyData";

export default function Home() {
    return (
        <div className='home'>
            <Featured />
            <Chart data={userData} title="Progress Analytics" grid dataKey="progress_rate" />
        </div>
    )
}
