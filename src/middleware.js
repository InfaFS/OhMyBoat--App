import { auth } from "../auth"
 
import {DEFAULT_LOGIN_REDIRECT,apiAuthPrefix,publicRoutes,authRoutes} from "../routes"

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)


  //console.log(req.nextUrl)
  if (isApiAuthRoute){ //se hace para que no entre en un loop de redireccionamiento
    return null
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