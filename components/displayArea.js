import { html } from "../utils";

const DAYS_IN_MONTH = 30.434;
const f = (num) => Intl.NumberFormat("en-us").format(Math.floor(num));

const getTimeDiff = (date1, date2) => {
    const timeDiff = Math.max(date1, date2) - Math.min(date1, date2);

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
    return {
        seconds,
        mins,
        hours,
        days,
        weeks,
        months,
        years,
        bday_date,
        bday_time,
        bday_days,
        bday_months,
    };
};

const displayArea = (date1, date2, date3) => {
    if (
        !(
            date1 instanceof Date &&
            date3 instanceof Date &&
            (date2 instanceof Date || date2 === null)
        )
    )
        throw new Error("Invalid args.");
    let text1 = "You are";
    if (date2) text1 = "";
    else if (
        date1 > date3 ||
        date3 < new Date(new Date().toJSON().split("T")[0])
    )
        text1 = "You were";
    else if (date3 > new Date()) text1 = "You will be";

    const diff1 = getTimeDiff(date1, date3);
    const diff2 = date2 ? getTimeDiff(date2, date3) : null;

    const mainHTML = (diff) => html`
        <div class="flex flex-row gap-2 items-end mb-4">
            <span class="text-3xl sm:text-4xl font-bold">${f(diff.years)}</span>
            <span class="text-base sm:text-lg">years</span>
            <span class="text-3xl sm:text-4xl font-bold"
                >${f(diff.months % 12)}</span
            >
            <span class="text-base sm:text-lg">months</span>
            <span class="text-3xl sm:text-4xl font-bold"
                >${f(diff.days % DAYS_IN_MONTH)}</span
            >
            <span class="text-base sm:text-lg">days old</span>
        </div>
    `;

    return html`
        <div class="flex-col gap-2 items-center transition-colors">
            <span
                class="w-full h-0.5 inline-flex rounded bg-border my-2"
            ></span>
            <span class="text-lg">${text1}</span>
            ${mainHTML(diff1)} ${diff2 ? mainHTML(diff2) : ""}
            <div class="flex flex-col gap-1 mb-4">
                <span>
                    <span class="inline-flex min-w-24">Born on :</span>
                    <span class="inline-flex flex-col">
                        <span>${date1.toDateString()}</span>
                        ${diff2 ? `<span> ${date2.toDateString()}</span>` : ""}
                    </span>
                </span>
                <span>
                    <span class="inline-flex min-w-24">Age on :</span>
                    <span>${date3.toDateString()}</span></span
                >
                <span>
                    <span class="inline-flex min-w-24"> Birthday in : </span>
                    <span class="inline-flex flex-col">
                        <span
                            >${f(diff1.bday_months)} months
                            ${f(diff1.bday_days % DAYS_IN_MONTH)} days</span
                        >
                        ${diff2
                            ? html`<span
                                  >${f(diff2.bday_months)} months
                                  ${f(diff2.bday_days % DAYS_IN_MONTH)}
                                  days</span
                              >`
                            : ""}
                    </span>
                </span>
                ${!diff2
                    ? diff1.bday_days === 0
                        ? html`<span class="text-2xl sm:text-3xl font-bold"
                              >Happy Birthday 🎊🎉</span
                          >`
                        : ""
                    : ""}
            </div>
            <div class="${`flex flex-col gap-2`}">
                <span class="text-lg text-left">In Different Units:</span>
                <span
                    class="cursor-text flex flex-col gap-2 bg-secondary/20 rounded p-4 border"
                >
                    <span class="flex flex-col ${diff2 ? `mb-2` : ""}">
                        <span>
                            ${f(diff1.months)} months
                            ${f(diff1.days % DAYS_IN_MONTH)} days
                        </span>
                        ${diff2
                            ? `<span>
                        ${f(diff2.months)} months
                        ${f(diff2.days % DAYS_IN_MONTH)} days</span>`
                            : ""}
                    </span>
                    <span class="flex flex-col ${diff2 ? `mb-2` : ""}">
                        <span
                            >${f(diff1.weeks)} weeks ${f(diff1.days % 7)} days
                        </span>
                        ${diff2
                            ? `
                            <span> ${f(diff2.weeks)} weeks ${f(
                                  diff2.days % 7
                              )} days
                              </span>`
                            : ""}
                    </span>
                    <span class="flex flex-col ${diff2 ? `mb-2` : ""}">
                        <span>${f(diff1.days)} days</span>
                        ${diff2 ? `<span> ${f(diff2.days)} days</span>` : ""}
                    </span>
                    <span class="flex flex-col ${diff2 ? `mb-2` : ""}">
                        <span> ${f(diff1.hours)} hours</span>
                        ${diff2 ? `<span> ${f(diff2.hours)} hours</span>` : ""}
                    </span>
                    <span class="flex flex-col ${diff2 ? `mb-2` : ""}">
                        <span> ${f(diff1.mins)} minutes</span>
                        ${diff2 ? `<span> ${f(diff2.mins)} minutes</span>` : ""}
                    </span>
                    <span class="flex flex-col ${diff2 ? `mb-2` : ""}">
                        <span> ${f(diff1.seconds)} seconds</span>
                        ${diff2
                            ? `<span> ${f(diff2.seconds)} seconds</span>`
                            : ""}
                    </span>
                </span>
            </div>
        </div>
    `;
};
export default displayArea;
