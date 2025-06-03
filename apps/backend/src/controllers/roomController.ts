import { prisma } from "@/lib/db";
import { IResponse } from "@virtualroom/types";
import { Request, Response } from "express";

async function createRoomHandler(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { name, description } = req.body;

    let response: IResponse = {
        msg: ""
    };

    if (!userId) {
        response.msg = "Unauthorized!";
        res.status(401).json(response);
        return;
    }

    if (!name || !description) {
        response.msg = "Room name and description are required.";
        res.status(400).json(response);
        return;
    }

    try {
        const room = await prisma.room.create({
            data: {
                name,
                description,
                createdById: userId,
                roomParticipants: {
                    create: {
                        userId: userId,
                        role: "owner"
                    }
                }
            },
            include: {
                roomParticipants: true,
            }
        });

        response.msg = "Room Created Successfully";
        response.data = room;
        res.status(201).json(response);
    } catch (error) {
        response.msg = "Internal Server Error. Please try again!";
        response.error = error as Error;
        res.status(500).json(response);
    }
}

async function getAllRoomsHandler(req: Request, res: Response): Promise<void> {
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
        const rooms = await prisma.room.findMany({
            where: {
                createdById: userId,
            },
        });

        const allRooms = rooms ?? [];
        response.msg = "Got All rooms";
        response.data = allRooms;
        res.status(200).json(response);
        return;
    } catch (error) {
        response.msg = "Internal Server Error. Please try again!";
        response.error = error as Error;
        res.status(500).json(response);
    }
}

export { createRoomHandler, getAllRoomsHandler };