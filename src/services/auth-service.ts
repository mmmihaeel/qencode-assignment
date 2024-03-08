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
import axios, { AxiosError } from "axios";
const AUTH_API_URL = import.meta.env.AUTH_API_URL;

export const login = async ({
  email,
  password,
}: LoginRequestBody): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${AUTH_API_URL}/auth/login`,
      {
        email,
        password,
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
};

export const resetPassword = async ({
  email,
  redirect_url,
}: PasswordResetRequestBody): Promise<PasswordResetResponse> => {
  try {
    const response = await axios.post<PasswordResetResponse>(
      `${AUTH_API_URL}/auth/password-reset`,
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
};

export const setNewPassword = async ({
  token,
  secret,
  password,
  password_confirm,
}: SetNewPasswordRequestBody): Promise<SetNewPasswordResponse> => {
  try {
    const response = await axios.post<SetNewPasswordResponse>(
      `${AUTH_API_URL}/auth/password-set`,
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
};

export const verifyAccessToken = async ({
  accessToken,
  access_id,
}: VerifyAccessTokenRequestBody): Promise<boolean> => {
  try {
    const response = await axios.post<VarifyAccessTokenResponse>(
      `${AUTH_API_URL}/auth/access-token`,
      { access_id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    const errorResponse = ((error as AxiosError)?.response
      ?.data as ErrorResponse) || {
      error: 1,
      detail: "Unknown error",
      timestamp: Date.now(),
    };
    throw errorResponse;
  }
};

export const verifyRefreshToken = async ({
  accessToken,
}: VerifyRefreshTokenRequestBody): Promise<boolean> => {
  try {
    const response = await axios.post<VarifyRefreshTokenResponse>(
      `${AUTH_API_URL}/auth/refresh-token`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    const errorResponse = ((error as AxiosError)?.response
      ?.data as ErrorResponse) || {
      error: 1,
      detail: "Unknown error",
      timestamp: Date.now(),
    };
    throw errorResponse;
  }
};
