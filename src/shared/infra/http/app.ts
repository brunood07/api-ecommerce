import "dotenv/config";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";

import { AppError } from "@shared/errors/AppError";

import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(400).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

export { app };
