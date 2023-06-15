import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
class PieRechartComponent extends React.Component {
   COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
   pieData = [
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
   CustomTooltip = ({ active, payload, label }) => {
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
render() {
   return (
    <div>
        <h3 className="text-heading">Rate </h3>
        <PieChart width={300} height={300}>
      <Pie
         data={this.pieData}
         color="#000000"
         dataKey="value"
         nameKey="progress"
         cx="50%"
         cy="50%"
         outerRadius={120}
         fill="#8884d8"
      >
         {this.pieData.map((entry, index) => (
            <Cell
               key={`cell-${index}`}
               fill={this.COLORS[index % this.COLORS.length]}
            />
         ))}
      </Pie>
      
      <Tooltip content={<this.CustomTooltip />} />
      <Legend />
      </PieChart>
    </div>
   );
   }
}
export default PieRechartComponent;