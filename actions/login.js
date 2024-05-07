"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { signIn } from "../auth"
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "../data/user";
import { sendVerificationEmail } from "@/lib/mail";
export const login = async (values) => {

    const validateFields = LoginSchema.safeParse(values);
    if (!validateFields.success) {
        return { error : "Ops! Revisa los datos."}
    }

    const { email , password } = validateFields.data;

    const existingUser = await getUserByEmail(email);
    //anadir si la contra no es valida al principio
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "No hay un usuario asociado a ese mail!"}
    }

    if (!existingUser.emailVerified) {
        const verifcationToken = await generateVerificationToken(existingUser.email);
        console.log(verifcationToken.token)
        await sendVerificationEmail(verifcationToken.email,verifcationToken.token);
        return {success : "Tu cuenta no se encuentra confirmada, revisa tu bandeja de entrada!"}
    }

    //return {success: "Enviamos un mail de verificacion!"}

    try {
        await signIn("credentials",{
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
        return { success : "Iniciando sesión...", error : ""}
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error : "Usuario o contraseña incorrectos."}
                case "EmailVerification":
                    return { error : "Por favor verifica tu email."}
                default:
                    return { error : "Ops! Algo salio mal."}
            }
        }

        throw error;
    }

}