import { BadRequestError } from "../errors";

export const testUser = (req, res, next) => {
  if (req.user.testUser) {
    throw BadRequestError("Test User, Read only!");
  }
  next();
};
