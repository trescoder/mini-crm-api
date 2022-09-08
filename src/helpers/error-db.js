class UniqueConstraintError extends Error {
  constructor(value) {
    super(`${value}`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UniqueConstraintError);
    }
  }
}

module.exports = { UniqueConstraintError };
