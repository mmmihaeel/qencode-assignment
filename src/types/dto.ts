export interface LoginDto {
  email: string;
  password: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface NewPasswordDto {
  password: string;
  confirmPassword: string;
}
