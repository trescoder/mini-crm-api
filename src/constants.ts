export const Constants = {
  JWT_SECRET: process.env.JWT_SECRET || "default_secret",
  JWT_EXP_TIME: process.env.JWT_EXP_TIME,
  SESSION_SECRET: process.env.SESSION_SECRET || "default_session",
};
