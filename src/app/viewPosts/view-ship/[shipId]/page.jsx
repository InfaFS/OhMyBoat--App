import { getBoatPostById } from "../../../../../data/posts"

import Link from "next/link";

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

async function viewShip({ params }) {
  const boatPost = await getBoatPostById(params.shipId);
  console.log(boatPost);
  return (
    <div className="flex items-center justify-center h-screen">
      {boatPost && (
      <div className="bg-sky-600 rounded-md shadow-md p-1">
      <Card className="w-full max-w-3xl bg-white shadow-lg rounded-md p-6">
        <Link href="/">
        <button variant="ghost" className="hover:text-sky-500"><MoveLeft height={20} width={20}/></button>
        </Link>
      <CardHeader>
        <h1 className="font-semibold text-2xl text-center">{boatPost.title}</h1>
      </CardHeader>
      <CardContent>
          <div className="flex">
            <div className="w-1/2 p-2 items-center justify-center flex flex-col p-6">
              <img src={boatPost.img} width="300" height="300" alt="Image" className="rounded-md" />
              <div className="p-6">
                <Link href={`/view-profile/${boatPost.idPublisher}`}>
                  <Button className="bg-sky-500">Ver perfil publicador</Button>
                </Link>
              </div>
            </div>
            <div className="w-1/2 p-2">
              <span className="font-semibold">Descripcion del barco: </span>
              <p className="mb-4">{boatPost.descripcion}</p>
              <Separator />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Modelo</TableCell>
                    <TableCell>{boatPost.modelo}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Deuda</TableCell>
                    <TableCell>${boatPost.deuda}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Matrícula</TableCell>
                    <TableCell>{boatPost.matricula}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Eslora</TableCell>
                    <TableCell>{boatPost.eslora}m</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Manga</TableCell>
                    <TableCell>{boatPost.manga}m</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Metros</TableCell>
                    <TableCell>{boatPost.metros}m</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Tipo de embarcación</TableCell>
                    <TableCell>{boatPost.type}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
    </div>
      )}
    {!boatPost && (
      <CreateComponent titulo="No pudimos encontrar la embarcación, vuelve más tarde ⛴️" backLink="/" />
    )}

    </div>
  );
}

export default viewShip;
