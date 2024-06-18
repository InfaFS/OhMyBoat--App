"use server"
import { db } from "@/lib/db";
import { auth } from "../auth";
import { getUserById } from "../data/user";
export const createReview = async ({tradeId,stars,description,title}) => {
    try {
        console.log(tradeId,stars,description);
        const session = await auth();
        const user = session?.user //obtenemos el usuario
        const userFound = await getUserById(user.id);
        //obtenemos la sesion del usuario
        console.log(userFound);
        const trade = await db.trade.findFirst({
            where: {
                id: tradeId,
            },
        });
        console.log(trade.idUsuario1);
        if (userFound.id === trade.idUsuario1) { //si es el user uno entonces marco como reseñado y creo la review
            const updatedTrade = await db.trade.update({
                where: {
                    id: tradeId,
                },
                data: {
                    ReviewedByUser1: true,
                },
            })

            console.log(updatedTrade);
            const review = await db.review.create({
                data: {
                    idReviewer: userFound.id,
                    idReviewed: trade.idUsuario2,
                    stars: stars,
                    description: description,
                    title: title,
                    ReviewerFirstName: userFound.firstname,
                    ReviewerLastName: userFound.lastname,
                    tradeId: tradeId,
                },
            });

            console.log(review);


        } else if (userFound.id === trade.idUsuario2) {

            const updatedTrade = await db.trade.update({
                where: {
                    id: tradeId,
                },
                data: {
                    ReviewedByUser2: true,
                },
            })

            console.log(updatedTrade);
            const review = await db.review.create({
                data: {
                    idReviewer: userFound.id,
                    idReviewed: trade.idUsuario1,
                    stars: stars,
                    description: description,
                    title : title,
                    ReviewerFirstName: userFound.firstname,
                    ReviewerLastName: userFound.lastname,
                    tradeId: tradeId,
                },
            });

            console.log(review);
        }

        return {success: "Reseña hecha con éxito!"}

    } catch(error){
        console.log(error);
        return null;
    }



}

export const UserRatingProm = async (id) => {
    const reviews = await db.review.findMany({
        where: {
            idReviewed: id,
        },
    });
    console.log(reviews);
    let total = 0;
    reviews.map((review) => {
        total += review.stars;
    });
    console.log(total);
    const promedio = (total / reviews.length) ;
    const promedioRedondeado = Math.round(promedio);
    console.log(promedioRedondeado)
    return promedioRedondeado;

}

export const getUserReviewsByUserId = async (id) => {  
    try{
        const reviews = await db.review.findMany({
            where: {
                idReviewed: id,
            },
        });
        console.log(reviews);
        return reviews;

    } catch(error){
        console.log(error);
        return null;
    }

}