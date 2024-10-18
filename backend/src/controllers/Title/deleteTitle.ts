import { Response } from "express";
import httpStatus from "http-status";
import { titleService } from "../../services";
import { errorHandlerWrapper } from "../../utils";

const deleteTitleHandler = async (req, res: Response) => {
    const { id } = req.params;
    
    await titleService.deleteTitle(id);
    res.status(httpStatus.OK).json({ message: "Task deleted" });
};

export const deleteTitleController = errorHandlerWrapper(deleteTitleHandler);
