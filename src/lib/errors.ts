export const ERRORS = {
  NO_WEB3: "NO_WEB3",
  WRONG_CHAIN: "WRONG_CHAIN",
  NO_FARM: "NO_FARM",
  FAILED_REQUEST: "FAILED_REQUEST",
  REJECTED_TRANSACTION: "REJECTED_TRANSACTION",
  BLOCKED: "BLOCKED",
  NETWORK_CONGESTED: "NETWORK_CONGESTED",

  // Server errors
  DISCORD_USER_EXISTS: "DISCORD_USER_EXISTS",
};

export type ErrorCode = keyof typeof ERRORS;
