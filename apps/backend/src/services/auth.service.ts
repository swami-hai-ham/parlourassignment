import { loginInput } from "../types/types";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";


const prisma = new PrismaClient();
const JWT_SECRET = config.jwtSecret;

export const handleLogin = async (body: any) => {
  const parsed = loginInput.safeParse(body);
  if (!parsed.success) {
    throw { status: 400, message: "Invalid input" };
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email
    },
  });

  if (!user || !(await bcrypt.compare(parsed.data.password, user.password))) {
    throw { status: 401, message: "Invalid credentials" };
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  const cookieOptions = {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "none" as const,
    maxAge: 3600000,
  };
  const { password, ...safeUser } = user;
  return { safeUser, token, cookieOptions };
};
