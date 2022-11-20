import { UnAuthenticatedError } from "../errors/index.js";

const checkPermission = (reqUser, resourceUserId) => {
  if (reqUser.userId === resourceUserId.toString()) return;
  throw new UnAuthenticatedError("Not authorized to access this route!");
};

export default checkPermission;
