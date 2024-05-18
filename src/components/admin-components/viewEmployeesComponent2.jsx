"use client";
import { useReactTable, getCoreRowModel, flexRender,getPaginationRowModel } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card"; // Asegúrate de ajustar la ruta según tu estructura de proyecto
import { Button } from "../ui/button";

const columns = [
  {
    header: "Nombre",
    accessorKey: "firstname",
  },
  {
    header: "Apellido",
    accessorKey: "lastname",
  },
  {
    header: "Teléfono",
    accessorKey: "cellphone",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
];

const empleadosFake = [ //solo para fines de testing
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},
    { id:"un id" ,firstname: "Juan", lastname: "Pérez", cellphone: "1234567890", email: "pepe@gmail.com"},

]
function ViewEmployeesComponent2({ empleados }) {
  console.log(empleados);
  const table = useReactTable({
    data: empleados,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex justify-center items-center p-6 rounded-lg bg-ocean">
      {empleados && (
        <Card className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold hover:text-gray-300">Empleados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="bg-gray-200">
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="p-2 border-b border-gray-300">
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-100">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-2 text-center border-b border-gray-300">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center items-center">
          <Button variant="ghost" className="text-sm hover:text-blue-600" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Anterior
          </Button>
          <Button variant="ghost" className="text-sm hover:text-blue-600" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Siguiente
          </Button>
        </CardFooter>
        </Card>
      )}
      {!empleados && (
                <Card className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <CardHeader>
                  <CardTitle className="text-center text-xl font-semibold">Lista de Empleados</CardTitle>
                </CardHeader>
                <CardContent>
                    Parece que no hay empleados registrados. 😔
                </CardContent>
                </Card>
      )}
    </div>
  );
}

export default ViewEmployeesComponent2;