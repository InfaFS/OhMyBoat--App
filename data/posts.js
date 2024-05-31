"use server"
import { db } from "@/lib/db";
import { getCardPostByCompletePostId } from "./cardPosts";

export const ocultarEmbarcacion = async ({completePostId}) => {
    try {
        console.log(completePostId)
        const hiddenBoat = await db.boatPost.update({
            where: {
                id: completePostId,
            },
            data: {
                status: "HIDDEN",
            }
        });
        console.log(hiddenBoat);

        const card = await getCardPostByCompletePostId({completePostId});
        console.log(card)
        const updatedBoat = await db.cardPost.update({
            where: {
                id: card.id,
            },
            data: {
                status: "HIDDEN",
            }
        });
        console.log(updatedBoat);
        return {success: "Embarcación ocultado correctamente"};
    } catch {
        return null;
    }
}


export const ocultarVehiculo = async ({completePostId}) => {
    try {
        console.log(completePostId);
        const hiddenVehicle = await db.vehiclePost.update({
            where: {
                id: completePostId,
            },
            data: {
                status: "HIDDEN",
            }
        });
        console.log(hiddenVehicle);

        const card = await getCardPostByCompletePostId({completePostId});
        console.log(card)
        const updatedCard = await db.cardPost.update({
            where: {
                id: card.id,
            },
            data: {
                status: "HIDDEN",
            }
        });
        console.log(updatedCard);
        return {success: "Vehículo ocultado correctamente"};
    } catch {
        return null;
    }
}





export const getBoatPostById = async (id) => {
    try {
        console.log(id)
        const boatPost= await db.boatPost.findUnique({
            where: {
                id,
            }
        });
        console.log(boatPost)
        return boatPost;

    } catch {
        return null;
    }
}

export const getVehiclePostById = async (id) => {
    console.log(id)
    try {
        const vehiclePost= await db.vehiclePost.findUnique({
            where: {
                id,
            }
        });

        return vehiclePost;

    } catch {
        return null;
    }
}

export const getAllBoatPostsByUser = async ({userId}) => {
    //voy a obtener los que no se encuentren pausados
    try {
        const boatPosts = await db.boatPost.findMany(
            {
                where: {
                    idPublisher: userId,
                    OR: [
                        { status: "ACTIVE" },
                        { status: "HIDDEN" }
                      ]
                },
            },
        );
        return boatPosts;
    } catch {
        return null;
    }

}

export const getAllVehiclePostsByUser = async ({userId}) => {
    try {
        const vehiclePosts = await db.vehiclePost.findMany(
            {
                where: {
                    idPublisher: userId,
                    OR: [
                        { status: "ACTIVE" },
                        { status: "HIDDEN" }
                      ]
                },
            },
        );
        return vehiclePosts;
    } catch {
        return null;
    }

}

export const getAllPostsByUser = async ({userId}) => {
    try {
        const cardPosts = await db.cardPost.findMany(
            {
                where: {
                    idPublisher: userId,
                },
            },
        ); 
        return cardPosts
    } catch {
        return null;
    }

}


