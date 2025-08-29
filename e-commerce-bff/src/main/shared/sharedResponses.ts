import { Response } from "express";
import { HttpStatusCode } from "axios";

const ErrorResponse = (
  res: Response,
  status?: number,
  error?: string,
  message?: string
) => {
  const statusCode = status || HttpStatusCode.InternalServerError;

  const errorResponse = {
    timestamp: new Date().toISOString(),
    status: statusCode,
    error: error || "Unexpected error",
    message: message || "Something went wrong!",
  };

  return res.status(statusCode).send(errorResponse);
};

const SharedResponses = {
  ErrorResponse,
};

export default SharedResponses;
