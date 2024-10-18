import { Router } from "express";
import { checkAuth } from "../utils";
import { TitleController } from "../controllers";
import { TitleValidator } from "../validators";

export const titleRouter = Router();

titleRouter.post(
  "/",
  checkAuth,
  TitleValidator.createTitleValidator(),
  TitleController.createTitleController
);
titleRouter.delete(
  "/:id",
  checkAuth,
  TitleValidator.deleteTitleValidator(),
  TitleController.deleteTitleController
);

titleRouter.get("/", checkAuth, TitleController.readTitleController);
