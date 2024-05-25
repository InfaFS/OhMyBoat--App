"use server"
import { db } from "@/lib/db"
export const getOffersByPostId = async ({postId}) => {
    try {
        const offers = await db.offer.findMany({
            where: {
                idPublicacionPedida: postId
            }
        })
        return offers;
    }
    catch {
        return null
    }
}

export const getOffersByOfferentId = async ({offerentId}) => {
    try {
        const offers = await db.offer.findMany({
            where: {
                idOfertante: offerentId
            }
        })
        console.log(offers)
        return offers;
    }
    catch {
        return null
    }

}

export const getConfirmedOffersByPostId = async ({idPublicacionPedida}) => {
    try {
        const offers = await db.offer.findMany({
            where: {
                idPublicacionPedida,
                status: "CONFIRMED"
            }
        })
        return offers;
    } catch {
        return null
    }

}