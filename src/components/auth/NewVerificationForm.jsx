"use client"
import { useSearchParams } from "next/navigation"
import { CardWrapper } from "./CardWrapper"
import {PulseLoader} from "react-spinners"
import { useCallback, useEffect } from "react"
import { newVerification } from "../../../actions/new-verification"
import { useState } from "react"
import { FormError } from "../FormError"
import { FormSuccess } from "../FormSuccess"

export const NewVerificationForm = () => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const searchParams = useSearchParams()
    const token = searchParams.get("token")


    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Token invalido!")
        }
        
        newVerification(token)
        .then((response) => {
            response.error ? setError(response.error) : setSuccess(response.success)
        })
        .catch(() => {
            setError("Algo salio mal!")
        })
        console.log(token)
    },[token])

    useEffect(() => {
        onSubmit()
    },[onSubmit])

    return (
        <CardWrapper
        headerLabel="Confirmando tu verificacion!"
        backButtonLabel="Inicia sesion"
        backButtonHref="/auth/login">
            <div className="flex items-center w-full justify-center">
                { !error && !success && <PulseLoader/>}
         
                <FormSuccess message={success}/>
                <FormError message={error}/>
            </div>
        </CardWrapper>
    )

}