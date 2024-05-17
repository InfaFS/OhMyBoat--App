"use client"
import DataTable from "react-data-table-component";

function viewEmployees() {
    const columns = [
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true,

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


    return (
        <div>
        <DataTable
            columns={columns}
            data={[{nombre: 'Juan', apellido: 'Perez', email: 'hola@gmail.com',fechaNacimiento: "22/09/2003",telefono: "+54 221 576 9920"},
            {nombre: 'Pepe', apellido: 'PHernandez', email: 'hola@gmail.com',fechaNacimiento: "22/09/2003",telefono: "+54 221 576 9920"},       
            ]}
            pagination
        />
        </div>
    )

}

export default viewEmployees;