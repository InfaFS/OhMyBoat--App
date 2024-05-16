"use server"

import { db } from "@/lib/db";

export const borrarPublicaciones = async () => {
    try {
        const publicaciones = await db.post.findMany();
        console.log(publicaciones);
        await db.post.deleteMany({
        where: {
            id: {
            in: publicaciones.map((publicacion) => publicacion.id)
            }
        }
        });
        return { success: "Publicaciones borradas!"}
    } catch (error) {
        console.error('Error al borrar las publicaciones:', error);
    }

}