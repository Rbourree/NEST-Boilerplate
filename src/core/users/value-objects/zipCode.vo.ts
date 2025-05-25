export class ZipCode{
  private constructor(private readonly value: string) {}

  static create(raw: string | null | undefined): ZipCode {
    if (!raw) {
      throw new Error('ZipCode cannot be null or undefined');
    }
    const normalized = raw.trim();
    // Basic US ZIP code validation (5 digits or 5+4 format)
    if (!/^[0-9]{5}(?:-[0-9]{4})?$/.test(normalized)) {
      throw new Error(`Invalid ZipCode format: ${raw}`);
    }
    return new ZipCode(normalized);
  }

  getValue(): string {
    return this.value;
  }

  toJSON() {
    return this.value;
  }
}