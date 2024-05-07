"use server"
import { writeFile} from "fs/promises"
import { db } from "@/lib/db"
export const publicarBarco = async (values) => {
    console.log(values)
    const { title, year, marine, archivo } = values;
    console.log(archivo)
    const file = archivo.get("image"); //obtengo la imagen que fue comprimida
    console.log(file)
    console.log(file.name)

    if(!file){
        return { error : "Imagen requerida!"} //si por alguna razon no hay imagen, retorno un error
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes); //chequeo que pueda ponerla en mi compu
    const path = `public/${file.name}`; //genero un path para guardar imagen
    const pathUsar = `/${file.name}`; //el path que va a usar el componente que renderiza las publis
    await writeFile(path,buffer); //escribo la imagen en mi compu

    const publicacionCreada = await db.post.create({ //crep la publicacion
        data: {
          title: title,
          img: pathUsar,
          modelo: year,
          marina: marine,
        }
      })
    
    if (!publicacionCreada) {
        return { error : "Error al crear la publicacion!"} //si no se creo la publicacion, retorno un error
    }


    return {success : "Publicación creada", message: pathUsar } 
    //si todo salio bien, pongo el succes, y un mensaje que es el path para renderizarla si quiero en el formulario

}