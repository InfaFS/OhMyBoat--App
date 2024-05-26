import { db } from "@/lib/db";

export const getBoatPostById = async (id) => {
    try {
        const boatPost= await db.boatPost.findUnique({
            where: {
                id,
            }
        });

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
                    paused: false,
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
                    paused: false,
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


