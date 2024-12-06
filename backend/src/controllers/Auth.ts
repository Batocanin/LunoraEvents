import { NextFunction, Request, Response } from "express";
import { authSchema } from "../schema/auth/schema";
import { createUser, findUserByEmail } from "../models/users/model";
import { hash, verify } from "@node-rs/argon2";
import { setSession, validateSessionToken } from "../models/auth/model";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { values } = req.body;

    const { email, password } = authSchema.parse(values);

    const existingEmail = await findUserByEmail(email);

    if (existingEmail) {
      res
        .status(404)
        .send({ success: false, successMessage: "Email already exists." });
      return;
    }

    const hashedPassword = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    await createUser(email, hashedPassword);

    res
      .status(201)
      .send({ success: true, successMessage: "Successfully signed up." });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      successMessage: "There was an error on server, try again later",
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { values } = req.body;

    const { email, password } = authSchema.parse(values);

    const user = await findUserByEmail(email);

    if (!user) {
      res.status(404).send({
        success: false,
        successMessage: "Invalid email or password.",
      });
      return;
    }

    const validPassword = await verify(user.password, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      res.status(404).send({
        success: false,
        successMessage: "Invalid email or password.",
      });
      return;
    }

    await setSession(res, user.id);

    res
      .status(201)
      .send({ success: true, successMessage: "Successfully logged up." });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      successMessage: "There was an error on server, try again later",
    });
  }
};

export const logout = (req: Request, res: Response) => {};

export const validateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies["session"];
  if (!token) {
    res.status(401).send({
      successMessage: "Access denied.",
      success: false,
    });
    return;
  }
  try {
    const { session, user } = await validateSessionToken(token);
    if (!user || !session) {
      res.status(401).send({
        successMessage: "Access denied.",
        success: false,
      });
      return;
    }
    req.user = user;
    req.session = session;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      successMessage:
        "There was an error on server while trying to auth, try again later",
    });
    return;
  }
};

export const validateRequestFront = async (req: Request, res: Response) => {
  const token = req.cookies["session"];
  if (!token) {
    res.status(401).send({
      success: false,
      successMessage: "Access denied.",
      data: { user: null, session: null },
    });
    return;
  }
  try {
    const { session, user } = await validateSessionToken(token);
    res.status(201).send({
      successMessage: `${user ? "Access granted." : "Access denied."}`,
      success: user ? true : false,
      data: { user: user, session: session },
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      successMessage:
        "There was an error on server while trying to auth, try again later",
      data: { user: null, session: null },
    });
    return;
  }
};
