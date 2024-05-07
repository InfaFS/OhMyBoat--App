import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "../../../auth";
import BasicMenuCallback from "./BasicMenuCall";

//al ser algo que depende del valor de la session lo ponemos como function async
export async function HeaderTincho () { 

  const session = await auth();
  console.log(session)
  return (
  
    <header className="bg-white text-black w-full py-3 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <img src="https://cdn.discordapp.com/attachments/1217480569202675732/1220096360129499176/Oh_My_Boat_logo_4.jpg?ex=66353f48&is=6633edc8&hm=ccd057c5ac13bd307becfcc1f59907d8b89164f69226fcd3fc8f6529762a93e9&" alt="Logo de Oh My Boat" width={60} height={60}/>
        </Link>
        <div className="flex items-center space-x-4">
        { !session ? (
          <>
          <Link href="/auth/login">
          <Button>Iniciar sesión</Button>
          </Link>
          <Link href="/auth/register">
          <Button>Registrarse</Button>
          </Link>
          </>
        ) : (
        <>
          <BasicMenuCallback/>
        </>)
        }
        </div>
      </div>
    </header>
  );
};
