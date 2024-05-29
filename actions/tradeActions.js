"use server"
import { db } from "@/lib/db"

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