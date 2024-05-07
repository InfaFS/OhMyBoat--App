/**
 * Rutas accesibles sin tener sesion iniciada
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification",
];

/**
 * Rutas que redirigen a la pagina de settings 
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/reset-password",
    "/auth/new-password",
];
/**
 * Nunca se va bloquear esta ruta ya que es para autenticarse
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Ruta por defecto despues de logearte
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";

/**
 * Ruta por defecto despues de cerrar sesion
 */
export const DEFAULT_SINGOUT_REDIRECT = "/";
