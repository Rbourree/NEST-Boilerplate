
interface TokenPayload {
  id_user: string;
}

export abstract class IJWTService {
  abstract createAccessToken(payload: TokenPayload): Promise<string>;
  abstract createRefreshToken(payload: TokenPayload): Promise<string>;
  abstract verifyToken(token: string): Promise<any>;
  abstract decodeToken(token: string): Promise<any>;
}