export class UniqueConstraintError extends Error {
  constructor(value: string) {
    super(`${value}`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UniqueConstraintError);
    }
  }
}
