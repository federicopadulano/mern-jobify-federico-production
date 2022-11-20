import BadRequestError from "../errors/bad-request.js";

const testUser = (req, res, next) => {
  if (req.user.testUser) {
    throw BadRequestError("Test User, Read only!");
  }
  next();
};

export default testUser;
