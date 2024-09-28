export type CreateShiftParams = {
    title: string;
    duration: number;
    colorCode: string;
    shortCode: string;
    allowedDays: string[];
    // TODO: I need Organization + department, or something that lets me fetch only relevant shifts in the listing.
    // Maybe one administrator is part of different departments, then the user will have to provide department before creating the shift. this also applies to patters
}