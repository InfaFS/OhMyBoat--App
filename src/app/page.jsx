"use client"
import { useRouter } from "next/navigation"
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils"
import { CreateComponent } from "@/components/WorkingComponent";
import { Toaster } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})
import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react';
import CardPublicacion from "@/components/publicaciones/CardPublicacion";
import Header from "next/head";
import { obtenerPublicaciones } from "../../actions/publicacion";
import { Button } from "@/components/ui/button";
import { fakeDataGenerator } from "../../actions/fakeDataGenerator";


export default function Home() {
  const [pageNumber, setPageNumber] = useState(1)
  const [publicaciones, setPublicaciones] = useState([]);
  const router = useRouter();
  const pathname = usePathname()

  const publicacionesPerPage = 12;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(publicacionesPerPage);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const data = await obtenerPublicaciones();
        setPublicaciones(data);
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
      }
    };

    fetchPublicaciones();

  }, []);


  const onClick = async () => {
    const res = await fakeDataGenerator(1);
    console.log(res);
  }



  return (
  <>
  <main className="flex flex-col items-center bg-blancoahumado h-screen  "> {/* h-full */}
    <section className="space-y-6 text-center bg-cielo">
      <h1 className="text-6xl font-semibold text-black drop-shadow-md mt-10">
        Home OhMyBoat!🛥️
      </h1>

      { publicaciones.length === 0 && (
        <div>
          <p className="text-black font-semibold">No hay publicaciones por el momento, vuelve más tarde...</p>
        </div>
      )}
      <Button onClick={onClick}>Generador</Button>
  
      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {publicaciones.slice(startIndex, endIndex).map((publicacion) => (
          <CardPublicacion
            key={publicacion.id}
            modelo={publicacion.modelo}
            titulo={publicacion.title}
            img={publicacion.img}
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