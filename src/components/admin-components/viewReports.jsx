"use client";
import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export const ViewReportsComponent = ({ pieDataUno, pieDataDos}) => {
  return (
    <>
      {(pieDataUno[0].value === 0 && pieDataUno[1].value === 0) ? (
        <h1>No hay datos para mostrar</h1>
      ):  <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={pieDataUno}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer> }
    {(pieDataUno[0].value === 0 && pieDataUno[1].value === 0) ? (
        <h1>No hay datos para mostrar</h1>
      ):  <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={pieDataDos}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer> }
     

      {/* <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={barData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer> */}

    </>
  );
};

