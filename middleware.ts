import NextAuth from "next-auth"
import { routes } from "@/routes"
import authConfig from "@/auth.config"
import { currentRole } from "./lib/session"

const { auth: withAuthMiddleware } = NextAuth(authConfig);

const matchRoute = (pathname: string, route: string) => {
  const dynamicSegmentRegex = /:\w+/g;
  const routePattern = new RegExp(`^${route.replace(dynamicSegmentRegex, '[^/]+')}$`);
  return routePattern.test(pathname);
};

export default withAuthMiddleware(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const userRole = await currentRole();

  const isApiAuthRoute = nextUrl.pathname.startsWith(routes.apiAuthPrefix);
  const isAuthRoute = routes.auth.some(route => matchRoute(nextUrl.pathname, route));
  const isPublicRoute = routes.public.some(route => matchRoute(nextUrl.pathname, route));
  const isTeacherRoute = routes.teacher.some(route => matchRoute(nextUrl.pathname, route));
  const isAdminRoute = routes.admin.some(route => matchRoute(nextUrl.pathname, route));
  const isStudentRoute = routes.student.some(route => matchRoute(nextUrl.pathname, route));
  const defaultUrl = new URL(routes.defaultLoginRedirect, nextUrl);

  if (nextUrl.pathname !== "/settings" && userRole == "undefined") {
    return Response.redirect(new URL("/settings", nextUrl))
  };

  if (nextUrl.pathname == "/") {
    return Response.redirect(new URL(`/${userRole}-dashboard`, nextUrl))
  };

  if (userRole == "student" && (isTeacherRoute || isAdminRoute)) {
    return Response.redirect(new URL("/student-dashboard", nextUrl))
  };

  if (userRole == "teacher" && (isStudentRoute || isAdminRoute)) {
    return Response.redirect(new URL("/teacher-dashboard", nextUrl))
  };

  if (userRole == "admin" && (isTeacherRoute || isStudentRoute)) {
    return Response.redirect(new URL("/admin-dashboard", nextUrl));
  };

  if (isApiAuthRoute) {
    return undefined;
  };

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(defaultUrl)
    };
    return undefined
  };

  if (!isPublicRoute && !isLoggedIn) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) callbackUrl += nextUrl.search

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    return Response.redirect(new URL(
      `/signin?callbackUrl=${encodedCallbackUrl}`,
      nextUrl
    ))
  };

  return undefined;
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};