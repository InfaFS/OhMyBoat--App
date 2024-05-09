import { auth } from "../auth"
 
import {DEFAULT_LOGIN_REDIRECT,apiAuthPrefix,publicRoutes,authRoutes} from "../routes"

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const Role = req.auth?.user?.role
  const isAdminRoute = nextUrl.pathname.startsWith("/admin") //para saber si es una ruta de admin

  console.log("Es ruta de admin?",isAdminRoute)

  if (isApiAuthRoute){ //se hace para que no entre en un loop de redireccionamiento
    return null
  }

  if (isAdminRoute){ //si es ruta de admin
    
    if (isLoggedIn && Role === "ADMIN"){ //si esta loggeado Y SU ROL es admin
      return null
    }
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl)) //sino mandame a settings o logearme.
  }





  if (isAuthRoute){
    if (isLoggedIn){
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl)) //nextUrl hace la ruta absoluta
    }
    return null
  }
  //console.log(isPublicRoute)

  


  if (!isLoggedIn && !isPublicRoute){
    return Response.redirect(new URL("/auth/login", nextUrl))
  }



  return null;
  

  
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}

// QUE VAYA ADENTRO DEL SRC SINO NO FUNCA