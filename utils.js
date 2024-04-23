const domparser = new DOMParser();
const html = (strings, ...values) => {
    const elem = String.raw({ raw: strings }, ...values);
    if (domparser.parseFromString(elem, "text/html")) {
        return elem;
    }
    console.error("Invalid html.");
    return `<p class="text-red-600 text-lg">Invalid HTML</p>`;
};
const css = (strings, ...values) => String.raw({ raw: strings }, ...values);

export { html, css };
