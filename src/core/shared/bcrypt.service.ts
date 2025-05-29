export abstract class IBcryptService {
  abstract hash(value: string): Promise<string>;
  abstract compare(plain: string, hashed: string): Promise<boolean>;
}
