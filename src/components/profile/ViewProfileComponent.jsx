import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../ui/card";
  import Link from "next/link";
  import { Button } from "../ui/button";
  import { Separator } from "../ui/separator";
  import RatingComponent from "./RatingComponent";
  import { intRandomizer } from "../../../data/extra-stuff";
  
  export function ViewProfileComponentInfa({ firstname, lastname, birthday, email,role}) {
    let rol = null
    if (role === "ADMIN") {
        rol = "Administrador"
    }
    if (role === "USER") {
        rol = "Usuario"
    }
    if (role === "MANAGER") {
        rol = "Gerente"
    }


    return (
      <div className="flex items-center justify-center h-screen">
        <div style={{ width: "50%", height: "85%" }}>
          <div className="bg-sky-700 rounded-lg shadow-md p-4">
            <Card>
              <CardHeader>
                <CardTitle className="hover:text-blue-500 cursor-pointer">
                    {`Perfil del ${rol}`}
                    </CardTitle>
                <CardDescription>Datos del usuario:</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                <p className="mb-2 ">
                  <span className="font-semibold hover:text-blue-500 cursor-pointer">Nombre:</span> {firstname} 
                </p>
  
                <p className="mb-2">
                  <span className="font-semibold hover:text-blue-500 cursor-pointer">Apellido:</span> {lastname} 
                </p>
  
                <p className="mb-2">
                  <span className="font-semibold hover:text-blue-500 cursor-pointer">Email:</span> {email}
                </p>

                <p className="mb-2">
                  <span className="font-semibold hover:text-blue-500 cursor-pointer">Fecha de Nacimiento:</span> {birthday}
                </p>
            
              {/* Solo mostrar reseñas para usuarios. */}
              { role === "USER" && (
                <section className="flex items-center space-x-4 space-y-5">
                  <RatingComponent number={intRandomizer(6)} />
                  <Button variant="ghost" className="hover:text-blue-500">Ver reseñas</Button>
                </section>
              )}

                </div>
                <Separator />
              </CardContent>
              <CardFooter>
                <div>
                <Link href="/">
                <Button className="mr-2 hover:text-blue-700" variant="ghost">Volver al inicio</Button>
                </Link>
                </div>
     
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  