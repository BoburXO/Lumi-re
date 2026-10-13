import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import { userByToken } from "./db";
export const pin = () => process.env.ADMIN_PIN || "1234";
export const adminToken = () =>
  createHmac("sha256", "lumiere-salon")
    .update("admin:" + pin())
    .digest("hex");
export async function isAdmin() {
  const v = (await cookies()).get("admin")?.value,
    t = adminToken();
  return (
    !!v &&
    v.length === t.length &&
    timingSafeEqual(Buffer.from(v), Buffer.from(t))
  );
}
export async function getUser() {
  return userByToken((await cookies()).get("sid")?.value);
}
