import { IFirestoreRotation, IRotationDay, Weekday } from "../types/backend/FirestoreRotation";
import { differenceInWeeks, isBefore } from 'date-fns';

export const getStartWeek = (userId: string, rotation: IFirestoreRotation) => {
    const user = rotation.users.find(user => user.userId === userId);
    if (user) return user.startWeek;
    return null;
};

export const getRotationWeekNumberAtDate = (userId: string, rotation: IFirestoreRotation, date: Date) => {
    const dateIsBeforeRotationStartDate = isBefore(date, rotation.startDate.toDate());
    if (dateIsBeforeRotationStartDate) return null;
    const userStartWeek = getStartWeek(userId, rotation);
    if (!userStartWeek) return null;

    const rotationStartDate = rotation.startDate.toDate();
    const diff = differenceInWeeks(date, rotationStartDate);
    const rotationWeeks = Object.keys(rotation.weeks).length;

    return (diff + userStartWeek) % rotationWeeks;
};

export const getRotationWeekAtDate = (userId: string, rotation: IFirestoreRotation, date: Date) => {
    const rotationWeekNumber = getRotationWeekNumberAtDate(userId, rotation, date);
    if (!rotationWeekNumber) return null;

    return rotation.weeks[rotationWeekNumber];
};


export const sortDays = (days: Record<string, IRotationDay>) => {
    const sortedDays = Object.entries(days).sort(([a], [b]) => {
        const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        return days.indexOf(a) - days.indexOf(b);
    });

    return Object.fromEntries(sortedDays) as Record<Weekday, IRotationDay>;
};