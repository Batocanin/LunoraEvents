import prisma from "../../lib/prisma";

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
    omit: {
      password: false,
    },
  });
};

export const createUser = async (email: string, password: string) => {
  return await prisma.user.create({
    data: { email, password },
  });
};
