export interface ErrorResponse {
  error: number;
  detail:
    | {
        loc: string[];
        msg: string;
        type: string;
      }[]
    | string;
  timestamp: number;
}

export interface LoginResponse extends ErrorResponse {
  access_token: string;
  refresh_token: string;
  token_expire: number;
  refresh_token_expire: number;
}

export interface PasswordResetResponse extends ErrorResponse {}

export interface SetNewPasswordResponse extends ErrorResponse {}

export interface VarifyAccessTokenResponse extends ErrorResponse {
  timestamp: number;
  access_token: string;
  refresh_token: string;
  token_expire: number;
  refresh_token_expire: number;
}

export interface VarifyRefreshTokenResponse extends ErrorResponse {
  timestamp: number;
  access_token: string;
  refresh_token: string;
  token_expire: number;
  refresh_token_expire: number;
}
