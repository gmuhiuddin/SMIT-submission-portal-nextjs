import { auth } from "@/auth"
import { toObject } from "./actions/auth/helpingFuncs"

export const currentUser = async () => {
  const session = await auth()

  // return toObject(session?.user);
  return session?.user;
}

export const currentRole = async () => {
  const session = await auth()

  return session?.user?.role;
}