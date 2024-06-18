import OrderBy from "@/components/publicaciones/PublicationsView/OrderBy";
import { obtenerVehiclesPorModeloCard } from "../../../../../../../data/posts";
async function modelVehiclePage({params}) {
    const year = params.year
    console.log(year)
    const publicaciones = await obtenerVehiclesPorModeloCard({modelo: year});
    console.log(publicaciones);
  return (
    <div>
        <OrderBy publicaciones={publicaciones}/>
    </div>
  );
}

export default modelVehiclePage;