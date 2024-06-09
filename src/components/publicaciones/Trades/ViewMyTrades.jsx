"use client"
import { getBoatPostById } from "../../../../data/posts";
import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";
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

const columns = (handleAmpliarPublicacion) => [
    { accessorKey: "publication1",
    header: "Ofertante",
    cell: ({ row }) => {
      return (
        <>
          <div className="flex justify-center">
          <Link href={`/view-profile/${row.original.idUsuario1}`}>
            <Button className="text-sm px-2 py-1 mx-1 hover:text-sky-600 font-semibold" variant='link'>{row.original.NombreUsuario1} {row.original.ApellidoUsuario1}</Button>     
            </Link>
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
          <Link href={`/view-profile/${row.original.idUsuario2}`}>
            <Button className="text-sm px-2 py-1 mx-1 hover:text-sky-600 font-semibold" variant='link'>{row.original.NombreUsuario2} {row.original.ApellidoUsuario2}</Button>     
            </Link>
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
      <h1 className="font-semibold text-xs hover:text-sky-600">{row.original.tituloPublicacionPedida}</h1>
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
      {row.original.status === "FECHA_PENDIENTE" ? (
        <Link href={`/profile/my-trades/set-date/${row.original.id}`}>
            <Button className="hover:text-sky-600 text-sm" variant="link">Pactar fecha</Button>        
        </Link>
      ) : row.original.status !== "FECHA_PENDIENTE" ? (
        <div className="text-sky-700">{row.original.proposedDay1}</div>
      ) : null
      } 
      </div>
    )
  }
},
  { accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
        {row.original.status === "TRUEQUE_REALIZADO" ? (
          <div className="text-green-600">Realizado</div>
        ) : row.original.status === "FECHA_PENDIENTE" ? (
          <div className="text-yellow-500">Fecha pendiente</div>
        ) : row.original.status === "FECHA_PACTADA" ? (
            <div className="text-yellow-500">Pendiente</div>
        ) : row.original.status === "TRUEQUE_NO_REALIZADO" ? (
            <div className="text-red-500">No realizado</div>
        ): null
        } 
        </div>
      )
    }
  },
];


export function MyTradesTable({ data}) {

  const router = useRouter();
  const handleBack = () => {
    router.back()
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

  const table = useReactTable({
    data: data,
    columns: columns(handleAmpliarPublicacion),
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
              
              <CardTitle className="text-center text-xl font-semibold hover:text-sky-600">Trueques</CardTitle>
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
              <CardTitle className="text-center text-xl font-semibold hover:text-sky-600">Trueques</CardTitle>
            </CardHeader>
            <CardContent>
              No hay trueques en los que estés participando en este momento 🤝
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
