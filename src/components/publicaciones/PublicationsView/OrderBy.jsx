"use client"
import { useRouter } from "next/navigation"
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils"
import { CreateComponent } from "@/components/WorkingComponent";
import { Toaster } from "sonner";
import {SidebarInfa} from '@/components/SidebarInfa.jsx'
import { obtenerAutomovilesCard } from "../../../../data/posts";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { useEffect, useState } from 'react';
import CardPublicacion from "@/components/publicaciones/CardPublicacion";
import { Button } from "@/components/ui/button";



export default function OrderBy({publicaciones}) {
  console.log("hola");
  const [pageNumber, setPageNumber] = useState(1)

  const publicacionesPerPage = 12;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(publicacionesPerPage);

  return (
  <>
  <main className="flex flex-col items-center bg-blancoahumado min-h-screen"> {/* h-full */}
    <section className="space-y-6 text-center">
      <h1 className="text-4xl font-semibold text-black drop-shadow-md mt-10">
        Publicaciones
      </h1>
      <SidebarInfa/>
      { publicaciones.length === 0 && (
        <div>
          <p className="text-black font-semibold">No hay publicaciones por el momento, vuelve más tarde...</p>
        </div>
      )}
      {/*  <div className="flex justify-center mb-6">
      <Button className="mr-2" onClick={onClickBoat}>Generador Barcos</Button>
      <Button onClick={onClickVehicle}>Generador Vehiculos</Button>
      </div> */}

  
  
      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {publicaciones.slice(startIndex, endIndex).map((publicacion) => (
          <CardPublicacion
            key={publicacion.id}
            modelo={publicacion.modelo}
            titulo={publicacion.title}
            img={publicacion.img}
            isBoat={publicacion.boat}
            idCompletePost={publicacion.idCompletePost}
          />
        ))}
      </section>
      
    </section>
    
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                startIndex === 0 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                setStartIndex(startIndex - publicacionesPerPage);
                setEndIndex(endIndex - publicacionesPerPage);
              }} />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className={
                endIndex >=  publicaciones.length  ? "pointer-events-none opacity-50" : undefined //aca tendria q poner la cant de publicaciones totales dividido la cantidad de publicaciones por pagina pero no se como hacerlo
              }
              onClick={() => {
                setStartIndex(startIndex + publicacionesPerPage); 
                setEndIndex(endIndex + publicacionesPerPage); 
              }} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    
  </main>
  </>
);

}