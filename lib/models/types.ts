import { Document } from "mongoose"

export enum UserRole {
  STUDENT = "student",
  TEACHER = "teacher",
  UNDEFINED = "undefined"
}

export enum UserProvider {
  GOOGLE = "google",
  CREDENTIALS = "credentials"
}

export interface IUser extends Document {
  name: string
  email: string
  password?: string
  image?: string
  role: UserRole
  provider: UserProvider
  emailVerified: Date
  isTwoFactorEnabled: boolean
  createdAt: Date
  updatedAt: Date
}