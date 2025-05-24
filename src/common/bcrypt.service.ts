import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IBcryptService } from '../core/users/bcrypt.interface';

@Injectable()
export class BcryptService implements IBcryptService {
  async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(value, salt);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
