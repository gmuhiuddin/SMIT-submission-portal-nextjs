export const routes = {
  public: [
    "/",
    "/new-verification"
  ],
  auth: [
    "/signin",
    "/signup",
    "/reset",
    "/new-password",
    "/error"
  ],
  student: [
    "/student-dashboard",
    "/std-class-room/:class_room_id",
    "/std-assignment/:class_room_id",
  ],
  teacher: [
    "/teacher-dashboard",
    "/assignment/:class_room_id",
    "/create-classroom",
    "/class-room/:class_room_id",
    "/crate-assignment/:class_room_id",
    "/create-post/:class_room_id",
  ],
  apiAuthPrefix: "/api/auth",
  defaultLoginRedirect: "/settings",
  defaultLogoutRedirect: "/signin"
}