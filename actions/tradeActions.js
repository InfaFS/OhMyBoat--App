"use server"
import { db } from "@/lib/db"
import { getBoatPostById } from "../data/posts";
import { getCardPostByCompletePostId } from "../data/cardPosts";

export const getTradesById = async (id) => {
    try {
        const trades = await db.trade.findMany({
            where: {
                OR: [
                    { idUsuario1: id },
                    { idUsuario2: id },
                ]
            }
        });
        return trades;

    } catch {
        return null;
    }

}

export const getAllPendingTrades = async () => {
    try {
        const pendingTrades = await db.trade.findMany({
            where: {
                OR : [
                    { status: "FECHA_PACTADA"},
                ]
            }
        });
        console.log(pendingTrades)
        return pendingTrades;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const DateAlreadySetted = async ({idTrade,idUser}) => {
    try {
        const actualTrade = await db.trade.findUnique({
            where: {
                id: idTrade,
            }
        });
        if ((actualTrade.idUsuario1 === idUser)) {
            if (actualTrade.proposedDay1 === "EMPTY") {
                return false;
            }
            return true;
        }
        if (actualTrade.idUsuario2 === idUser) {
            if (actualTrade.proposedDay2 === "EMPTY") {
                return false;
            }
            return true;
        }

    } catch (error) {
        console.log(error)
        return null;
}
}

export const setTradeDate = async ({userId,tradeId,proposedDay}) => {
    try {
        console.log(userId)
        console.log(tradeId)
        console.log(proposedDay)

        const actualTrade = await db.trade.findUnique({
            where: {
                id: tradeId,
            }
        });
        let res
        if ((actualTrade.idUsuario1 === userId)) {
            res = await db.trade.update({
                where: {
                    id: tradeId,
                },
                data: {
                    proposedDay1: proposedDay,
                }
            });
        }
        if (actualTrade.idUsuario2 === userId) {
            res = await db.trade.update({
                where: {
                    id: tradeId,
                },
                data: {
                    proposedDay2: proposedDay,
                }
            });
        }
        if((res.proposedDay1 !== "EMPTY" && res.proposedDay2 !== "EMPTY") && (res.proposedDay1 === res.proposedDay2)) {
            console.log("entra")
            await db.trade.update({
                where: {
                    id: tradeId,
                },
                data: {
                    status: "FECHA_PACTADA",
                }
            });
        }
        if (res) {
            return {success : "La fecha se cargó correctamente"}
        }

        return null;
    } catch (error) {
        console.log(error)
        return null;
    }


}

const modificarCards = async ({idCompletePost1,idCompletePost2,userId1,userId2}) => {
    try {
        const card1 = await getCardPostByCompletePostId({completePostId: idCompletePost1});
        const card2 = await getCardPostByCompletePostId({completePostId: idCompletePost2});
        if (card1 !== null && card2 !== null) {
            const res1 = await db.cardPost.update({
                where: {
                    id: card1.id,
                },
                data: {
                    idPublisher: userId2,
                }
            });
            const res2 = await db.cardPost.update({
                where: {
                    id: card2.id,
                },
                data: {
                    idPublisher: userId1,
                }
            });
            if (res1 && res2) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.log(error)
        return null;
    }



}

export const confirmTrade = async ({tradeId}) => {
    try {
        const res = await db.trade.update({
            where: {
                id: tradeId,
            },
            data: {
                status: "TRUEQUE_REALIZADO",
            }
        });

        const userId1 = res.idUsuario1;
        console.log(userId1);
        const userId2 = res.idUsuario2;
        console.log(userId2);
        const publicationId1 = res.idPost1;
        console.log(publicationId1);
        const publicationId2 = res.idPost2;
        console.log(publicationId2);
        //vamos a intercambiar los ids de las publicaciones
        let isBoat = false;
        const publication1EsBote = await getBoatPostById(publicationId1);
        console.log(publication1EsBote);
        if (publication1EsBote !== null) {
            console.log("entra");
            isBoat = true;
        }
        if (isBoat === true) {
            const res1 = await db.boatPost.update({
                where: {
                    id: publicationId1,
                },
                data: {
                    idPublisher: userId2,
                }
            });
            console.log(res1);
            
            const res2 = await db.vehiclePost.update({
                where: {
                    id: publicationId2,
                },
                data: {
                    idPublisher: userId1,
                }
            });
            console.log(res2);
            const ok = await modificarCards({idCompletePost1: publicationId1,idCompletePost2: publicationId2,userId1: userId1,userId2: userId2});
            console.log(ok);

        }
        if (isBoat === false){
            const res1 = await db.vehiclePost.update({
                where: {
                    id: publicationId1,
                },
                data: {
                    idPublisher: userId2,
                }
            });

            console.log(res1);

            const res2 = await db.boatPost.update({
                where: {
                    id: publicationId2,
                },
                data: {
                    idPublisher: userId1,
                }
            });

            console.log(res2);
            const ok = await modificarCards({idCompletePost1: publicationId1,idCompletePost2: publicationId2,userId1: userId1,userId2: userId2});
            console.log(ok);
        }
        if (res) {
            return {success : "El trueque se confirmó correctamente"}
        }

        return null;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const rejectTrade = async ({tradeId}) => {
    try {
        const res = await db.trade.update({
            where: {
                id: tradeId,
            },
            data: {
                status: "TRUEQUE_NO_REALIZADO",
            }
        });
        if (res) {
            return {success : "Se confirmó que no se realizó el trueque correctamente!"}
        }

        return null;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getAllCheckedTrades = async () => {

    try {
        const checkedTrades = await db.trade.findMany({
            where: {
                OR : [
                    { status: "TRUEQUE_REALIZADO"},
                    { status: "TRUEQUE_NO_REALIZADO"},
                ]
            }
        });
        console.log(checkedTrades)
        return checkedTrades;
    } catch (error) {
        console.log(error);
        return null;
    }

}