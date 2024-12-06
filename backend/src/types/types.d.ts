import { Session } from "@prisma/client";
import { UserWithoutPassword } from "./authTypes";

declare module "express-serve-static-core" {
  interface Request {
    user: UserWithoutPassword;
    session: Session;
  }
}
