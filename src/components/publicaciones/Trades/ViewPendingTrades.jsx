"use client"
import { useRouter } from "next/navigation";
import { rejectTrade } from "../../../../actions/tradeActions";
import { MoveLeft } from "lucide-react";
import { confirmTrade } from "../../../../actions/tradeActions";
import { getBoatPostById } from "../../../../data/posts";
import { Check,X } from "lucide-react";
import { ContactPopover } from "./ContactPopover";
import { toast } from "sonner";
import Link from "next/link";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const columns = (handleAmpliarPublicacion,handleConfirmation,handleRejectConfirmation) => [
    { accessorKey: "publication1",
    header: "Ofertante",
    cell: ({ row }) => {
      return (
        <>
          <div className="flex justify-center">
            <ContactPopover email={row.original.EmailUsuario1} name={row.original.NombreUsuario1} lastname={row.original.ApellidoUsuario1} phone={row.original.PhoneUsuario1} userId={row.original.idUsuario1 }/>
        </div>
        </>
      )
    }
  },
  { accessorKey: "user2",
  header: "Ofertado",
  cell: ({ row }) => {
    return (
      <>
        <div className="flex justify-center">
        <ContactPopover email={row.original.EmailUsuario2} name={row.original.NombreUsuario2} lastname={row.original.ApellidoUsuario2} phone={row.original.PhoneUsuario2} userId={row.original.idUsuario2 }/>
      </div>
      </>
    )
  }
},
  { accessorKey: "publication1",
    header: "Post ofertado",
    cell: ({ row }) => {
      return (
        <>
        <div className="flex flex-col items-center space-y-1">
        <button
          className="text-xs hover:text-blue-600 p-0"
          onClick={() => handleAmpliarPublicacion(row.original.idPost1)}
        >
        <h1 className="font-semibold text-xs hover:text-sky-600">{row.original.tituloPublicacionOfrecida}</h1>
        </button>
        <img
          src={row.original.imgPublicacionOfrecida}
          width="100"
          height="100"
          alt="Imagen de publicacion"
          className="rounded-md"
        />
      </div>
        </>
      )
    }
  },
  { accessorKey: "publication2",
    header: "Post pedido",
  cell: ({ row }) => {
    return (
      <>
        <div className="flex flex-col items-center space-y-1">
        <button
          className="text-xs hover:text-blue-600 p-0"
          onClick={() => handleAmpliarPublicacion(row.original.idPost2)}
        >
        <h1 className="font-semibold text-xs hover:text-sky-600">{row.original.tituloPublicacionPedida}</h1>
        </button>
        <img
          src={row.original.imgPublicacionPedida}
          width="100"
          height="100"
          alt="Imagen de publicacion"
          className="rounded-md"
        />
      </div>
      </>
    )
  }
},
  { accessorKey: "date",
  header: "Fecha",
  cell: ({ row }) => {
    return (
        <div className="flex justify-center">
        <div className="text-sky-700">{row.original.proposedDay1}</div>
        </div>
    )
  }
  },
  { accessorKey: "confirmation",
  header: "Confirmación",
  cell: ({ row }) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const proposedDate = row.original.proposedDay1;
    console.log(currentDate)
    console.log(proposedDate)
    const idTrade = row.original.id;
    return (
        <div className="flex justify-center">
            <Check className="hover:text-green-500 cursor-pointer" onClick={() => {handleConfirmation({idTrade,currentDate,proposedDate})}}size={20} width={20}/>
            <X className="ml-2 hover:text-red-500 cursor-pointer" size={20} width={20} onClick={() => {handleRejectConfirmation({idTrade,currentDate,proposedDate})}}/>
        </div>
    )
  }
  },
];


export function PendingTradesTable({data}) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  }
  const handleAmpliarPublicacion = async (completePostId) =>  {
    console.log(completePostId)
    const BoatPost = await getBoatPostById(completePostId);
    console.log(BoatPost)
    if (BoatPost) {
      router.push(`/viewPosts/view-ship/${completePostId}`);
    }
    else {
        router.push(`/viewPosts/view-vehicle/${completePostId}`);
    }
  };

  const handleReject = async (idTrade) => {
    console.log(idTrade);
    const res = await rejectTrade({tradeId: idTrade});
    if (res.success){
        router.refresh();
        toast.success(res.success)
    }
  }


  const handleConfirm = async (idTrade) => {
    console.log(idTrade);
    const res = await confirmTrade({tradeId: idTrade});
    if (res.success){
        router.refresh();
        toast.success(res.success)
    }
  }

  const handleConfirmation = ({idTrade, currentDate, proposedDate}) => {
    console.log(idTrade)
    console.log(currentDate)
    console.log(proposedDate)
    if (currentDate === proposedDate){
      toast.info("Estás seguro de que quieres confirmar el trueque?", {
        action: <>
        <div>
          <button onClick={() => {handleConfirm(idTrade);toast.dismiss()}} className='hover:text-green-500  text-blue-500'>Confirmar</button>
          <button onClick={() => {toast.dismiss()}} className='hover:text-red-800 text-blue-500'>Cancelar</button>
          </div>
        </> ,
    })
    } else {
      toast.info("La fecha del trueque no coincide con el dia actual, quieres aceptar?", {
        action: <>
        <div>
          <button onClick={() => {handleConfirm(idTrade);toast.dismiss()}} className='hover:text-green-500  text-blue-500'>Confirmar</button>
          <button onClick={() => {toast.dismiss()}} className='hover:text-red-800 text-blue-500'>Cancelar</button>
          </div>
        </> ,
    })
    }

  }

  const handleRejectConfirmation = ({idTrade, currentDate, proposedDate}) => {
    console.log(idTrade)
    console.log(currentDate)
    console.log(proposedDate)
    if (currentDate === proposedDate){

    toast.error("Estás seguro de que quieres confirmar que no se realizó el trueque?", {
      action: <>
      <div>
        <button onClick={() => {handleReject(idTrade);toast.dismiss()}} className='hover:text-red-800  text-red-500'>Confirmar</button>
        <button onClick={() => {toast.dismiss()}} className='hover:text-red-800 text-red-500'>Cancelar</button>
        </div>
      </> ,
  })
  } else {
    toast.error("La fecha del trueque no coincide con el dia actual, quieres rechazar?", {
      action: <>
      <div>
        <button onClick={() => {handleReject(idTrade);toast.dismiss()}} className='hover:text-red-800  text-red-500'>Confirmar</button>
        <button onClick={() => {toast.dismiss()}} className='hover:text-red-800 text-red-500'>Cancelar</button>
        </div>
      </> ,
  })
  }

  }
  const table = useReactTable({
    data: data,
    columns: columns(handleAmpliarPublicacion,handleConfirmation,handleRejectConfirmation),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } } // Set page size to 5
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex justify-center items-center p-2 rounded-lg bg-sky-600">
        {(data && data.length !== 0) ? (
          <Card className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-2">
            <button variant="ghost" className="hover:text-sky-500" onClick={handleBack}><MoveLeft height={20} width={20}/></button>
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold hover:text-sky-600">Trueques Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id} className="text-center">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="text-center">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              {/* PAGINATION */}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button
                variant="ghost"
                className="text-sm hover:text-blue-600"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </Button>
              <span className="text-sm">
                Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
              </span>
              <Button
                variant="ghost"
                className="text-sm hover:text-blue-600"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Siguiente
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-2">
            <button variant="ghost" className="hover:text-sky-500" onClick={handleBack}><MoveLeft height={20} width={20}/></button>
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold hover:text-sky-600">Publicaciones</CardTitle>
            </CardHeader>
            <CardContent>
              No hay trueques pendientes por el momento
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
