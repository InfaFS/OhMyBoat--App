"use client"
import Link from "next/link"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { CreateComponent } from "@/components/WorkingComponent";
import { useRouter } from "next/navigation";

export const VehicleView = ({vehiclePost,userSessionId}) => {
    const router = useRouter();    
    const handleBack = () => {
        router.back();
    }
    return (
        <>
        {vehiclePost && (
            <div className="bg-sky-600 rounded-md shadow-md p-1">
            <Card className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">

              <button variant="ghost" className="hover:text-sky-500" onClick={handleBack}><MoveLeft height={20} width={20}/></button>

            <CardHeader>
              <h1 className="font-semibold text-2xl text-center">
                {vehiclePost.title}
              </h1>
            </CardHeader>
            <CardContent>
              {vehiclePost && (
                <div className="flex">
                  <div className="w-1/2 p-2 items-center justify-center flex flex-col p-6">
                    <img
                      src={vehiclePost.img}
                      width="300"
                      height="300"
                      alt="Image"
                      className="rounded-md"
                    />
                    <div className="p-6">
                      <Link href={`/view-profile/${vehiclePost.idPublisher}`}>
                        <Button className="bg-sky-500">Ver perfil publicador</Button>
                      </Link>
                    </div>
                  </div>
                  <div className="w-1/2 p-2">
                    <span className="font-semibold">Descripción del vehículo: </span>
                    <p className="mb-4">{vehiclePost.descripcion}</p>
                    <Separator />
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Modelo</TableCell>
                          <TableCell>{vehiclePost.modelo}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Kilometraje</TableCell>
                          <TableCell>{vehiclePost.kilometraje}km</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Patente</TableCell>
                          <TableCell>{vehiclePost.patente}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Puertas</TableCell>
                          <TableCell>{vehiclePost.cantPuertas}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Tipo de vehículo</TableCell>
                          <TableCell>{vehiclePost.type}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Separator />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center items-center h-full">
            {userSessionId !== vehiclePost.idPublisher && (
                <div>
                <Link href={`/viewPosts/view-vehicle/${vehiclePost.id}/offer`}>
                <Button className="bg-sky-500">Ofertar</Button>        
                </Link>
                </div>
            )}
            </CardFooter>
          </Card>
          </div>
    )}

    {!vehiclePost && (
      <CreateComponent titulo="No pudimos encontrar el vehículo, vuelve más tarde 🚗" backLink="/" />
    )}
    </>
    )

}