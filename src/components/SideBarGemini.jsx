"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function SidebarGemini () {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`${isSidebarOpen ? 'fixed left-0' : 'hidden'} 
                  bg-gray-200 w-64 h-screen overflow-y-auto transition duration-300 ease-in-out`}
    >
      {/* Contenedor principal de la barra lateral */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white">
        {/* Encabezado de la barra lateral (logotipo, título, etc.) */}
        <button onClick={handleSidebarToggle}>
          {/* Ícono o botón para abrir/cerrar la barra lateral */}
        </button>
      </div>

      <div className="px-4 pt-3 pb-6">
        {/* Elementos del menú de navegación */}
        <ul>
          <li className="mb-3">
            <a
              href="/"
              onClick={() => router.push('/')}
              className="text-gray-700 hover:bg-gray-100 block px-4 py-2 rounded font-medium"
            >
              Inicio
            </a>
          </li>
          <li className="mb-3">
            <a
              href="/about"
              onClick={() => router.push('/about')}
              className="text-gray-700 hover:bg-gray-100 block px-4 py-2 rounded font-medium"
            >
              Acerca de
            </a>
          </li>
          <li className="mb-3">
            <a
              href="/blog"
              onClick={() => router.push('/blog')}
              className="text-gray-700 hover:bg-gray-100 block px-4 py-2 rounded font-medium"
            >
              Blog
            </a>
          </li>
          {/* Agregue más elementos de menú según sea necesario */}
        </ul>
      </div>
    </div>
  );
};

export default SidebarGemini;