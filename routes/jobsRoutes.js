import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
} from "../controllers/jobsControllers.js";
import express from "express";
const router = express.Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").patch(updateJob).delete(deleteJob);

export default router;
