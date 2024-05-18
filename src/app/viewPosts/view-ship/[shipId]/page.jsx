import { getBoatPostById } from "../../../../../data/posts"
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
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

async function viewShip({ params }) {
  const boatPost = await getBoatPostById(params.shipId);
  console.log(boatPost);
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <CardHeader>
          <h1 className="font-semibold text-2xl text-center">{boatPost ? boatPost.title : "Lo sentimos, parece que no hay una publicación para ese barco"}</h1>
        </CardHeader>
        <CardContent>
          {boatPost && (
            <div className="flex">
              <div className="w-1/2 p-2 items-center justify-center flex flex-col p-6">
                <img src={boatPost.img} width="300" height="300" alt="Image" className="rounded-md" />
                <div className="p-6">
                  <Link href={`/view-profile/${boatPost.idPublisher}`}>
                    <Button>Ver perfil publicante</Button>
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
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

export default viewShip;
