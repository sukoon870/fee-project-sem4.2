import { html } from "../utils";

const dateInput = (key) => {
    if (!key) throw new Error("Must provide a new key.");
    return html`
        <div
            class="relative flex flex-row gap-2 items-center justify-center w-full"
        >
            <div
                class="flex flex-row items-center rounded border border-radius overflow-hidden focus-visible:outline-none focus-visible:ring-2 ring-ring"
            >
                <input
                    type="number"
                    max="31"
                    id="input-birthDate-dd-${key}"
                    placeholder="DD"
                    class="w-16 sm:w-14 p-1.5 ring-offset-card focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 ring-inset focus-visible:outline-none rounded-l text-center transition-colors bg-transparent hover:bg-input placeholder:text-muted"
                />
                <span class="text-muted pointer-events-none w-0">/</span>
                <input
                    type="number"
                    max="12"
                    id="input-birthDate-mm-${key}"
                    placeholder="MM"
                    class="w-16 sm:w-14 p-1.5 ring-offset-card focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 ring-inset focus-visible:outline-none rounded-none text-center transition-colors bg-transparent hover:bg-input placeholder:text-muted"
                />
                <span class="text-muted pointer-events-none w-0">/</span>
                <input
                    type="number"
                    id="input-birthDate-yyyy-${key}"
                    placeholder="YYYY"
                    class="w-22 sm:w-20 p-1.5 ring-offset-card focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 ring-inset focus-visible:outline-none rounded-r text-center transition-colors bg-transparent hover:bg-input placeholder:text-muted"
                />
            </div>
            <input
                type="date"
                id="input-birthDate-real-${key}"
                class="invisible absolute"
            />
            <button
                class="button-hollow flex items-center p-2"
                id="input-birthDate-picker-${key}"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    class="h-5 aspect-square text-primary fill-current"
                >
                    <path
                        d="M10 12h4v4h-4zM16 12h4v4h-4zM22 12h4v4h-4zM4 24h4v4h-4zM10 24h4v4h-4zM16 24h4v4h-4zM10 18h4v4h-4zM16 18h4v4h-4zM22 18h4v4h-4zM4 18h4v4h-4zM26 0v2h-4v-2h-14v2h-4v-2h-4v32h30v-32h-4zM28 30h-26v-22h26v22z"
                    ></path>
                </svg>
            </button>
        </div>
    `;
};

export default dateInput;
