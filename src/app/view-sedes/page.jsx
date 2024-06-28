import ViewSedeComponent from "@/components/admin-components/viewSedesComponent";
import { getAllSedes } from "../../../actions/sedes";
import { auth } from "../../../auth";
export default async function ViewSedesPage() {
  const sedes = await getAllSedes();
  const session = await auth();
  const role = session.user?.role;

  return (
    <div className="p-4">
      {sedes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sedes.map((sede) => (
            <ViewSedeComponent sede={sede} key={sede.id} role={role}/>
          ))}
        </div>
      ) : (
        <div>
          <h1>No hay sedes disponibles</h1>
        </div>
      )}
    </div>
  );
}
