import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

export function errorHandler(
    err:Error,
    req:Request,
    res:Response,
    next:NextFunction
) {
    if (err instanceof AppError){
        return res.status(err.statusCode).json({
            error: err.message,
            details: err.details,
        });
    }
    console.error(err);
    return res.status(500).json({
        error:"Internal Server Error",
    });
}
