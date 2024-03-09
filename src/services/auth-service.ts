import {
  ErrorResponse,
  LoginRequestBody,
  LoginResponse,
  PasswordResetRequestBody,
  PasswordResetResponse,
  SetNewPasswordRequestBody,
  SetNewPasswordResponse,
  VarifyAccessTokenResponse,
  VarifyRefreshTokenResponse,
  VerifyAccessTokenRequestBody,
  VerifyRefreshTokenRequestBody,
} from "../types";
import { AxiosError, AxiosInstance } from "axios";

export const AuthApi = (instance: AxiosInstance) => ({
  async login({ email, password }: LoginRequestBody): Promise<LoginResponse> {
    try {
      const response = await instance.post<LoginResponse>(`/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      const errorResponse = ((error as AxiosError)?.response
        ?.data as ErrorResponse) || {
        error: 1,
        detail: "Unknown error",
        timestamp: Date.now(),
      };
      throw errorResponse;
    }
  },

  async resetPassword({
    email,
    redirect_url,
  }: PasswordResetRequestBody): Promise<PasswordResetResponse> {
    try {
      const response = await instance.post<PasswordResetResponse>(
        `/auth/password-reset`,
        { email, redirect_url }
      );
      return response.data;
    } catch (error) {
      const errorResponse = ((error as AxiosError)?.response
        ?.data as ErrorResponse) || {
        error: 1,
        detail: "Unknown error",
        timestamp: Date.now(),
      };
      throw errorResponse;
    }
  },

  async setNewPassword({
    token,
    secret,
    password,
    password_confirm,
  }: SetNewPasswordRequestBody): Promise<SetNewPasswordResponse> {
    try {
      const response = await instance.post<SetNewPasswordResponse>(
        `/auth/password-set`,
        { token, secret, password, password_confirm }
      );
      return response.data;
    } catch (error) {
      const errorResponse = ((error as AxiosError)?.response
        ?.data as ErrorResponse) || {
        error: 1,
        detail: "Unknown error",
        timestamp: Date.now(),
      };
      throw errorResponse;
    }
  },

  async verifyAccessToken({
    accessToken,
    access_id,
  }: VerifyAccessTokenRequestBody): Promise<VarifyAccessTokenResponse> {
    try {
      const response = await instance.post<VarifyAccessTokenResponse>(
        `/auth/access-token`,
        { access_id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorResponse = ((error as AxiosError)?.response
        ?.data as ErrorResponse) || {
        error: 1,
        detail: "Unknown error",
        timestamp: Date.now(),
      };
      throw errorResponse;
    }
  },

  async verifyRefreshToken({
    accessToken,
  }: VerifyRefreshTokenRequestBody): Promise<VarifyRefreshTokenResponse> {
    try {
      const response = await instance.post<VarifyRefreshTokenResponse>(
        `/auth/refresh-token`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorResponse = ((error as AxiosError)?.response
        ?.data as ErrorResponse) || {
        error: 1,
        detail: "Unknown error",
        timestamp: Date.now(),
      };
      throw errorResponse;
    }
  },
});
