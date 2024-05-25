"use server"

import { db } from "@/lib/db";
import { getUserById } from "../data/user";

export const OfertarVehículo = async ({idOfertante,descripcion,idPublicacionOfrecida,idPublicacionPedida}) => {

    try {
        const user = await getUserById(idOfertante);
        if (!user) {
            return { error: "Usuario no encontrado!" }
        }
        const existingOffer = await db.offer.findFirst({
            where: {
                idOfertante,
                idPublicacionOfrecida,
                idPublicacionPedida,
            }
        });
        if (existingOffer) {
            return { error: "Ya has ofertado este vehículo a esta publicación!" }
        }
        const oferta = await db.offer.create({
            data: {
                idOfertante,
                descripcion,
                idPublicacionOfrecida,
                idPublicacionPedida,
                firstNameOfertante: user.firstname,
                lastNameOfertante: user.lastname,
                boat: false,
                status: "PENDING",
                cellphoneOfertante: user.cellphone,
                emailOfertante: user.email,
            }
        });
        if (oferta) {
            return { success: "Oferta de vehículo realizada con éxito!"}
        }
        
    } catch (error) {
        console.error('Error al ofertar:', error);
    }

}

export const OfertarEmbarcacion = async ({idOfertante,descripcion,idPublicacionOfrecida,idPublicacionPedida}) => {
    try {
        const user = await getUserById(idOfertante);
        if (!user) {
            return { error: "Usuario no encontrado!" }
        }
        const existingOffer = await db.offer.findFirst({
            where: {
                idOfertante,
                idPublicacionOfrecida,
            idPublicacionPedida,
            }
        });
        if (existingOffer) {
            return { error: "Ya has ofertado este vehículo a esta publicación!" }
        }
        const oferta = await db.offer.create({
            data: {
                idOfertante,
                descripcion,
                idPublicacionOfrecida,
                idPublicacionPedida,
                boat: true,
                firstNameOfertante: user.firstname,
                lastNameOfertante: user.lastname,
                status: "PENDING",
                cellphoneOfertante: user.cellphone,
                emailOfertante: user.email,
            }
        });
        if (oferta) {
            return { success: "Oferta de embarcación realizada con éxito!" }
        
        }
    } catch (error) {
        console.error('Error al ofertar:', error);
    }

}

export const RechazarOferta = async ({offerId}) => {
    try {
        console.log(offerId);
        const res = await db.offer.update({
            where: {
                id: offerId,
            },
            data: {
                status: "REJECTED",
            }
        });
        if (res) {
            return { success: "Oferta rechazada con éxito!" }
        }
    } catch (error) {
        console.error('Error al rechazar la oferta:', error);
    }
}

    // export const EliminarOfertasDePublicacionExcepto = async ({publicationId,offeredPublicationId}) => {
    //     try {
    //         const res = await db.offer.deleteMany({
    //             where: {
    //                 idPublicacionPedida: publicationId,
    //                 idPublicacionOfrecida: {
    //                     not: offeredPublicationId,
    //                 },
    //             }
    //         });
    //         if (res) {
    //             return { success: "Todas las demas ofertas fueron rechazadas con éxito!" }
    //         }
    //     } catch (error) {
    //         console.error('Error al rechazar las ofertas:', error);
    //     }

    // }

export const ConfirmarOferta = async ({offerId}) => {
    try {
        console.log(offerId);
        const res = await db.offer.update({
            where: {
                id: offerId,
            },
            data: {
                status: "CONFIRMED",
            }
        });
        if (res) {
            return { success: "Oferta confirmada con éxito!" }
        }

    } catch (error) {
        console.error('Error al confirmar la oferta:', error);
    }
}
