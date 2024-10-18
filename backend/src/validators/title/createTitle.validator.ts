import { body } from "express-validator";

export const createTitleValidator = () => {
  return [
    body("title").exists().withMessage("Title is required."),
    body("subject").exists().withMessage("Subject is required."),
  ];
};
