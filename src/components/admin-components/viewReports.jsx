"use client";
import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const ViewReportsComponent = ({ pieDataUno, pieDataDos }) => {
  const getMaxValue = (data) => {
    const max = data.reduce((prev, current) => (prev.value > current.value) ? prev : current);
    return max;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 ">
      <h1 className="text-2xl font-semibold mb-4 text-center">Dashboard</h1>

      <div className="flex">
        <div className="w-full">
          {(pieDataUno[0].value === 0 && pieDataUno[1].value === 0) ? (
            <h2 className="text-center">No hay datos para mostrar</h2>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={pieDataUno}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={(entry) => `${entry.name}: ${entry.value}`}
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
           {/* {pieDataUno.length > 0 && (
            <p className="text-center mt-2">
              Intercambio más popular: {getMaxValue(pieDataUno).name} ({getMaxValue(pieDataUno).value} intercambios totales)
            </p>
          )} */}
        </div>

        <div className="w-full ">
          {(pieDataDos[0].value === 0 && pieDataDos[1].value === 0) ? (
            <h2 className="text-center">No hay datos para mostrar</h2>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={pieDataDos}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {pieDataDos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
          {pieDataDos.length > 0 && (
            <p className="text-center mt-2">
              Intercambio más popular: {getMaxValue(pieDataDos).name} ({getMaxValue(pieDataDos).value} intercambios totales)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};