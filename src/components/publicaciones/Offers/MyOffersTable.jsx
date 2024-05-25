"use client"

import { useRouter } from "next/navigation";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
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

const columns = [ 
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
    accessorKey: "descripcion",
    header: "Descripción",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.descripcion}
      </div>
    )
  },
  {
    id: "publication",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Link href={row.original.boat 
          ? `/viewPosts/view-ship/${row.original.idPublicacionOfrecida}`
          : `/viewPosts/view-vehicle/${row.original.idPublicacionOfrecida}`
        }>
          <Button className="bg-sky-500 text-xs px-2 py-1 mx-1">Ver publicación</Button>
        </Link>
      </div>
    )
  },
  {
    id: "accept",
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original.status === "PENDING" ? (
          <h1 className="text-sm text-slate-500">Podrás pactar fecha cuando se acepte la oferta</h1>
        ) : row.original.status === "CONFIRMED" ? (
          <Button className="bg-sky-500 text-xs">Pactar fecha</Button>
        ) : null}
      </div>
    )
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original.status === "CONFIRMED" ? (
          <div className="text-green-600">Confirmada</div>
        ) : row.original.status === "PENDING" ? (
          <div className="text-yellow-500">Pendiente</div>
        ) : row.original.status === "REJECTED" ? (
          <div className="text-red-500">Rechazada</div>
        ) : null}
      </div>
    )
  }
];

const datita = [
  { id: "un id", descripcion:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum unde dolor, quia necessitatibus laudantium fugiat praesentium cumque! Quos voluptate dolorem itaque animi magni ad dignissimos. Amet, laborum! Hic, beatae pariatur.", idOfertante:"un id de ofertante",idPublicacionOfrecida:"clwlmnzs5000bz1b1rv9lebcf", boat:false, status: "PENDING"},
  { id: "un id", descripcion:"FACHERAZO", idOfertante:"un id de ofertante",idPublicacionOfrecida:"clwlmnzs5000bz1b1rv9lebcf", boat:false, status: "CONFIRMED"},
  { id: "un id", descripcion:"FACHERAZO", idOfertante:"un id de ofertante",idPublicacionOfrecida:"clwlmnzs5000bz1b1rv9lebcf", boat:false, status: "REJECTED"},
  { id: "un id", descripcion:"FACHERAZO", idOfertante:"un id de ofertante",idPublicacionOfrecida:"clwlmnzs5000bz1b1rv9lebcf", boat:false, status: "PENDING"},
];

export function MyOffersTable({ data }) {
  const router = useRouter();

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } } // Set page size to 5
  });

  const handleBack = () => {
    router.back();
  }

  return (
    <div className="flex items-center justify-center h-screen w-full px-4">
      <div className="flex justify-center items-center p-2 rounded-lg bg-sky-600">
        {data && data.length !== 0 ? (
          <Card className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-4">
            <button variant="ghost" className="hover:text-sky-500" onClick={handleBack}>
              <MoveLeft height={20} width={20}/>
            </button>
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold hover:text-sky-600">Mis ofertas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <TableHead key={header.id} className="text-center">
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map(row => (
                        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                          {row.getVisibleCells().map(cell => (
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
          <Card className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-4">
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold hover:text-sky-600">Ofertas</CardTitle>
            </CardHeader>
            <CardContent>
              No hay ofertas que estés realizando en este momento 💰
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
