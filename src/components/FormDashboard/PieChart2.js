import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
const pieData = [
    {
        progress: "project A",
        value: 54.85
    },
    {
        progress: "project B",
        value: 47.91
    },
    {
        progress: "project C",
        value: 16.85
    },
    {
        progress: "project D",
        value: 16.14
    },
    {
        progress: "project E",
        value: 10.25
    }
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
        return (
            <div
                className="custom-tooltip"
                style={{
                    backgroundColor: "#ffff",
                    padding: "5px",
                    border: "1px solid #cccc"
                }}
            >
                <label>{`${payload[0].progress} : ${payload[0].value}%`}</label>
            </div>
        );
    }
    return null;
};

const PieRechartComponent = () => {
    return (
        <div>
            <h3 className="text-heading">Rate </h3>
            <PieChart width={300} height={300}>
                <Pie
                    data={pieData}
                    color="#000000"
                    dataKey="value"
                    nameKey="progress"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                >
                    {pieData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
            </PieChart>
        </div>
    );
};

export default PieRechartComponent;
