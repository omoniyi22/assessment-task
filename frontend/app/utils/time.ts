import date from 'date-and-time';

export function formatDate(inputDate: Date | string): string {
    // If inputDate is a string, convert it to a Date object
    const dateObj = typeof inputDate === 'string' ? new Date(inputDate) : inputDate;

    // Check if the conversion resulted in a valid Date object
    if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date format');
    }

    const day = dateObj.getDate();
    const suffix = getDaySuffix(day);
    const formattedDate = date.format(dateObj, 'D MMM YYYY');

    // Insert the suffix after the day
    return formattedDate.replace(/\d+/, `${day}${suffix}`);
}

function getDaySuffix(day: number): string {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

// Example usage
const dateToFormat = '2022-10-10';
console.log(formatDate(dateToFormat)); // Output: 10th Oct 2022
