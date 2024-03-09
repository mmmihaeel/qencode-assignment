import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "e-mail required").email(),
  password: z.string().regex(/(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#.$%^&*]{8,}/, {
    message:
      "Password must contain at least 8 characters and at least one number",
  }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().min(1, "e-mail required").email(),
});

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8)
      .regex(/(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#.$%^&*]{8,}/, {
        message:
          "Password must contain at least 8 characters and at least one number",
      }),
    confirmPassword: z
      .string()
      .min(8)
      .regex(/(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#.$%^&*]{8,}/, {
        message:
          "Password must contain at least 8 characters and at least one number",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
