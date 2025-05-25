export class Email{
  private constructor(private readonly value: string) {}

  static create(raw: string): Email {
    const normalized = raw.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      throw new Error('Invalid email format');
    }
    return new Email(normalized);
  }

  getValue(): string {
    return this.value;
  }

  toJSON() {
    return this.value;
  }
}