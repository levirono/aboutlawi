import bcrypt from "bcrypt";

/** bcrypt work factor. The prompt requires 12 or higher. */
export const BCRYPT_COST = 12;

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_COST);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * A valid hash of a random string, compared against when the email is unknown so
 * that failed logins take the same time whether or not the account exists.
 */
export const TIMING_SAFE_DUMMY_HASH = "$2b$12$wNpy5mKs8.Qs3OaGqrv1Ge0ck5OQILXxWstpMJYKDJARJpGYzbxR2";
