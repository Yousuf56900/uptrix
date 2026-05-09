/** API layer: axios instance + domain modules. Import from `@/api/...`. */

export { api } from "./client";
export { getApiErrorMessage } from "./errors";
export {
  login,
  register,
  verifyOtp,
  forgotPassword,
  resetPassword,
  logoutRequest,
  getMe,
} from "./auth";
