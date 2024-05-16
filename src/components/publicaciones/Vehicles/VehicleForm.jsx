"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { useForm } from "react-hook-form";
import { publicarVehiculo } from "../../../../actions/publicar-vehiculo";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FormSuccess } from "@/components/FormSuccess";
import { Toaster, toast } from 'sonner'; // Importa la función toast desde sonner
import { useRouter } from "next/navigation";

export const VehicleForm = () => {
    const [imageError,setImageError] = useState("");
    const [previewUrl, setPreviewUrl] = useState(null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {
        console.log(data);
        const { title,modelo,descripcion,patente,kilometraje,cantpuertas,image} = data;
        const file = image[0];
        console.log(file);
        const archivo = new FormData();
        archivo.append("image", file);
        const res = await publicarVehiculo({ title,modelo,descripcion,patente,kilometraje,cantpuertas,archivo});
        setError(res?.error);
        if (res.success) {
            toast.success('¡Publicación creada!');
            router.push("/");

        }


        // Mostrar un toast de éxito cuando se envía el formulario correctamente
  
    };

    const onSubmitWithEvent = (event) => {
        event.preventDefault();
        console.log(event.target.image.files[0])
        if (event.target.image.files[0] === undefined){
            setImageError("Imagen obligatoria");
        }
        handleSubmit(onSubmit)();
    };

    const handleFileChange = (selectedFile) => {
    
        if (selectedFile && selectedFile.name.includes(".jpg") | selectedFile.name.includes(".jpeg") | selectedFile.name.includes(".png")) {
            setImageError("");
            console.log(selectedFile);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
        else {
            setPreviewUrl(null); //hago esto para cuando no selecciono archivo me lo saque
            if (selectedFile === undefined){
                setImageError("Imagen obligatoria");
                return;
            }
            setImageError("Por favor, selecciona un archivo de tipo JPG, PNG o JPEG.");
        }
    };


    return (

            <>   
                <CardWrapper
                    headerLabel="Crear una publicación de un vehiculo rellenando los datos."
                    backButtonLabel="Cancelar y volver al inicio"
                    backButtonHref="/"
                    headerTitle="Publicar Vehículo"
                >
                    <form onSubmit={onSubmitWithEvent}>
                        <div className="space-y-4">
                            <label htmlFor="title" className="text-slate-500 block text-sm">
                                Titulo:
                            </label>
                            <Input
                                type="text"
                                {...register("title", { required: { value: true, message: "Titulo obligatorio" } })}
                                placeholder="..."
                            />
                            {errors.title && (
                                <span className="text-red-500 text-sm">{errors.title.message}</span>
                            )}

                            <label htmlFor="modelo" className="text-slate-500 block text-sm">
                                Modelo:
                            </label>
                            <Input
                                type="text"
                                {...register("modelo", { required: { value: true, message: "Modelo obligatorio" } })}
                                placeholder="..."
                            />
                            {errors.modelo && (
                                <span className="text-red-500 text-sm">{errors.modelo.message}</span>
                            )}

                            <label htmlFor="descripcion" className="text-slate-500 block text-sm">
                                Descripción:
                            </label>
                            <Input
                                type="text"
                                {...register("descripcion", { required: { value: true, message: "Descripción obligatoria" } })}
                                placeholder="..."
                            />
                            {errors.descripcion && (
                                <span className="text-red-500 text-sm">{errors.descripcion.message}</span>
                            )}

                            <label htmlFor="patente" className="text-slate-500 block text-sm">
                                Patente:
                            </label>
                            <Input
                                type="text"
                                {...register("patente", { required: { value: true, message: "Patente obligatoria" } })}
                                placeholder="..."
                            />
                            {errors.patente && (
                                <span className="text-red-500 text-sm">{errors.patente.message}</span>
                            )}

                            <label htmlFor="kilometraje" className="text-slate-500 block text-sm">
                                Kilometraje
                            </label>
                            <Input
                                type="text"
                                {...register("kilometraje", { required: { value: true, message: "Kilometraje obligatorio" } })}
                                placeholder="..."
                            />
                            {errors.kilometraje && (
                                <span className="text-red-500 text-sm">{errors.kilometraje.message}</span>
                            )}

                            <label htmlFor="cantpuertas" className="text-slate-500 block text-sm">
                                Cantidad de puertas:
                            </label>
                            <Input
                                type="text"
                                {...register("cantpuertas", { required: { value: true, message: "Cantidad de puertas obligatoria" } })}
                                placeholder="..."
                            />
                            {errors.cantpuertas && (
                                <span className="text-red-500 text-sm">{errors.cantpuertas.message}</span>
                            )}
                            
                            <label htmlFor="image" className="text-slate-500 block text-sm">
                                Imagen:
                            </label>
                            <Input
                                type="file"
                                {...register("image", {
                                    required: { value: true, message: "Imagen obligatoria" },
                                    validate: {
                                        validFileType: (value) => {
                                            if (!value) return true;
                                            const fileType = value[0].type;
                                            const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
                                            if (!allowedTypes.includes(fileType)) {
                                                return "Por favor, selecciona un archivo de tipo JPG, PNG o JPEG.";
                                            }
                                            return true;
                                        },
                                    },
                                })}
                                onChange={(e) => handleFileChange(e.target.files[0])}
                            />

                            { imageError && (
                                <span className="text-red-500 text-sm">{imageError}</span>
                            ) }

                            {previewUrl && (
                                <div>
                                    <img className="rounded-md" src={previewUrl} alt="Inválido" style={{ maxWidth: "100px", maxHeight: "100px" }}/>
                                </div>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-sky-500 hover:bg-sky-600 text-white mt-5"
                        >
                            Publicar
                        </Button>
                    </form>
                </CardWrapper>
        </>
    );
};
