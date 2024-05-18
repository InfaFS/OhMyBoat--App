import { getVehiclePostById } from "../../../../../data/posts"
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

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Card, CardHeader, CardContent } from "@/components/ui/card";

async function viewVehicle({ params }) {
  const vehiclePost = await getVehiclePostById(params.vehicleId);
  console.log(vehiclePost);
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <CardHeader>
          <h1 className="font-semibold text-2xl text-center">
            {vehiclePost
              ? vehiclePost.title
              : "Lo sentimos, parece que no hay una publicación para ese vehículo"}
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
                    <Button>Ver perfil publicante</Button>
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
                  </TableBody>
                </Table>
                <Separator />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default viewVehicle;
