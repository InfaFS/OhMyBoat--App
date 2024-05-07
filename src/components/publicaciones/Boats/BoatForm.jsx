"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { useForm } from "react-hook-form";
import { publicarBarco } from "../../../../actions/publicar-barco";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FormSuccess } from "@/components/FormSuccess";
import { Toaster, toast } from 'sonner'; // Importa la función toast desde sonner

export const BoatForm = () => {
    const [imageError,setImageError] = useState("");
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

        console.log(data);
        const { title, year, marine, image } = data;
        const file = image[0];
        console.log(file);
        const archivo = new FormData();
        archivo.append("image", file);
        const res = await publicarBarco({ title, year, marine, archivo });
        setSuccess(res?.success);
        setUrl(res?.message);
        setError(res?.error);
        console.log(res?.success, res?.message);
        toast.success('¡Publicació creada!');

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
            toast.error('Ops, algo salió mal!');
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
            <Toaster richColors position='bottom-center'/>
            {!success && (
                <>

                <CardWrapper
                    headerLabel="Crear una publicación de un barco rellenando los datos."
                    backButtonLabel="Cancelar y volver al inicio"
                    backButtonHref="/"
                    headerTitle="Publicar Barco"
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

                            <label htmlFor="year" className="text-slate-500 block text-sm">
                                Modelo:
                            </label>
                            <Input
                                type="text"
                                {...register("year", { required: { value: true, message: "Modelo obligatorio" } })}
                                placeholder="..."
                            />
                            {errors.year && (
                                <span className="text-red-500 text-sm">{errors.year.message}</span>
                            )}

                            <label htmlFor="marine" className="text-slate-500 block text-sm">
                                Marina:
                            </label>
                            <Input
                                type="text"
                                {...register("marine", { required: { value: true, message: "Marina obligatoria" } })}
                                placeholder="..."
                            />
                            {errors.marine && (
                                <span className="text-red-500 text-sm">{errors.marine.message}</span>
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
                                    <img src={previewUrl} alt="Inválido" style={{ maxWidth: "100px", maxHeight: "100px" }} />
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
            )}

            {success && (
                <>
                <CardWrapper
                    backButtonHref="/"
                    backButtonLabel="Volver a publicaciones"
                    headerTitle="Publicar barco"
                >
                    <FormSuccess message={success} />
                </CardWrapper>
                </>
            )}
        </>
    );
};

