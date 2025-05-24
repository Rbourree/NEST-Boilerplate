interface TokenPayload {
  id_user: string;
}

export interface IJWTService {
  createAccessToken(payload: TokenPayload): Promise<string>;
  createRefreshToken(payload: TokenPayload): Promise<string>;
}