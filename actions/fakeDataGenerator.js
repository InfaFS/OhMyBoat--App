"use server";
import { db } from "@/lib/db";
import { getRandomUrlBoat } from "@/lib/urlgenerator";
export const fakeDataGenerator = async (cant) => {
  
  try {
    const randomUrlBoat = await getRandomUrlBoat();
    console.log(cant);
    const crearPublicacion = await db.post.create({
      data: {
        title: "Publicacion falsa",
        img: randomUrlBoat,
        modelo: "modelo random",
        marina: "marina random",
      }
    })
    console.log(crearPublicacion);
    console.log(`Se generaron ${cant} publicaciones falsas.`);
  } catch (error) {
    console.error('Error al generar datos falsos:', error);
  } 
};
// Genera 10 publicaciones falsas