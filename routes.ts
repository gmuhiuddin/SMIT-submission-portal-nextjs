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
  ],
  teacher: [
    "/teacher-dashboard",
    "/create-classroom",
    "/class-room/:class_room_id",
    "/crate-assignment/:class_room_id",
  ],
  apiAuthPrefix: "/api/auth",
  defaultLoginRedirect: "/settings",
  defaultLogoutRedirect: "/signin"
}