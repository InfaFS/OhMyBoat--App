import { getBoatPostById } from "../../../../../data/posts"
async function viewShip ({params}) {
    const boatPost = await getBoatPostById(params.shipId)
    console.log(boatPost)
    return (
        <div>
        <h1>Esta pagina es para ver el barquito con id {params.shipId}</h1>
        {boatPost ? (
            <div>
            <h2>{boatPost.title}</h2>
            <p>Descripcion: {boatPost.descripcion}</p>
            <p>Deuda: {boatPost.deuda}</p>
            <p>Eslora: {boatPost.eslora}</p>
            <p>Manga: {boatPost.manga}</p>
            <p>Metros: {boatPost.metros}</p>
            <p>Matricula: {boatPost.matricula}</p>
            <p>Modelo: {boatPost.modelo}</p>
            <p>Id: {boatPost.id}</p>
            <p>Id publicante: {boatPost.idPublisher}</p>
            </div>
        
        ) : (
            <h1>Lo sentimos parece ser que no hay una una publicación para ese barco</h1>
        )}
        </div>
    )
}

export default viewShip