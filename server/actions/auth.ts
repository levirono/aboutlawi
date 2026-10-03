"use server";

import { redirect } from "next/navigation";
import { findAdminCredentialsByEmail, recordAdminLogin } from "@/server/db/queries/admins";
import { createSession, destroySession, getAdminSession } from "@/server/utils/auth";
import { UnauthorizedError } from "@/server/utils/errors";
import { logger } from "@/server/utils/logger";
import { TIMING_SAFE_DUMMY_HASH, verifyPassword } from "@/server/utils/password";
import { assertRateLimit, clientIp, RATE_LIMITS, resetRateLimit } from "@/server/utils/rate-limit";
import { publicAction } from "@/server/utils/safe-action";
import { loginSchema } from "@/shared/schemas/auth";

const INVALID_CREDENTIALS = "Invalid email or password.";

export const loginAction = publicAction
  .metadata({ actionName: "auth.login" })
  .inputSchema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const ip = await clientIp();
    const identity = `${ip}:${email}`;
    assertRateLimit(RATE_LIMITS.login, identity);

    const admin = await findAdminCredentialsByEmail(email);
    // Always run bcrypt so response time does not reveal whether the email exists.
    const valid = await verifyPassword(password, admin?.passwordHash ?? TIMING_SAFE_DUMMY_HASH);

    if (!admin || !valid) {
      logger.authWarn("login failed", { route: "/admin/login", status: 401, email, ip });
      throw new UnauthorizedError(INVALID_CREDENTIALS);
    }

    resetRateLimit(RATE_LIMITS.login, identity);
    await recordAdminLogin(admin.id);
    await createSession({ adminId: admin.id, email: admin.email });
    logger.auth("login succeeded", { route: "/admin/login", status: 200, adminId: admin.id, ip });
    redirect("/admin");
  });

export const logoutAction = publicAction.metadata({ actionName: "auth.logout" }).action(async () => {
  const session = await getAdminSession();
  await destroySession();
  logger.auth("logout", { route: "/admin", status: 200, adminId: session?.adminId });
  redirect("/admin/login");
});
