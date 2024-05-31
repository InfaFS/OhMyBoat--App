"use server"
import { db } from "@/lib/db";
export const getAllNotis = async (idOwner) => {
    try {
        console.log(idOwner)
        const notis = await db.notification.findMany({
            where: {
                idReceptor: idOwner,
            }
        });
        console.log(notis);
        return notis;
    } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
    }
}

export const getUnseenNotis = async (idOwner) => {
    try {
        const notis = await db.notification.findMany({
            where: {
                idReceptor: idOwner,
                seen:false,
            },
        });
        if (notis) {
            return notis;
        }
        console.log(notis);
        return notis;
    } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
    }
}

export const seeNotis = async (idOwner) => {
    try {
        const notis = await db.notification.updateMany({
            where: {
                idReceptor: idOwner,
                seen:false,
            },
            data: {
                seen:true,
            }
        });
        console.log(notis);
        return notis;
    } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
    }
}