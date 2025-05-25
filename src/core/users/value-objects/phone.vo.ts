export class Phone{
  private constructor(private readonly value: string) {}

  static create(raw: string): Phone {        
    const normalized = raw.trim();
    if (!/^\+?[1-9]\d{1,14}$/.test(normalized)) {
      throw new Error('Invalid phone format');
    }
    return new Phone(normalized);
  }

  getValue(): string {
    return this.value;
  }

  toJSON() {
    return this.value;
  }
}