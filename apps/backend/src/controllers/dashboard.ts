import { prisma } from "@/lib/db";
import { fetchFocusTime } from "@/utils/dashboardUtils";
import { IResponse } from "@virtualroom/types";
import { Request, Response } from "express";

async function getDashBoardHandler(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    let response: IResponse = {
        msg: ""
    };

    if (!userId) {
        response.msg = "Unauthorized!";
        res.status(401).json(response);
        return;
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            response.msg = "User Not found";
            res.status(404).json(response);
            return;
        }

        const focusTime = await fetchFocusTime(user.id);

        const dashBoardData = {
            ...user,
            focusTime: focusTime
        };

        response.msg = "Got The User";
        response.data = dashBoardData;
        res.status(200).json(response);
        return;
    } catch (error) {
        response.msg = "Internal Server Error. Please try again!";
        response.error = error as Error;
        res.status(500).json(response);
    }
}

export { getDashBoardHandler };