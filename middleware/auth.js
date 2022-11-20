import { UnAuthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const { userId } = await jwt.verify(token, process.env.JWT_SECRET);
    const testUser = userId === "630cdd867911b0ccbeb96dc2";
    req.user = { userId, testUser };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default auth;
