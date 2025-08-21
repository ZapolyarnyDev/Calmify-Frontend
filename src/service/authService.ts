import { api } from "@/api/api";
import type { JwtResponseToken } from "@/types/authTypes";
import { Logger } from "@/utils/logger";

const ACCESS_TOKEN_KEY = "accessToken";

export const AuthService = {  
    async login(email: string, password: string) { return authPost("/v0/auth/login", email, password); },
    async register(email: string, password: string) { return authPost("/v0/auth/register", email, password); },

    logout() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    },

    getAccessToken(): string | null {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    }
};

async function authPost(url: string, email: string, password: string) {
  try {
    const response = await api.post<JwtResponseToken>(url, { email, password });
    const accessToken = response.data.data;
    if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  } catch (err: any) {
    if (err.response && err.response.data) {
      const data = err.response.data;
      if (Array.isArray(data.errors)) {
        data.errors.forEach((msg: string) => console.error('Validation error:', msg));
      } else if (data.fieldErrors) {
        data.fieldErrors.forEach((fe: { field: string; message: string }) =>
          Logger.error(`Validation error [${fe.field}]: ${fe.message}`)
        );
      } else if (data.message) {
        Logger.error('Validation error:', data.message);
      } else {
        Logger.error('Unknown server error:', data);
      }
    } else {
      Logger.error('Network or unknown error', err);
    }
    throw err;
  }
}
