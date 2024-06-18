"use client"
import { useState } from 'react';
import Link from "next/link";
import { Separator } from "./ui/separator";
import {useRouter} from 'next/navigation';
export default function Sidebar() {
  const [searchValueBoat, setSearchValueBoat] = useState(null);
    const [modelValueVehicle, setModelValueVehicle] = useState(null);
    const [modelValueBoat, setModelValueBoat] = useState(null);
  const router = useRouter();



  const handleSubmitModelBoat = (e) => {
    e.preventDefault();
    if(modelValueBoat === null){
        return;
    }
    router.push(`/viewPosts/filterBy/boat/model/${modelValueBoat}`)

  }

  const handleSubmitValueBoat = (e) => {
    e.preventDefault();
    if(searchValueBoat === null){
        return;
    }
    router.push(`/viewPosts/filterBy/boat/price/${searchValueBoat}`)
  }

  const handleSubmitModelVehicle = (e) => {
    e.preventDefault();
    if(modelValueVehicle === null){
        return;
    }
    router.push(`/viewPosts/filterBy/vehicle/model/${modelValueVehicle}`)
  }

  return (
    <div className="fixed h-full w-64 bg-white shadow-xl z-50">
      <div className="p-4">
        <h1 className="text-center font-bold text-xl-2">Filtrar:</h1>
        <div className="flex flex-col">
          <Link href='/viewPosts/filterBy/vehicle/van'>
            <span>Camioneta</span>
          </Link>
          <Link href='/viewPosts/filterBy/vehicle/automov'>
            <span>Automovil</span>
          </Link>
          <Link href='/viewPosts/filterBy/vehicle/motorbike'>
            <span>Motocicleta</span>
          </Link>
        </div>
        <form onSubmit={handleSubmitModelVehicle}> 
          <input 
            type="number" 
            placeholder="Buscar por modelo" 
            className="border p-2 rounded-md w-full mt-4" 
            value={modelValueVehicle}
            onChange={(e) => setModelValueVehicle(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">
            Filtrar
          </button>
        </form>
        <Separator  className="mt-2"/>
        <div className="flex flex-col">
          <Link href='/viewPosts/filterBy/boat/lancha'>
            <span>Lancha</span>
          </Link>
          <Link href='/viewPosts/filterBy/boat/sailboat'>
            <span>Velero</span>
          </Link>
          <Link href='/viewPosts/filterBy/boat/cruise'>
            <span>Crucero</span>
          </Link>
          <Link href='/viewPosts/filterBy/boat/catamaran'>
            <span>Catamaran</span>
          </Link>
          <form onSubmit={handleSubmitModelBoat}> 
          <input 
            type="number" 
            placeholder="Buscar por modelo" 
            className="border p-2 rounded-md w-full mt-4" 
            value={modelValueBoat}
            onChange={(e) => setModelValueBoat(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">
            Filtrar
          </button>
        </form>

        <form onSubmit={handleSubmitValueBoat}> 
          <input 
            type="number" 
            placeholder="Buscar por valor" 
            className="border p-2 rounded-md w-full mt-4" 
            value={searchValueBoat}
            onChange={(e) => setSearchValueBoat(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">
            Filtrar
          </button>
        </form>

        </div>

 
        <Separator className="mt-4" />
      </div>
    </div>
  );
}
