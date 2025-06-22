import { IRoom } from "@virtualroom/types";

export interface GetStreakReturnValue {
    maxStreak: number,
    currentStreak: number
}

export function getStreaks(rooms: IRoom[]): GetStreakReturnValue {
    if (rooms.length == 0) return { maxStreak: 0, currentStreak: 0 };

    const uniqueDateStrings = Array.from(
        new Set(rooms.map(room => new Date(room.createdAt).toISOString().split("T")[0]))
    ).sort();

    let maxStreak = 1;
    let currentStreak = 1;

    const toDate = (str: string) => {
        const d = new Date(str);
        d.setHours(0, 0, 0, 0);
        console.log(d);
        return d;
    }

    for (let i = 1; i < uniqueDateStrings.length; i++) {
        const prev = toDate(uniqueDateStrings[i - 1]);
        const curr = toDate(uniqueDateStrings[i]);

        const diffDays = (curr.getTime() - prev.getTime()) / 1000 * 60 * 60 * 24;

        if (diffDays == 1) {
            currentStreak++;
            maxStreak = Math.max(maxStreak, currentStreak);
        } else {
            currentStreak = 1;
        }
    }

    const today = toDate(new Date().toISOString().split("T")[0]);
    const lastDate = toDate(uniqueDateStrings[uniqueDateStrings.length - 1]);
    const diffFromToday = (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);

    const isOngoing = diffFromToday === 0;
    const finalStreak = isOngoing ? currentStreak : 0;

    return { maxStreak, currentStreak: finalStreak };
}