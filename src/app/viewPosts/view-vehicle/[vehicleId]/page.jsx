import { getVehiclePostById } from "../../../../../data/posts"
async function viewVehicle ({params}) {
    const vehiclePost = await getVehiclePostById(params.vehicleId)
    console.log(vehiclePost)
    return (
        <div>
        <h1>Esta pagina es para ver el autito con id {params.vehicleId}</h1>
        {vehiclePost ? (
            <div>
            <h2>{vehiclePost.title}</h2>
            <p>Descripcion: {vehiclePost.descripcion}</p>
            <p>Cant puertas: {vehiclePost.cantPuertas}</p>
            <p>Kilometraje: {vehiclePost.kilometraje}</p>
            <p>Modelo: {vehiclePost.modelo}</p>
            <p>Patente: {vehiclePost.patente}</p>
            <p>Id: {vehiclePost.id}</p>
            <p>Id publicante: {vehiclePost.idPublisher}</p>
            </div>
        
        ) : (
            <h1>Lo sentimos parece ser que no hay una una publicación para ese vehículo</h1>
        )}
        </div>
    )
}

export default viewVehicle