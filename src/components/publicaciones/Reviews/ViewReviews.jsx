"use client"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import RatingComponent from "@/components/profile/RatingComponent";
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
    header: "Reseñador",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Link href={`/view-profile/${row.original.idReviewer}`}>
          <Button variant="link">{row.original.ReviewerFirstName} {row.original.ReviewerLastName}</Button>
        </Link>
      </div>
    )
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.description}
      </div>
    )
  },
  {
    accessorKey: "publication",
    header: "Puntuación",
    cell: ({ row }) => (
      <div className="flex flex-col items-center">
        <div className="flex justify-center">
          <RatingComponent number={row.original.stars} format="table" />
        </div>
      </div>
    )
  },
];

export function ReviewsTable({ data }) {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex justify-center items-center p-2 rounded-lg bg-sky-600 shadow-lg">
        {(data && data.length !== 0) ? (
          <Card className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
            <button variant="ghost" className="hover:text-sky-500 mb-4" onClick={handleBack}><MoveLeft height={20} width={20} /></button>
            <CardHeader>
              <CardTitle className="text-center text-2xl font-semibold text-sky-600">Reseñas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id} className="text-center bg-gray-100 p-3">
                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="hover:bg-gray-50">
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="text-center p-3">
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
            <CardFooter className="flex justify-between items-center mt-4">
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
          <Card className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
            <button variant="ghost" className="hover:text-sky-500 mb-4" onClick={handleBack}><MoveLeft height={20} width={20} /></button>
            <CardHeader>
              <CardTitle className="text-center text-2xl font-semibold text-sky-600">Reseñas</CardTitle>
            </CardHeader>
            <CardContent>
              Este usuario no tiene reseñas hechas
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
