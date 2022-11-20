import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import checkPermission from "../utils/checkPermission.js";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";

const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;
  let queryObject = {
    createdBy: req.user.userId,
  };
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  let result = Job.find(queryObject);
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const jobs = await result;
  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);
  res.status(StatusCodes.OK).json({ jobs, numOfPages, totalJobs });
};

const createJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findOne({ _id: id });
  if (!job) {
    throw new NotFoundError(`No job with id: ${id}`);
  }
  checkPermission(req.user, job.createdBy);
  await job.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Job removed" });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position, jobLocation } = req.body;
  if (!company || !position || !jobLocation) {
    throw new BadRequestError("Please provide all values");
  }
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  checkPermission(req.user, job.createdBy);
  job.company = company;
  job.position = position;
  job.jobLocation = jobLocation;
  await job.save();
  res.status(StatusCodes.OK).json({ job });
};

export { createJob, deleteJob, getAllJobs, updateJob };
