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

const columns = [
  {
    accessorKey: "title",
    header: "Post",
    cell: ({ row }) => (
      <div className="flex flex-col items-center">
        <Link href={row.original.boat 
          ? `/viewPosts/view-ship/${row.original.idCompletePost}`
          : `/viewPosts/view-vehicle/${row.original.idCompletePost}`
        }>
          <h1 className="font-semibold text-sm mb-2 hover:text-sky-600">{row.original.title}</h1>
        </Link>
        <img
          src={row.original.img}
          width="150"
          height="150"
          alt="Image"
          className="rounded-md"
        />
      </div>
    )
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => (
      <div className="flex justify-center mt-2">
        <Link href={`/profile/offer/${row.original.idCompletePost}`}>
          <Button className="bg-sky-500 text-sm w-full h-full">Ofertas</Button>
        </Link>
      </div>
    )
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original.status === "HIDDEN" ? (
          <div className="text-slate-500">Oculta</div>
        ) : row.original.status === "ACTIVE" ? (
          <div className="text-sky-500">Visible</div>
        ) : row.original.status === "PAUSED" ? (
          <div className="text-yellow-500">Pausada</div>
        ) : row.original.status === "DELETED" ? (
          <div className="text-red-500">Eliminada</div>
        ) : null}
      </div>
    )
  },
];

export function OwnPublicationsTable({ data }) {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 3 } }
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-5xl p-4">
        <div className="bg-sky-600 shadow-2xl rounded-lg p-2">
          {(data && data.length !== 0) ? (
            <Card className="bg-white shadow-lg rounded-lg">
              <div className="flex justify-between items-center p-4">
                <button
                  className="hover:text-sky-500"
                  onClick={handleBack}
                >
                  <MoveLeft height={20} width={20} />
                </button>
                <CardTitle className="text-xl font-semibold text-center text-sky-600">
                  Publicaciones
                </CardTitle>
                <div></div>
              </div>
              <CardContent>
                <div className="rounded-md border p-4 bg-white">
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
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4">
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
            <Card className="bg-white shadow-lg rounded-lg p-4">
              <div className="flex justify-between items-center">
                <button
                  className="hover:text-sky-500"
                  onClick={handleBack}
                >
                  <MoveLeft height={20} width={20} />
                </button>
                <CardTitle className="text-xl font-semibold text-center text-sky-600">
                  Publicaciones
                </CardTitle>
                <div></div>
              </div>
              <CardContent className="text-center p-4">
                No hay publicaciones realizadas 🌎
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
