"use server"

import { db } from "@/lib/db";
import { getUserById } from "../data/user";
import { getBoatPostById, getVehiclePostById } from "../data/posts";
import { getCardPostByCompletePostId } from "../data/cardPosts";
import { getOffersByOfferentId } from "../data/getOffers";
import { auth } from "../auth";

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
                status : {
                    notIn: ["CANCELLED","REJECTED"],
                }
            } 
        });
        console.log(existingOffer);
        if (existingOffer) {
            return { error: "Ya has ofertado este vehículo a esta embarcación!" }
        }
        const vehiclePost = await getVehiclePostById(idPublicacionOfrecida);
        const boatPost = await getBoatPostById(idPublicacionPedida);
        const userOfertado = await getUserById(boatPost.idPublisher);
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
                firstNameOfertado: userOfertado.firstname,
                lastNameOfertado: userOfertado.lastname,
                tituloPublicacionOfrecida: vehiclePost.title,
                tituloPublicacionPedida: boatPost.title,
                imgPublicacionOfrecida: vehiclePost.img,
                imgPublicacionPedida: boatPost.img,
            }
        });

        // const vehiclePost = await getVehiclePostById(idPublicacionOfrecida);
        // if (!vehiclePost) {
        //     return { error: "Publicación no encontrada!" }
        // }
        // console.log(vehiclePost.id)
        // const vehicleCard = await getCardPostByCompletePostId({completePostId: vehiclePost.id});
        // if (!vehicleCard) {
        //     return { error: "Publicación card no encontrada!" }
        // }
        // const resCardPost = await db.cardPost.update({
        //     where: {
        //         id: vehicleCard.id,
        //     },
        //     data: {
        //         paused: true,
        //     }
        // });
        // const resVehiclePost = await db.vehiclePost.update({
        //     where: {
        //         id: vehiclePost.id,
        //     },
        //     data: {
        //         paused: true,
        //     }
        // });
        if (oferta) {
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
                idPublicacionPedida,
                status : {
                    notIn: ["CANCELLED","REJECTED"],
                }
            }
        });
        if (existingOffer) {
            return { error: "Ya has ofertado esta embarcación a este vehículo!" }
        }

        const boatPost = await getBoatPostById(idPublicacionOfrecida);
        console.log(boatPost);
        const vehiclePost = await getVehiclePostById(idPublicacionPedida);
        console.log(vehiclePost);
        const userOfertado = await getUserById(vehiclePost.idPublisher);
        console.log(userOfertado)

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
                firstNameOfertado: userOfertado.firstname,
                lastNameOfertado: userOfertado.lastname,
                tituloPublicacionOfrecida: boatPost.title,
                tituloPublicacionPedida: vehiclePost.title,
                imgPublicacionOfrecida: boatPost.img,
                imgPublicacionPedida: vehiclePost.img,  
            }
        });

        // const boatPost = await getBoatPostById(idPublicacionOfrecida);
        // if (!boatPost) {
        //     return { error: "Publicación no encontrada!" }
        // }
        // const boatCard = await getCardPostByCompletePostId({completePostId: boatPost.id});
        // if (!boatCard) {
        //     return { error: "Publicación card no encontrada!" }
        // }
        // const resCardPost = await db.cardPost.update({
        //     where: {
        //         id: boatCard.id,
        //     },
        //     data: {
        //         paused: true,
        //     }
        // });
        // const resBoatPost = await db.boatPost.update({
        //     where: {
        //         id: boatPost.id,
        //     },
        //     data: {
        //         paused: true,
        //     }
        // });
        if (oferta) {
            return { success: "Oferta realizada con éxito!" }
        }
    } catch (error) {
        console.error('Error al ofertar:', error);
    }

}

const rechazarOfertaInterno = async ({offerId}) => {
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
                console.log("Oferta rechazada con éxito!")
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

        const rejectAllOffers = await db.offer.findMany({
            where: {
                idPublicacionPedida: res.idPublicacionPedida,
                id: {
                    not: offerId,
                },
                status: "PENDING",
            },
        });

        for (let i = 0; i < rejectAllOffers.length; i++) {
            const rechzada = await rechazarOfertaInterno({offerId: rejectAllOffers[i].id});
            console.log(rechzada);
        }

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
            //ahora pauso la publicacion ofertada
            const resVehiclePost = await getVehiclePostById(res.idPublicacionOfrecida);
            const resVehiclePostUpdated = await db.vehiclePost.update({
                where: {
                    id: resVehiclePost.id,
                },
                data: {
                    paused: true,
                }
            });
            const cardPost = await getCardPostByCompletePostId({completePostId: resVehiclePost.id});
            const cardPostUpdated = await db.cardPost.update({
                where: {
                    id: cardPost.id,
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

            //ahora pauso la publicacion ofertada
            const resBoatPost = await getBoatPostById(res.idPublicacionOfrecida);
            const resBoatPostUpdated = await db.boatPost.update({
                where: {
                    id: resBoatPost.id,
                },
                data: {
                    paused: true,
                }
            });
            const cardPost = await getCardPostByCompletePostId({completePostId: resBoatPost.id});
            const cardPostUpdated = await db.cardPost.update({
                where: {
                    id: cardPost.id,
                },
                data: {
                    paused: true,
                }
            });
        }
        
        const ofertasCanceldas = await db.offer.updateMany({
            where: {
                idOfertante: res.idOfertante,
                idPublicacionOfrecida: res.idPublicacionOfrecida,
                status: "PENDING",
            },
            data: {
                status: "CANCELLED",
            }
        })

        const ofertasRechazadas = await db.offer.updateMany({
            where: {
                idPublicacionPedida: res.idPublicacionOfrecida,
                status: "PENDING",
            },
            data: {
                status: "REJECTED",
            }
        })



        const session = await auth()
        const userId = session.user?.id
        const userOfertado = await getUserById(userId);
        const userOfertante = await getUserById(res.idOfertante);
        console.log(userOfertante);
        console.log(userOfertado);
        const newTrade = await db.trade.create({ //creo el trade con los datos pedidos
            data: {
                status: "FECHA_PENDIENTE",
                proposedDay1: "EMPTY",
                proposedDay2: "EMPTY",
                idUsuario1: userOfertante.id,
                idUsuario2: userOfertado.id,
                idPost1: res.idPublicacionOfrecida,
                idPost2: res.idPublicacionPedida,
                PhoneUsuario1: userOfertante.cellphone,
                PhoneUsuario2: userOfertado.cellphone,
                EmailUsuario1: userOfertante.email,
                EmailUsuario2: userOfertado.email,
                NombreUsuario1: userOfertante.firstname,
                NombreUsuario2: userOfertado.firstname,
                ApellidoUsuario1: userOfertante.lastname,
                ApellidoUsuario2: userOfertado.lastname,
    
            }
        
        })
        console.log(newTrade);
        if (res) {
            return { success: "Oferta confirmada con éxito!" }
        }



    } catch (error) {
        console.error('Error al confirmar la oferta:', error);
    }
}


export const CancelarOferta = async ({offerId}) => {
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

        if (offer) {
            return { success: "Oferta cancelada con éxito!" }
        }

    } catch (error) {
        console.error('Error al cancelar la oferta:', error);
    }

}