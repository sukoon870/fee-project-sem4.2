import { html } from "../utils";

const displayArea = (date1, date2) => {
    if (!(date1 instanceof Date && date2 instanceof Date))
        throw new Error("Invalid args.");
    const timeDiff = Math.max(date1, date2) - Math.min(date1, date2);
    console.log(timeDiff);
    const futureDiff = new Date();
    let text1 = "Your Age is";
    if (date1 > date2 || date2 < new Date(new Date().toJSON().split("T")[0]))
        text1 = "You were";
    else if (date2 > new Date()) text1 = "You will be";

    // const years = (dateDiff.getFullYear() - 1970);
    // /** days left after counting years */
    // const daysLeft = dateDiff.getDate() - 1;
    // const months = years*12;
    // const weeks = months*4 + Math.floor(daysLeft/7);
    // const daysLeftAfterWeek = (daysLeft%7);
    // const justDays = years*265 + daysLeft;
    // const hours = justDays*24;
    // const mins = hours*60;
    // const seconds =

    // const DAYS_IN_MONTH = 30.4167;
    const DAYS_IN_MONTH = 30.434;
    const f = (num) => Intl.NumberFormat("en-us").format(Math.floor(num));

    const seconds = timeDiff / 1000;
    const mins = seconds / 60;
    const hours = mins / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const months = days / DAYS_IN_MONTH;
    const years = months / 12;

    const bday_date = new Date();
    if (
        date1.getMonth() < bday_date.getMonth() &&
        date1.getDate() < bday_date.getDate()
    )
        bday_date.setFullYear(bday_date.getFullYear() + 1);
    bday_date.setDate(date1.getDate());
    bday_date.setMonth(date1.getMonth());
    const bday_time = Math.abs(bday_date - new Date());
    const bday_days = bday_time / (1000 * 60 * 60 * 24);
    const bday_months = bday_days / DAYS_IN_MONTH;
    return html`
        <div class="flex-col gap-2 items-center transition-colors">
            <span
                class="w-full h-0.5 inline-flex rounded bg-border my-2"
            ></span>
            <span class="text-lg">${text1}</span>
            <div class="flex flex-row gap-2 items-end mb-4">
                <span class="text-3xl sm:text-4xl font-bold">${f(years)}</span>
                <span class="text-lg">years</span>
                <span class="text-3xl sm:text-4xl font-bold"
                    >${f(months % 12)}</span
                >
                <span class="text-lg">months</span>
                <span class="text-3xl sm:text-4xl font-bold"
                    >${f(days % DAYS_IN_MONTH)}</span
                >
                <span class="text-lg">days</span>
            </div>
            <div class="flex flex-col gap-1 mb-4">
                <span>Born on : ${date1.toDateString()}</span>
                <span>Age on : ${date2.toDateString()}</span>
                <span
                    >Next Birthday in : ${f(bday_months)} months
                    ${f(bday_days % DAYS_IN_MONTH)} days</span
                >
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-lg">In Different Units:</span>
                <span
                    class="flex flex-col gap-2 bg-secondary/20 rounded p-4 border"
                >
                    <span
                        >${f(months)} months ${f(days % DAYS_IN_MONTH)} days
                    </span>
                    <span>${f(weeks)} weeks ${f(days % 7)} days</span>
                    <span>${f(days)} days</span>
                    <span>${f(hours)} hours</span>
                    <span>${f(mins)} minutes</span>
                    <span>${f(seconds)} seconds</span>
                </span>
            </div>
        </div>
    `;
};
export default displayArea;
