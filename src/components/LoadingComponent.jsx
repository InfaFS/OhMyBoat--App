"use client"
import React from 'react';
import { PulseLoader } from 'react-spinners';

export const LoadingComponent = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-40 h-40 bg-white shadow-md rounded-md flex items-center justify-center">
      <p className="text-center font-bold">Cargando...
      <PulseLoader size={10} color="#36d7b7" />    
      </p>
      </div>
    </div>
  );
}