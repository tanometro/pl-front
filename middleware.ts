// import NextAuth from "next-auth";
// export {auth as middleware} from "@/auth";
// // import authConfig from "./auth.config";
// import { NextResponse } from "next/server";

// // const { auth } = NextAuth(authConfig);

// const publicRoutes = ["/", "/login", "register"];
// const authRoutes = ["/login", "/register"];
// const apiAuthPrefix = "/api/auth";

// // export default auth((req) => {
// //     const { nextUrl } = req;
// //     const isLoggedIn = !!req.auth;
// //     // Permitir todas las rutas de API de autenticación
// //     if (nextUrl.pathname.startsWith(apiAuthPrefix)) {
// //         return NextResponse.next();
// //     }

// //     // Permitir acceso a rutas públicas sin importar el estado de autenticación
// //     if (publicRoutes.includes(nextUrl.pathname)) {
// //         return NextResponse.next();
// //     }

// //     // Redirigir a /dashboard si el usuario está logueado y trata de acceder a rutas de autenticación
// //     if (isLoggedIn && authRoutes.includes(nextUrl.pathname)) {
// //         return NextResponse.redirect(new URL("/dashboard", nextUrl));
// //     }

// //     // Redirigir a /login si el usuario no está logueado y trata de acceder a una ruta protegida
// //     if (
// //         !isLoggedIn &&
// //         !authRoutes.includes(nextUrl.pathname) &&
// //         !publicRoutes.includes(nextUrl.pathname)
// //     ) {
// //         return NextResponse.redirect(new URL("/login", nextUrl));
// //     }

// //     return NextResponse.next();

// // })

// // export const config = {
// //     matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// //   };

export { auth as middleware } from "@/auth"