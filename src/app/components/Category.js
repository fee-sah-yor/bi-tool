'use client'
import React from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];


export default function Category() {
  return (
    <div className="w-full border border-borderColor rounded-lg p-2 h-[300px] bg-gray-100">
      <h3 className='text-sm font-medium text-black'>Category Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data01}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#ed1450"
            label
          /> 
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
