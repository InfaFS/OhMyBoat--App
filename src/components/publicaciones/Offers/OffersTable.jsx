"use client"
import { RechazarOferta,ConfirmarOferta } from "../../../../actions/Offer";
import { getUserById } from "../../../../data/user";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getConfirmedOffersByPostId } from "../../../../data/getOffers";
import { Hourglass, MoveLeft } from "lucide-react";
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
import { toast } from "sonner";

const columns = (handleReject,handleConfirm) => [ 
  {
    accessorKey: "idOfertante",
    header: "Ofertante",
    cell: ({ row }) => (

      <div className="text-center">
        {row.original.firstNameOfertante} {row.original.lastNameOfertante}
      </div>

    )
  },
  {
    accessorKey: "emailOfertante",
    header: "Email",
    cell: ({ row }) => (

      <div className="text-center">
        {row.original.emailOfertante}
      </div>

    )
  },
  {
    accessorKey: "cellPhoneOfertante",
    header: "Teléfono",
    cell: ({ row }) => (

      <div className="text-center">
        {row.original.cellphoneOfertante }
      </div>

    )
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.descripcion}
      </div>
    )
  },
  { id: "publication",
    cell: ({ row }) => {

      return (
        <>
        {(row.original.boat) === true && (
          <div className="flex justify-center">
          <Link href={`/viewPosts/view-ship/${row.original.idPublicacionOfrecida}`}>
            <Button className="bg-sky-500 text-xs px-2 py-1 mx-1">Ver publicación</Button>
          </Link>
        </div>
        )}

        {row.original.boat === false && (
          <div className="flex justify-center">
          <Link href={`/viewPosts/view-vehicle/${row.original.idPublicacionOfrecida}`}>
            <Button className="bg-sky-500 text-xs px-2 py-1 mx-1">Ver publicación</Button>
          </Link>
        </div>
        )}
    
        </>

      )
    }
  },
  { id: "accept",
    cell: ({ row }) => {
      return (
        <>
        {row.original.status === "PENDING" && (
          <div className="flex justify-center">
            <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded text-xs" onClick={() => handleReject(row.original.id)}>
                Rechazar
            </button>
          </div>   
        )}
        {row.original.status === "CONFIRMED" && (
          <div className="flex justify-center">
            <Button className="bg-sky-500 text-xs">Pactar fecha</Button>
          </div>
        )}
        </>

      )
    }
  },
  { id: "confirm",
    cell: ({ row }) => {
      return (
        <>
        {row.original.status === "PENDING" && (
            <div className="flex justify-center">
              <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded text-xs" onClick={() => handleConfirm({offerId: row.original.id,idPublicacionPedida: row.original.idPublicacionPedida})}>
                Aceptar
              </button>
            </div>
        )}
        </>
      )
    }
  },
  { accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      return (
        <>
        {row.original.status === "CONFIRMED" && (
            <div className="flex justify-center text-green-600">
              Aceptada
            </div>
          
        )}
        {row.original.status === "PENDING" && (
          <div className="flex justify-center text-yellow-500">
            Pendiente
          </div>
        )}
        {row.original.status === "REJECTED" && (
          <div className="flex justify-center text-red-500">
            Rechazada
          </div>
        )}
        </>
      )
    }
  }
];

const datita = [
  { id: "un id", descripcion:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum unde dolor, quia necessitatibus laudantium fugiat praesentium cumque! Quos voluptate dolorem itaque animi magni ad dignissimos. Amet, laborum! Hic, beatae pariatur.", idOfertante:"un id de ofertante",idPublicacionOfrecida:"clwlmnzs5000bz1b1rv9lebcf", boat:false},
  { id: "un id", descripcion:"FACHERAZO", idOfertante:"un id de ofertante",idPublicacionOfrecida:"clwlmnzs5000bz1b1rv9lebcf", boat:false},
  { id: "un id", descripcion:"FACHERAZO", idOfertante:"un id de ofertante",idPublicacionOfrecida:"clwlmnzs5000bz1b1rv9lebcf", boat:false},
  { id: "un id", descripcion:"FACHERAZO", idOfertante:"un id de ofertante",idPublicacionOfrecida:"clwlmnzs5000bz1b1rv9lebcf", boat:false},
  { id: "un id", descripcion:"FACHERAZO", idOfertante:"un id de ofertante",idPublicacionOfrecida:"clwlmnzs5000bz1b1rv9lebcf", boat:false},
  { id: "un id", descripcion:"FACHERAZO", idOfertante:"un id de ofertante",idPublicacionOfrecida:"clwlmnzs5000bz1b1rv9lebcf", boat:false},
  { id: "un id", descripcion:"FACHERAZO", idOfertante:"un id de ofertante",idPublicacionOfrecida:"clwlmnzs5000bz1b1rv9lebcf", boat:false},
  { id: "un id", descripcion:"FACHERAZO", idOfertante:"un id de ofertante",idPublicacionOfrecida:"clwlmnzs5000bz1b1rv9lebcf", boat:false},

];

export function OffersTable({ data }) {
  const router = useRouter()

  const handleReject = async (offerId) => {
    console.log(offerId)
    const response = await RechazarOferta({ offerId });
    console.log(response)
    if (response.success) {
      toast.success(response.success);
      router.refresh();
    }
  }

  const handleConfirm = async ({offerId,idPublicacionPedida}) => {
    const res = await getConfirmedOffersByPostId({idPublicacionPedida});
    console.log(res)
    if (res.length > 0) {
      toast.info("No puedes tener mas de una oferta aceptada!");
      return;
    }
    else if ( res.length === 0 ) {
      console.log(offerId)
      const response = await ConfirmarOferta({ offerId });
      console.log(response)
      if (response.success) {
        toast.success(response.success);
        router.refresh();
      }
    }


  }

  const table = useReactTable({
    data: data,
    columns: columns(handleReject,handleConfirm),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } } // Set page size to 5
  });

  const handleBack = () => {
    router.back();
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex justify-center items-center p-2 rounded-lg bg-sky-600">
        {(data && data.length !== 0) ? (
          <Card className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-2">
              <button variant="ghost" className="hover:text-sky-500" onClick={handleBack}><MoveLeft height={20} width={20}/></button>
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold hover:text-sky-600">Ofertas</CardTitle>
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
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold hover:text-sky-600">Ofertas</CardTitle>
            </CardHeader>
            <CardContent>
              No hay ofertas por el momento para esta publicación 💰
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
