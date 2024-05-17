"use client"
import DataTable from "react-data-table-component";

export function viewEmployeesComponent () {
    const columns = [
        {
            name: 'Nombre',
            selector: row => row.nomnbre
        },
        {
            name: 'Apellido',
            selector: row => row.apellido
        },
        {
            name: 'Email',
            selector: row => row.email
        },
        {
            name: 'Fecha de nacimiento',
            selector: row => row.fechaNacimiento
        },
        {
            name: 'Teléfono',
            selector: row => row.telefono 
        }
    ]

    const data = [
        {
            nombre: 'Juan',
            apellido: 'Perez',
            email: 'pepe@gmail.com',
            fechaNacimiento: '12/12/1990',
            telefono: '123456789',
        },
        {
            nombre: 'Juan',
            apellido: 'Perez',
            email: 'pepe@gmail.com',
            fechaNacimiento: '12/12/1990',
            telefono: '123456789',
        },
    ]
    return (
        <DataTable
            columns={columns}
            data={{data}}
        />
    )

}