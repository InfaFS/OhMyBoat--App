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
        
        const notificacionOferta = await db.notification.create({
            data: {
                idEmisor: idOfertante,
                idReceptor: boatPost.idPublisher,
                title: "Nueva oferta!",
                description: `El usuario ${user.firstname} ${user.lastname} ha ofertado su vehículo ${vehiclePost.title} por tu embarcación ${boatPost.title}`,
                seen: false,
                type: "OFFER",
            }
        
        })
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

        const notificacionOferta = await db.notification.create({
            data: {
                idEmisor: idOfertante,
                idReceptor: vehiclePost.idPublisher,
                title: "Nueva oferta!",
                description: `El usuario ${user.firstname} ${user.lastname} ha ofertado su embarcación ${boatPost.title} por tu vehículo ${vehiclePost.title}`,
                seen: false,
                type: "OFFER",
            }
        
        })
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

        // const notificacion = await db.notification.create({
        //     data: {
        //         idEmisor: "???",
        //         idReceptor: res.idOfertante,
        //         title: "Oferta rechazada",
        //         description: `Tu oferta por la publicación ${res.tituloPublicacionPedida} ha sido rechazada`,
        //         seen: false,
        //         type: "OFFER",
        //     }
        // })

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
                    status: "ACTIVE",
                }
            });
            const resVehiclePost = await db.vehiclePost.update({
                where: {
                    id: vehiclePost.id,
                },
                data: {
                    status: "ACTIVE",
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
                    status: "ACTIVE",
                }
            });
            const resBoatPost = await db.boatPost.update({
                where: {
                    id: boatPost.id,
                },
                data: {
                    status: "ACTIVE",
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

        const notificacion = await db.notification.create({
            data: {
                idEmisor: "???",
                idReceptor: res.idOfertante,
                title: "Oferta rechazada",
                description: `Tu oferta de ${res.tituloPublicacionOfrecida} por la publicación ${res.tituloPublicacionPedida} ha sido rechazada`,
                seen: false,
                type: "OFFER",
            }
        })

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

        


        const ofertaParalela = await db.offer.findFirst({
            where: {
                idPublicacionPedida: res.idPublicacionOfrecida,
                idPublicacionOfrecida: res.idPublicacionPedida,
                status: "PENDING",
            }
        });
        if (ofertaParalela) {
            const confirmada = await db.offer.update({
                where: {
                    id: ofertaParalela.id,
                },
                data: {
                    status: "CONFIRMED",
                }
            });
            console.log(confirmada);
        }

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
            console.log(boatCard)
            const resCardPost = await db.cardPost.update({
                where: {
                    id: boatCard.id,
                },
                data: {
                    status: "PAUSED",
                }
            });
            console.log(resCardPost);
            const resBoatPost = await db.boatPost.update({
                where: {
                    id: boatPost.id,
                },
                data: {
                    status: "PAUSED",
                }
            });    
            console.log(resBoatPost);
            //ahora pauso la publicacion ofertada
            const resVehiclePost = await getVehiclePostById(res.idPublicacionOfrecida);
            console.log(resVehiclePost)
            const resVehiclePostUpdated = await db.vehiclePost.update({
                where: {
                    id: resVehiclePost.id,
                },
                data: {
                    status: "PAUSED",
                }
            });
            console.log(resVehiclePostUpdated);

            const cardPost = await getCardPostByCompletePostId({completePostId: resVehiclePost.id});
            console.log(cardPost);
            const cardPostUpdated = await db.cardPost.update({
                where: {
                    id: cardPost.id, 
                },
                data: {
                    status: "PAUSED",
                }
            });
            console.log(cardPostUpdated);
        } else if (res.boat === true){ //quiere decir que la publicacion ofertada es un bote, por ende la pedida auto
            const vehiclePost = await getVehiclePostById(res.idPublicacionPedida);
            if (!vehiclePost) {
                return { error: "Publicación no encontrada!" }
            }
            console.log(vehiclePost)
            const vehicleCard = await getCardPostByCompletePostId({completePostId: vehiclePost.id});
            if (!vehicleCard) {
                return { error: "Publicación card no encontrada!" }
            }
            console.log(vehicleCard)
            const resCardPost = await db.cardPost.update({
                where: {
                    id: vehicleCard.id,
                },
                data: {
                    status: "PAUSED",
                }
            });
            console.log(resCardPost)
            const resVehiclePost = await db.vehiclePost.update({
                where: {
                    id: vehiclePost.id,
                },
                data: {
                    status: "PAUSED",
                }
            });
            //pausamos la otra publi ahora
            const resBoatPost = await getBoatPostById(res.idPublicacionOfrecida);
            console.log(resBoatPost);
            const resBoatPostUpdated = await db.boatPost.update({
                where: {
                    id: resBoatPost.id,
                },
                data: {
                    status: "PAUSED",
                }
            });
            console.log(resBoatPostUpdated);
            const cardPost = await getCardPostByCompletePostId({completePostId: resBoatPost.id});
            console.log(cardPost);
            const cardPostUpdated = await db.cardPost.update({
                where: {
                    id: cardPost.id,
                },
                data: {
                    status: "PAUSED",
                }
            });
            console.log(cardPostUpdated);
            
        }

        //mandamos notificacion al ofertante de que se le confirmo la oferta

        // const notificacionConfirmacionAOfertante = await db.notification.create({
        //     data: {
        //         idEmisor: "???",
        //         idReceptor: res.idOfertante,
        //         title: "Oferta aceptada!",
        //         description: `Tu oferta de ${res.tituloPublicacionOfrecida} por la publicación ${res.tituloPublicacionPedida} ha sido aceptada con éxito, ya puedes pactar una fecha para el trueque!`,
        //         seen: false,
        //         type: "OFFER",
        //     }
        //     })
        //console.log(notificacionConfirmacionAOfertante);
            
            //le mandamos que se le pauso la oferta

            // const notificacionPausadaOfertante = await db.notification.create({
            //     data: {
            //         idEmisor: "???",
            //         idReceptor: res.idOfertante,
            //         title: "Publicación pausada",
            //         description: `Debido a que la oferta de la publicación ${res.tituloPublicacionOfrecida} ha sido aceptada, esta ha sido pausada temporalmente`,
            //         seen: false,
            //         type: "OFFER",
            //     }
            //     })
          //  console.log(notificacionPausadaOfertante);
            //ahora pauso la publicacion ofertada
        const post = await getCardPostByCompletePostId({completePostId: res.idPublicacionPedida});
        console.log(post);
        //mandamos notificacion al ofertado de que se le pauso la publi
        // const notificacionPausadaOfertado = await db.notification.create({
        //     data: {
        //         idEmisor: "???",
        //         idReceptor: post.idPublisher,
        //         title: "Publicación pausada",
        //         description: `Debido a que has aceptado el trueque de ${res.tituloPublicacionPedida} y ${res.tituloPublicacionOfrecida} tu publicación ha sido pausada temporalmente`,
        //         seen: false,
        //         type: "OFFER",
        //     }
        //     })
        
        //mandamos notificacion al ofertante de que se le cancelaron las demas ofertas
        const ofertasCanceladasOfertante = await db.offer.updateMany({
            where: {
                idOfertante: res.idOfertante,
                idPublicacionOfrecida: res.idPublicacionOfrecida,
                status: "PENDING",
            },
            data: {
                status: "CANCELLED",
            }
        })
        console.log(ofertasCanceladasOfertante);

        // if (ofertasCanceladasOfertante) {
        //     const notificacionCanceladasOfertante = await db.notification.create({
        //         data: {
        //             idEmisor: "???",
        //             idReceptor: res.idOfertante,
        //             title: "Ofertas canceladas!",
        //             description: `Debido a que tu oferta de ${res.tituloPublicacionPedida} y ${res.tituloPublicacionOfrecida} fue aceptada, las ofertas que hiciste con ${res.tituloPublicacionOfrecida} han sido canceladas`,
        //             seen: false,
        //             type: "OFFER",
        //         }
        //         })
        // }

        const ofertasCanceladasOfertado = await db.offer.updateMany({
            where: {
                idPublicacionOfrecida: res.idPublicacionPedida,
                status: "PENDING",
            },
            data: {
                status: "CANCELLED",
            }
        })
        console.log(ofertasCanceladasOfertado);
        //mandamos notificacion al ofertado de que se le cancelaron las demas ofertas
        // if (ofertasCanceladasOfertado) {

        //         const notificacionCanceladasOfertado = await db.notification.create({
        //             data: {
        //                 idEmisor: "???",
        //                 idReceptor: post.idPublisher,
        //                 title: "Ofertas canceladas!",
        //                 description: `Debido a que tu oferta de ${res.tituloPublicacionPedida} y ${res.tituloPublicacionOfrecida} fue aceptada, las ofertas que hiciste con ${res.tituloPublicacionOfrecida} han sido canceladas`,
        //                 seen: false,
        //                 type: "OFFER",
        //             }
        //          })
        // }

        const ofertasRechazadas = await db.offer.updateMany({
            where: {
                idPublicacionPedida: res.idPublicacionOfrecida,
                status: "PENDING",
            },
            data: {
                status: "REJECTED",
            }
        })
        console.log(ofertasRechazadas);

        // if (ofertasRechazadas) {
        //     ofertasRechazadas.forEach(async oferta => {
        //         const notificacionRechazada = await db.notification.create({
        //             data: {
        //                 idEmisor: "???",
        //                 idReceptor: oferta.idOfertante,
        //                 title: "Oferta rechazada",
        //                 description: `Debido a que la oferta de ${oferta.tituloPublicacionPedida} y ${oferta.tituloPublicacionOfrecida} fue aceptada, tu oferta ha sido rechazada`,
        //                 seen: false,
        //                 type: "OFFER",
        //             }
        //         })
        //     });

        // }



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
                tituloPublicacionOfrecida: res.tituloPublicacionOfrecida,
                tituloPublicacionPedida: res.tituloPublicacionPedida,
                imgPublicacionOfrecida: res.imgPublicacionOfrecida,
                imgPublicacionPedida: res.imgPublicacionPedida
    
            }
        
        })
        console.log(newTrade);

        // const notificacionTrueque1 = await db.notification.create({
        //     data : {
        //         idEmisor: "???",
        //         idReceptor: post.idPublisher,
        //         title: "Trueque pendiente",
        //         description: `La oferta por la publicación ${res.tituloPublicacionPedida} y ${res.tituloPublicacionOfrecida} ha sido aceptada con éxito, ahora puedes pactar una fecha para el trueque!`,
        //         seen: false,
        //         type: "TRADE",
        //     }
        // })

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
        
        const post = await getCardPostByCompletePostId({completePostId: offer.idPublicacionPedida});

        const notificacionOfertante = await db.notification.create({
            data: {
                idEmisor: "???",
                idReceptor: offer.idOfertante,
                title: "Oferta cancelada",
                description: `Tu oferta por la publicación ${offer.tituloPublicacionPedida} ha sido cancelada`,
                seen: false,
                type: "OFFER",
            }
        })

        const notificacionOfertado = await db.notification.create({
            data: {
                idEmisor: "???",
                idReceptor: post.idPublisher,
                title: "Oferta cancelada",
                description: `La oferta de ${offer.tituloPublicacionOfrecida} por la publicación ${offer.tituloPublicacionPedida} ha sido cancelada`,
                seen: false,
                type: "OFFER",
            }
        })

        if (offer) {
            return { success: "Oferta cancelada con éxito!" }
        }

    } catch (error) {
        console.error('Error al cancelar la oferta:', error);
    }

}