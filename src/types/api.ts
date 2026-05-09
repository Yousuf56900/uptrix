export type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type AuthUserData = {
  id: string;
  name: string;
  email: string;
};

export type LoginPayload = AuthUserData & {
  accessToken: string;
};
