"use client"
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { MoveLeft } from "lucide-react";
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
import { Car } from "lucide-react";

const columns = [
  {
    accessorKey: "title",
    header: "Título",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.title}
      </div>
    )
  },
  {
    accessorKey: "img",
    header: "Imagen",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <img
            src={row.original.img}
            width="150"
            height="150"
            alt="Image"
            className="rounded-md"
          />
        </div>
      )
    }
  },
  {
    accessorKey: "modelo",
    header: "Modelo",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.modelo}
      </div>
    )
  },
  { accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => {

      return (
        <>

        {row.original.boat === true && (
          <div className="flex justify-center">
          <Link href={`/viewPosts/view-ship/${row.original.idCompletePost}`}>
            <Button className="bg-sky-500 text-xs px-2 py-1 mx-1">Ampliar publicación</Button>
          </Link>
        </div>
        )}

        {row.original.boat === false && (
          <div className="flex justify-center">
          <Link href={`/viewPosts/view-vehicle/${row.original.idCompletePost}`}>
            <Button className="bg-sky-500 text-xs px-2 py-1 mx-1">Ampliar publicación</Button>
          </Link>
        </div>
        )}
          <div className="flex justify-center mt-2">
          <Link href={`/profile/offer/${row.original.idCompletePost}`}> 
            <Button className="bg-sky-500 text-xs px-2 py-1 mx-1">Ofertas</Button>
          </Link>
          
        </div>
        
        </>

      )
    }
  },
  { accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          {row.original.status === "HIDDEN" ? (
            <div className="text-slate-500">Oculta</div>
          ) : row.original.status === "ACTIVE" ? (
            <div className="text-sky-500">Visible</div>
          ) : row.original.status === "PAUSED" ? (
            <div className="text-yellow-500">Pausada</div>
          ) : row.original.status === "DELETED" ? (
            <div className="text-red-500">Eliminada</div>
          ) : null }
        </div>
      )
    }

  },

];


export function OwnPublicationsTable({ data }) {
  const router = useRouter();
  const handleBack = () => {
    router.back()
  }
  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 3} } // Set page size to 5
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex justify-center items-center p-2 rounded-lg bg-sky-600">
        {(data && data.length !== 0) ? (
          <Card className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-2">
            <button variant="ghost" className="hover:text-sky-500" onClick={handleBack}><MoveLeft height={20} width={20}/></button>
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold hover:text-sky-600">Publicaciones</CardTitle>
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
              No hay publicaciones realizadas 🌎
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
