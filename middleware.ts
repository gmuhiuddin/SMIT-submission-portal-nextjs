import NextAuth from "next-auth"
import { routes } from "@/routes"
import authConfig from "@/auth.config"
import { currentRole } from "./lib/session"

const { auth: withAuthMiddleware } = NextAuth(authConfig)

export default withAuthMiddleware(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const userRole = await currentRole();

  const isApiAuthRoute = nextUrl.pathname.startsWith(routes.apiAuthPrefix);
  const isAuthRoute = routes.auth.includes(nextUrl.pathname);
  const isPublicRoute = routes.public.includes(nextUrl.pathname);
  const defaultUrl = new URL(routes.defaultLoginRedirect, nextUrl);

  if(nextUrl.pathname !== "/settings" && userRole == "undefined"){
    return Response.redirect(new URL("/settings", nextUrl))
  };

  if(nextUrl.pathname == "/"){
    return Response.redirect(new URL(`/${userRole}-dashboard`, nextUrl))
  };

  if(userRole == "student" && nextUrl.pathname == "/teacher-dashboard" || nextUrl.pathname == "/create-classroom/:class_room_id"){
    return Response.redirect(new URL("/", nextUrl))
  };

  if(userRole == "teacher" && nextUrl.pathname == "/" || nextUrl.pathname == "/student-dashboard"){
    return Response.redirect(new URL("/teacher-dashboard", nextUrl))
  };

  if (isApiAuthRoute) {
    return undefined
  };

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(defaultUrl)
    }
    return undefined
  }

  if (!isPublicRoute && !isLoggedIn) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) callbackUrl += nextUrl.search
    
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    return Response.redirect(new URL(
      `/signin?callbackUrl=${encodedCallbackUrl}`,
      nextUrl
    ))
  }

  return undefined
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}