"use server"
import { db } from "@/lib/db";
import { getCardPostByCompletePostId } from "./cardPosts";
import { CancelarOfertas, RechazarOfertas } from "../actions/Offer";

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
        console.log(vehiclePost)
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

export const eliminarPost = async ({completePostId}) => {
    try {
        
        const boatPost = await getBoatPostById(completePostId);
        const vehiclePost = await getVehiclePostById(completePostId);
        console.log(boatPost);
        console.log(vehiclePost);

        if (boatPost !== null) {
            const deletedBoat = await db.boatPost.update({
                where: {
                    id: boatPost.id,
                },
                data: {
                    status: "DELETED",
                }
            });
            console.log(deletedBoat);
        } else {
            const deletedVehicle = await db.vehiclePost.update({
                where: {
                    id: vehiclePost.id,
                },
                data: {
                    status: "DELETED",
                }
            });
            console.log(deletedVehicle);
        }

        const card = await getCardPostByCompletePostId({completePostId});
        console.log(card)


        const deletedCard = await db.cardPost.update({
            where: {
                id: card.id,
            },
            data: {
                status: "DELETED",
            }
        });
        console.log(deletedCard);

        const cancelarOfertas = await CancelarOfertas({postId: completePostId});
        console.log(cancelarOfertas);
        const rechazarOfertas = await RechazarOfertas({postId: completePostId});
        console.log(rechazarOfertas);

        return {success: "Post eliminado correctamente"};

    } catch(error){
        console.log(error);
        return null;
    }


}