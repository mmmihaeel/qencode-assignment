import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().regex(/(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#.$%^&*]{8,}/, {
    message: "Invalid password",
  }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().min(1).email(),
});

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8)
      .regex(/(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#.$%^&*]{8,}/, {
        message: "Invalid password",
      }),
    confirmPassword: z
      .string()
      .min(8)
      .regex(/(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#.$%^&*]{8,}/, {
        message: "Invalid password",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
