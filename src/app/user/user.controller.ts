/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../utils/catchAsync";
import { User } from "./user.model";

const createUser = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);
    res
      .status(httpStatus.CREATED)
      .json({ message: "User Create Successfully", user });
  }
);

const getAllUsers = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find({});
    res.status(httpStatus.OK).json({
      success: true,
      message: "All User Retrieved Successfully",
      data: users,
    });
  }
);

export const UserControllers = {
  getAllUsers,
  createUser,
};
