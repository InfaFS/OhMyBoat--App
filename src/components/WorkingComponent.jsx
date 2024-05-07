"use client"

import 'primeicons/primeicons.css';

export const CreateComponent = ({titulo}) =>{
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
        <i className="pi pi-spin pi-cog" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i>
        <span>{titulo}</span>

      </div>
    </div>
  );
}
