import { Response } from "express";
import httpStatus from "http-status";
import { UserEntity } from "../../entities";
import { titleService } from "../../services";
import { errorHandlerWrapper } from "../../utils";

const createTitleHandler = async (req, res: Response) => {
  const { title, subject } = req.body;
  const userId: UserEntity = req.user;
  const newTitle = await titleService.createTitle({ title, userId, subject });
  res.json(newTitle).status(httpStatus.CREATED);
};

export const createTitleController = errorHandlerWrapper(createTitleHandler);
