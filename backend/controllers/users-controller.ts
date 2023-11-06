const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

import { Request, Response, NextFunction } from "express";
export const authCheckMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const mongoose = require("mongoose");
const User = require("../models/user");

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong, could not find this user.", 500)
    );
  }

  if (!user) {
    return next(
      new HttpError("Could not find a user for the provided id.", 404)
    );
  }

  res.json({ user: user.toObject({ getters: true }) });
};

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  let users;
  try {
    if (req.headers.newest === "true") {
      users = await User.find({}, "-password").sort({ createdAt: -1 });
    } else if (req.headers.oldest === "true") {
      users = await User.find({}, "-password").sort({ createdAt: 1 });
    } else {
      users = await User.find({}, "-password");
    }

    // users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    users: users.map((user: any) => user.toObject({ getters: true })),
  });
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, phone } = req.body;
  const createdUser = new User({
    name,
    email,
    phone,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdUser.save({ session: sess });
    await sess.commitTransaction();
  } catch (err: any) {
    const error = new HttpError("Creating User failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser });
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { name, email, phone } = req.body;
  const userId = req.params.uid;

  console.log();
  let user;
  try {
    user = await User.findById(userId);
  } catch (error: any) {
    console.log("erro 2: " + error);
    return next(
      new HttpError("Something went wrong, could not update user.", 500)
    );
  }

  if (!user) {
    const error = new HttpError("Could not find user for this id.", 404);
    return next(error);
  }

  user.name = name;
  user.email = email;
  user.phone = phone;

  try {
    await user.save();
  } catch (error: any) {
    console.log("erro 1: " + error);
    return next(
      new HttpError("Something went wrong, could not update user.", 500)
    );
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete user.", 500)
    );
  }

  if (!user) {
    const error = new HttpError("Could not find user for this id.", 404);
    return next(error);
  }

  try {
    await User.findOneAndDelete(userId);
  } catch (err: any) {
    console.log(err);
    return next(
      new HttpError("Something went wrong, could not delete user.", 500)
    );
  }

  res.status(200).json({ message: "Deleted user." });
};

exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
