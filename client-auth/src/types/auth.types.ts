export type User = {
  email: string;
  name: string;
  picture: string;
};

export type TokenData = {
  access_token: string;
  refresh_token: string;
  expiry_date: number;
};

export type AuthStore = {
  tokenData: TokenData | null;
  user: User | null;

  setUser: (data: User | null) => void;
  setTokenData: (data: TokenData | null) => void;
  logout: () => void;
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  expiry_date: number;
  email: string;
  name: string;
  picture: string;
};

export type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
  expiry_date: number;
};

// type accessToken = {
//   expiry_date: number;
//   scopes: string[];
//   azp: string;
//   aud: string;
//   sub: string;
//   exp: string;
//   email: string;
//   email_verified: string;
//   access_type: string;
// };

// type verifyIdToken = {
//   iss: string;
//   azp: string;
//   aud: string;
//   sub: string;
//   email: string;
//   email_verified: boolean;
//   at_hash: string;
//   name: string;
//   picture: string;
//   given_name: string;
//   family_name: string;
//   iat: number;
//   exp: number;
// };
