import dateInput from "./components/dateInput";
import displayArea from "./components/displayArea";
import "./style.css";
import { html } from "./utils";

const inputs = {
    dobDD: "#input-birthDate-dd-dob",
    dobMM: "#input-birthDate-mm-dob",
    dobYYYY: "#input-birthDate-yyyy-dob",
    dobRealDate: "#input-birthDate-real-dob",
    //
    findOnDateDD: "#input-birthDate-dd-findOnDate",
    findOnDateMM: "#input-birthDate-mm-findOnDate",
    findOnDateYYYY: "#input-birthDate-yyyy-findOnDate",
    findOnDateRealDate: "#input-birthDate-real-findOnDate",
};
const accents = [
    "zinc-accent",
    "rose-accent",
    "blue-accent",
    "green-accent",
    "orange-accent",
];
const qs = (selector) => {
    const elem = document.querySelector(selector);
    if (!elem) window.alert("something went wrong in html");
    return elem;
};

// use .shotPicker(), use 3 input for date1, and button for datepicker

const setTheme = (theme) => {
    if (!theme || typeof theme !== "string") {
        theme = window.localStorage.getItem("theme") || "dark";
    }
    const root = document.documentElement;
    if (theme === "light") {
        root.classList.remove("dark");
    } else if (theme === "dark") {
        root.classList.add("dark");
    } else if (theme === "toggle") {
        root.classList.toggle("dark");
    }
    const currentTheme = root.classList.contains("dark") ? "dark" : "light";
    window.localStorage.setItem("theme", currentTheme);
};
const setAccent = (accent) => {
    if (!accent || !["number", "string"].includes(typeof accent)) {
        accent = window.localStorage.getItem("accent") || "zinc-accent";
    }
    const root = document.documentElement;
    if (accent === 1) {
        const current =
            accents.findIndex(
                (e) =>
                    e ===
                    [...root.classList].filter((e) => e.match(/(-accent)/))[0]
            ) || 0;
        accent = accents[(current + 1) % accents.length];
    }
    root.classList.remove(...accents);
    root.classList.add(accent || "zinc-accent");
    window.localStorage.setItem("accent", accent || "zinc-accent");
};

const handleThemeBtn = () => {
    const btn = qs("#theme-btn");
    btn.addEventListener("click", () => setTheme("toggle"));
};
const handleAccentBtn = () => {
    const btn = qs("#accent-btn");
    btn.addEventListener("click", () => {
        setAccent(1);
    });
};
const handlePickerBtn = () => {
    const fn = (key) => {
        if (!key) throw new Error("really?");
        const btn = qs(`#input-birthDate-picker-${key}`);
        btn.addEventListener("click", () => {
            const picker = qs(`#input-birthDate-real-${key}`);
            picker.showPicker();
        });
    };
    fn("dob");
    fn("findOnDate");
};
const handleHiddenDatePicker = () => {
    const fn = (key) => {
        if (!key) throw new Error("really?");

        const picker = qs(`#input-birthDate-real-${key}`);
        picker.addEventListener("change", () => {
            const date = picker.valueAsDate;
            if (date) {
                qs(inputs[`${key}DD`]).value = date
                    .getDate()
                    .toString()
                    .padStart(2, 0);
                qs(inputs[`${key}MM`]).value = (date.getMonth() + 1)
                    .toString()
                    .padStart(2, 0);
                qs(inputs[`${key}YYYY`]).value = date.getFullYear().toString();
            } else {
                qs(inputs[`${key}DD`]).value = "";
                qs(inputs[`${key}MM`]).value = "";
                qs(inputs[`${key}YYYY`]).value = "";
            }
        });
    };
    fn("dob");
    fn("findOnDate");
};
const handleCalcBtn = () => {
    const btn = qs("#btn-calc");
    btn.addEventListener("click", () => {
        // todo add required popup on inputs
        //todo, and maybe use view transition?
        const date1 = new Date(
            [
                qs(inputs[`dobYYYY`]).value,
                qs(inputs[`dobMM`]).value,
                qs(inputs[`dobDD`]).value,
            ].join("-")
        );
        const date2 = new Date(
            [
                qs(inputs[`findOnDateYYYY`]).value,
                qs(inputs[`findOnDateMM`]).value,
                qs(inputs[`findOnDateDD`]).value,
            ].join("-")
        );
        const displayElem = qs("#displayArea");
        displayElem.classList.remove("show");
        console.log(date1, date2);
        const fn = () => {
            if (isNaN(date1) || isNaN(date2)) {
                displayElem.innerHTML = html`<p class="text-red-500 italic">
                    Both dates need to be filled and be valid.
                </p>`;
            } else {
                displayElem.innerHTML = displayArea(date1, date2);
            }
            displayElem.classList.add("show");
        };
        // if (document.startViewTransition) {
        //     const transition = document.startViewTransition(fn);
        // } else {
        //     fn();
        // }
        if (displayElem.innerHTML !== "") setTimeout(fn, 500);
        else fn();
    });
};
const handleResetBtn = () => {
    const btn = qs("#btn-reset");
    btn.addEventListener("click", () => {
        for (const key in inputs) {
            const elem = qs(inputs[key]);
            if (elem) elem.value = "";
        }
        const fn = () => {
            const elem = qs("#displayArea");
            // elem.innerHTML = "";
            elem.classList.remove("show");
            setTimeout(() => {
                elem.innerHTML = "";
            }, 500);
        };
        // if (document.startViewTransition) {
        //     const transition = document.startViewTransition(fn);
        // } else {
        //     fn();
        // }
        fn();
    });
};

const attachElements = () => {
    const slotDOB = qs("#slot-dob");
    slotDOB.outerHTML = dateInput("dob");

    const slotFindOnDate = qs("#slot-findOnDate");
    slotFindOnDate.outerHTML = dateInput("findOnDate");
    const date = new Date();
    qs(inputs.findOnDateDD).value = date.getDate().toString().padStart(2, 0);
    qs(inputs.findOnDateMM).value = (date.getMonth() + 1)
        .toString()
        .padStart(2, 0);
    qs(inputs.findOnDateYYYY).value = date.getFullYear().toString();
};

const handleListeners = () => {
    handleThemeBtn();
    handleAccentBtn();
    handleHiddenDatePicker();
    handlePickerBtn();
    handleCalcBtn();
    handleResetBtn();
};

const init = () => {
    // prevent flashing
    qs("#app").style.display = "flex";
    setTheme();
    setAccent();
    attachElements();
    handleListeners();
};

init();
