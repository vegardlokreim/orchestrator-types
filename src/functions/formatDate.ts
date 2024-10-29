export function formatDate(date: Date, locale: Intl.LocalesArgument, compress = false): string {
    const options: Intl.DateTimeFormatOptions = { year: compress ? "2-digit" : "numeric", month: compress ? "numeric" : "short", day: '2-digit', hour: "numeric", minute: "numeric" };
    return date.toLocaleDateString(locale, options);
};