export class UUID {
  private constructor(private readonly value: string) {}
  private static readonly UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;


  public static create(raw: string): UUID {
    const normalized = raw.trim();
    if (!UUID.UUID_V4_REGEX.test(normalized)) {
      throw new Error(`Invalid UUID format: ${raw}`);
    }
    return new UUID(normalized);
  }

  /**
   * Returns the underlying UUID string
   */
  public getValue(): string {
    return this.value;
  }

  /**
   * Compares this UUID to another for equality
   * @param other - the other UUID VO
   */
  public equals(other: UUID): boolean {
    return this.value === other.value;
  }

  /**
   * String representation of the UUID
   */
  public toString(): string {
    return this.value;
  }

  toJSON() {
    return this.value;
  }
}