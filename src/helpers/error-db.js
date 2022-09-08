class UniqueConstraintError extends Error {
  constructor(value) {
    super(`${value} must be unique.`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UniqueConstraintError);
    }
  }
}

module.exports = { UniqueConstraintError };
