"use server"

import { db } from "@/lib/db";

export const borrarPublicaciones = async () => {
    try {

        const publicaciones = await db.cardPost.findMany();
        console.log(publicaciones);
        const cardBorradas = await db.cardPost.deleteMany({
        where: {
            id: {
            in: publicaciones.map((publicacion) => publicacion.id)
            }
        }
        });

        const boatPostsBorrados = await db.boatPost.deleteMany({
        where: {
            id: {
            in: publicaciones.map((publicacion) => publicacion.idCompletePost)
            }
        }
        });

        const vehiclePostsBorrados = await db.vehiclePost.deleteMany({
            where: {
                id: {
                in: publicaciones.map((publicacion) => publicacion.idCompletePost)
                }
            }
            });
        

        if( (cardBorradas && boatPostsBorrados && vehiclePostsBorrados) ) {
        return { success: "Publicaciones borradas!" }
        }
    } catch (error) {
        console.error('Error al borrar las publicaciones:', error);
    }

}