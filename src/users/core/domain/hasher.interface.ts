export interface Hasher {
  hash(value: string): Promise<string>;
  compare(plain: string, hashed: string): Promise<boolean>;
}
