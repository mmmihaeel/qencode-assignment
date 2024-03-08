export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface PasswordResetRequestBody {
  email: string;
  redirect_url: string;
}

export interface SetNewPasswordRequestBody {
  token: string;
  secret: string;
  password: string;
  password_confirm: string;
}

export interface VerifyAccessTokenRequestBody {
  access_id: string;
  accessToken: string;
}

export interface VerifyRefreshTokenRequestBody {
  access_id: string;
  accessToken: string;
}
