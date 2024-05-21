import ViewComponent from "@/components/admin-components/viewEmployeesComponent2"
import { auth } from "../../../auth"
import { getUserById } from "../../../data/user"
import { getAllEmployees } from "../../../actions/getEmployees";
import { LoadingComponent } from "@/components/LoadingComponent";
export default async function testOnly() {
  const empleados = await getAllEmployees();
  console.log(empleados)
  return (
    <div>
      <h1>Test Only</h1>
      <LoadingComponent/>
    </div>
  )
}


