import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Hash password
 */
export async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare password with hash
 */
export async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

/**
 * Generate random token for password reset
 */
export function generateResetToken() {
  return require("crypto").randomBytes(32).toString("hex");
}

/**
 * Hash reset token
 */
export async function hashResetToken(token) {
  return require("crypto").createHash("sha256").update(token).digest("hex");
}
