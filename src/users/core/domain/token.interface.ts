interface TokenPayload {
  id_user: string;
}

export interface TokenService {
  createAccessToken(payload: TokenPayload): Promise<string>;
  createRefreshToken(payload: TokenPayload): Promise<string>;
}
