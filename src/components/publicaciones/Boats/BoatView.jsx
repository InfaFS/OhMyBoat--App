"use client"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
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
import { reanudarPublicaciónBarco } from "../../../../actions/PausarReanudarPost";
import { pausarPublicaciónBarco } from "../../../../actions/PausarReanudarPost";
export const BoatView = ({boatPost, userSessionId}) => {
    console.log(boatPost.paused);
    const router = useRouter();
    
    const handleBack = () => {
        router.back()
    }
    const handleResume = async () => {
      console.log("1");
      const res = await reanudarPublicaciónBarco(boatPost.id);
      console.log(res);
      if (res?.success){
        toast.success("Publicación reanudada con éxito");
        router.refresh();
      }
    }

    const handlePause = async () => {
      console.log("1");
      const res = await pausarPublicaciónBarco(boatPost.id);
      console.log(res);
      if (res?.success){
        toast.success("Publicación pausada con éxito");
        router.refresh();
      }
    }
    return (
        <>
        {boatPost && (
            <div className="bg-sky-600 rounded-md shadow-md p-1">
            <Card className="w-full max-w-3xl bg-white shadow-lg rounded-md p-6">
        
              <button variant="ghost" className="hover:text-sky-500" onClick={handleBack}><MoveLeft height={20} width={20}/></button>
        
            <CardHeader>
              <h1 className="font-semibold text-2xl text-center">{boatPost.title}</h1>
              {boatPost.paused === true && (
                 <h1 className="font-semibold text-1xl text-center text-slate-500">PAUSADA</h1>
              )}
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
                    <span className="font-semibold">Descripcion de la embarcación: </span>
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
            <CardFooter className="flex justify-center items-center h-full">
            {(userSessionId !== boatPost.idPublisher && userSessionId) && (
                <div>
                { boatPost.paused === false && (
                  <Link href={`/viewPosts/view-ship/${boatPost.id}/offer`}>
                    <Button className="bg-sky-500">Ofertar</Button>        
                  </Link>
                )}
                </div>
            )}

            {(userSessionId === boatPost.idPublisher && boatPost.paused === true) && (
              <Button className="bg-slate-600" onClick={handleResume}>Reanudar</Button>       
            )}
            {(userSessionId === boatPost.idPublisher && boatPost.paused === false) && (
              <Button className="bg-slate-600" onClick={handlePause}>Pausar</Button>       
            )}
            </CardFooter>
          </Card>
          </div>
            )}
          {!boatPost && (
            <CreateComponent titulo="No pudimos encontrar la embarcación, vuelve más tarde ⛴️" backLink="/" />
          )}
        </>
    )


}
