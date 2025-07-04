import { prisma } from "@/lib/db";
import { subDays } from "date-fns";

async function fetchFocusTime(userId: string): Promise<number> {
    const to = new Date();
    const from = subDays(to, 7);

    const sessions = await prisma.roomSession.findMany({
        where: {
            userId: userId,
            joinedAt: {
                gte: from,
                lte: to
            }
        },
        select: {
            duration: true
        }
    });

    const totalMinutes = sessions.reduce((sum, session) => sum + (session.duration ?? 0), 0);
    const totalHours = Math.floor(totalMinutes / 60);
    return totalHours;
}

export { fetchFocusTime };
