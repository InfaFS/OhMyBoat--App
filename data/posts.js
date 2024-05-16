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

