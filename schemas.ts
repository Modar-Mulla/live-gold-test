import z from "zod"
export const LoginSchema = z.object({
  username: z.string().min(1, "Email is Required"),
  password: z.string().min(1, "Password is Required")
})