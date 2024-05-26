"use server"

import { db } from "@/lib/db";
import { getUserById } from "../data/user";
import { getBoatPostById, getVehiclePostById } from "../data/posts";
import { getCardPostByCompletePostId } from "../data/cardPosts";
import { getOffersByOfferentId } from "../data/getOffers";

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
                status : {
                    notIn: ["CANCELLED","REJECTED"],
                }
            } 
        });
        console.log(existingOffer);
        if (existingOffer) {
            return { error: "Ya has ofertado este vehículo!" }
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

        const vehiclePost = await getVehiclePostById(idPublicacionOfrecida);
        if (!vehiclePost) {
            return { error: "Publicación no encontrada!" }
        }
        console.log(vehiclePost.id)
        const vehicleCard = await getCardPostByCompletePostId({completePostId: vehiclePost.id});
        if (!vehicleCard) {
            return { error: "Publicación card no encontrada!" }
        }
        const resCardPost = await db.cardPost.update({
            where: {
                id: vehicleCard.id,
            },
            data: {
                paused: true,
            }
        });
        const resVehiclePost = await db.vehiclePost.update({
            where: {
                id: vehiclePost.id,
            },
            data: {
                paused: true,
            }
        });
        if (resCardPost && resVehiclePost && oferta) {
            return { success: "Oferta realizada con éxito!" }
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
                status : {
                    notIn: ["CANCELLED","REJECTED"],
                }
            }
        });
        if (existingOffer) {
            return { error: "Ya has ofertado esta embarcación!" }
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

        const boatPost = await getBoatPostById(idPublicacionOfrecida);
        if (!boatPost) {
            return { error: "Publicación no encontrada!" }
        }
        const boatCard = await getCardPostByCompletePostId({completePostId: boatPost.id});
        if (!boatCard) {
            return { error: "Publicación card no encontrada!" }
        }
        const resCardPost = await db.cardPost.update({
            where: {
                id: boatCard.id,
            },
            data: {
                paused: true,
            }
        });
        const resBoatPost = await db.boatPost.update({
            where: {
                id: boatPost.id,
            },
            data: {
                paused: true,
            }
        });
        if (resCardPost && resBoatPost && oferta) {
            return { success: "Oferta realizada con éxito!" }
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

        if (res.boat === false) { //quiere decir que la publicacion ofertada es un auto, por ende la pedida bote
            const vehiclePost = await getVehiclePostById(res.idPublicacionOfrecida);
            if (!vehiclePost) {
                return { error: "Publicación no encontrada!" }
            }
            const vehicleCard = await getCardPostByCompletePostId({completePostId: vehiclePost.id});
            if (!vehicleCard) {
                return { error: "Publicación card no encontrada!" }
            }
            const resCardPost = await db.cardPost.update({
                where: {
                    id: vehicleCard.id,
                },
                data: {
                    paused: false,
                }
            });
            const resVehiclePost = await db.vehiclePost.update({
                where: {
                    id: vehiclePost.id,
                },
                data: {
                    paused: false,
                }
            });
            if( res && resCardPost && resVehiclePost) {
                return { success: "Oferta rechazada con éxito!" }
            }
        } else if (res.boat === true) { //quiere decir que la publicacion ofertada es un bote, por ende la pedida auto  
            const boatPost = await getBoatPostById(res.idPublicacionOfrecida);
            if (!boatPost) {
                return { error: "Publicación no encontrada!" }
            }
            const boatCard = await getCardPostByCompletePostId({completePostId: boatPost.id});
            if (!boatCard) {
                return { error: "Publicación card no encontrada!" }
            }
            const resCardPost = await db.cardPost.update({
                where: {
                    id: boatCard.id,
                },
                data: {
                    paused: false,
                }
            });
            const resBoatPost = await db.boatPost.update({
                where: {
                    id: boatPost.id,
                },
                data: {
                    paused: false,
                }
            });
            if( res && resCardPost && resBoatPost) {
                return { success: "Oferta rechazada con éxito!" }
            }
        }

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

        if (res.boat === false) { //quiere decir que la publicacion ofertada es un auto, por ende la pedida bote
            const boatPost = await getBoatPostById(res.idPublicacionPedida);
            if (!boatPost) {
                return { error: "Publicación no encontrada!" }
            }
            console.log(boatPost);
            const boatCard = await getCardPostByCompletePostId({completePostId: boatPost.id});
            if (!boatCard) {
                return { error: "Publicación card no encontrada!" }
            }
            console.log
            const resCardPost = await db.cardPost.update({
                where: {
                    id: boatCard.id,
                },
                data: {
                    paused: true,
                }
            });
            const resBoatPost = await db.boatPost.update({
                where: {
                    id: boatPost.id,
                },
                data: {
                    paused: true,
                }
            });    
        } else if (res.boat === true) { //quiere decir que la publicacion ofertada es un bote, por ende la pedida auto
            const vehiclePost = await getVehiclePostById(res.idPublicacionPedida);
            if (!vehiclePost) {
                return { error: "Publicación no encontrada!" }
            }
            const vehicleCard = await getCardPostByCompletePostId({completePostId: vehiclePost.id});
            if (!vehicleCard) {
                return { error: "Publicación card no encontrada!" }
            }
            const resCardPost = await db.cardPost.update({
                where: {
                    id: vehicleCard.id,
                },
                data: {
                    paused: true,
                }
            });
            const resVehiclePost = await db.vehiclePost.update({
                where: {
                    id: vehiclePost.id,
                },
                data: {
                    paused: true,
                }
            });
        }

        if (res) {
            return { success: "Oferta confirmada con éxito!" }
        }

    } catch (error) {
        console.error('Error al confirmar la oferta:', error);
    }
}


export const CancelarOferta = async ({offerId,isBoat}) => {
    try {
        console.log(offerId);
        const offer = await db.offer.update({
            where: {
                id: offerId,
            },
            data: {
                status: "CANCELLED",
            }
        });
        
        if(isBoat === true) {
            console.log("entra2")
            const boatPost = await db.boatPost.update({
                where: {
                    id: offer.idPublicacionOfrecida,
                },
                data: {
                    paused: false,
                }
            });
            console.log("entra3")
            const boatCard = await getCardPostByCompletePostId({completePostId: boatPost.id});
            if (!boatCard) {
                return { error: "Publicación card no encontrada!" }
            }

            const cardPost = await db.cardPost.update({
                where: {
                    id: boatCard.id,
                },
                data: {
                    paused: false,
                }
            });
            if (offer && boatPost && cardPost) {
                return { success: "Oferta cancelada con éxito!" }
            }
        } else if (isBoat === false){
            console.log("entra2")
            const vehiclePost = await db.vehiclePost.update({
                where: {
                    id: offer.idPublicacionOfrecida,
                },
                data: {
                    paused: false,
                }
            });
            console.log("entra2")
            const vehicleCard = await getCardPostByCompletePostId({completePostId: vehiclePost.id});
            if (!vehicleCard) {
                return { error: "Publicación card no encontrada!" }
            }

            const cardPost = await db.cardPost.update({
                where: {
                    id: vehicleCard.id,
                },
                data: {
                    paused: false,
                }
            });
            console.log(cardPost)
            if (offer && vehiclePost && cardPost) {
                console.log("entro");
                return { success: "Oferta cancelada con éxito!" }
            }
        }


        if (res) {
            return { success: "Oferta cancelada con éxito!" }
        }

    } catch (error) {
        console.error('Error al cancelar la oferta:', error);
    }

}