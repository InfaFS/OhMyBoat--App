"use client"
//VER COMO RECIBIR LOS ERRORES DEL ROUTE.JS
//exportar desde ahi sino no funciona

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form"
import { useTransition } from "react";
import { LoginSchema } from "@/schemas";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { login } from "../../../actions/login";
import Link from "next/link";


export const LoginForm = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition(); //usamos esto para la login transition
    const [response,setResponse] = useState("");
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");
    startTransition(() => {login(data)
        .then((response) => {
            setError(response?.error) //con el ? no le asigna indefinido si no le llega nada
            setSuccess(response?.success)
        })
    })
  
    console.log(success)
    console.log(error)
    }

    return (

        <CardWrapper 
            headerLabel="Bienvenido de vuelta!" 
            backButtonLabel="No tienes una cuenta?" 
            backButtonHref="/auth/register"
            headerTitle="Iniciar sesión"
        >
            <Form {... form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                >
                
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email:</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="tinchotech@gmail.com"
                                        type="email"
                                        />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password:</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="******"
                                        type="password"
                                        />
                                </FormControl>
                                <Button size="sm" variant="link" className="px-0 font-normal">
                                    <Link href="/auth/reset-password">
                                        Olvidaste tu contraseña?
                                    </Link>
                                </Button>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

    
                </div>
                {/* luego el error los mostrar */}
                <FormError message={error}/>
                <FormSuccess message={success}/>

                <Button disabled={isPending}
                type="submit" 
                className="w-full">
                    Iniciar Sesión
                </Button>
                </form>
            </Form>
        </CardWrapper>    
    );

}

