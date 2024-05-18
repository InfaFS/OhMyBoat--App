import ViewComponent from "@/components/admin-components/viewEmployeesComponent2"
import { auth } from "../../../auth"
import { getUserById } from "../../../data/user"
import { getAllEmployees } from "../../../actions/getEmployees";
export default async function testOnly() {
  const empleados = await getAllEmployees();
  console.log(empleados)
  return (
    <div>
      <h1>Test Only</h1>
      <ViewComponent empleados={empleados}/>
    </div>
  )
}

