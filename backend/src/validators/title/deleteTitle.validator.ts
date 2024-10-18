import { param } from "express-validator";

export const deleteTitleValidator = () => {
    return [param("id").exists().isUUID()];
};
