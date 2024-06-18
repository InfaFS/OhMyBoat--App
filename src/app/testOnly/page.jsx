import React from 'react';

// Lista de elementos ficticios
const fakeList = [
  { id: 1, title: 'Elemento 1', description: 'Descripción del elemento 1' },
  { id: 2, title: 'Elemento 2', description: 'Descripción del elemento 2' },
  { id: 3, title: 'Elemento 3', description: 'Descripción del elemento 3' },
  { id: 4, title: 'Elemento 4', description: 'Descripción del elemento 4' },
  { id: 5, title: 'Elemento 5', description: 'Descripción del elemento 5' },
];

export default function ScrollableArea() {
  return (
    <div className="overflow-y-auto h-64">
      {/* Iterando sobre la lista ficticia */}
      {fakeList.map((item) => (
        <div key={item.id} className="border border-gray-300 p-4 mb-4">
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p className="text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
