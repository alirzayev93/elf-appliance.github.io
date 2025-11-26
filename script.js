const tipText = document.getElementById("tipText");
const tipButton = document.getElementById("tipButton");
const form = document.querySelector(".contact-form");
const messageEl = document.querySelector(".form__message");
const yearEl = document.getElementById("year");

const tips = [
    "Clean your refrigerator coils every six months to improve cooling efficiency.",
    "Empty your lint trap after each cycle to avoid dryer overheating.",
    "Run a hot water cycle with vinegar once a month to keep dishwashers fresh.",
    "Avoid overloading washers; balanced loads protect the motor and bearings.",
    "Keep oven door seals clean so heat stays inside and cooks evenly."
];

yearEl.textContent = new Date().getFullYear();

tipButton?.addEventListener("click", () => {
    const currentTip = tipText.textContent;
    let nextTip = currentTip;
    while (nextTip === currentTip) {
        nextTip = tips[Math.floor(Math.random() * tips.length)];
    }
    tipText.textContent = nextTip;
});

form?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
        messageEl.textContent = "Please fill out all required fields.";
        messageEl.style.color = "#c92a2a";
        return;
    }

    const formData = new FormData(form);
    const name = formData.get("name");

    messageEl.textContent = `Thanks ${name || "there"}! We will confirm your appointment shortly.`;
    messageEl.style.color = "#0f8a2a";
    form.reset();
});

const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav__toggle");
const dropdownButtons = document.querySelectorAll(".has-dropdown .nav__link");

navToggle?.addEventListener("click", () => {
    nav?.classList.toggle("is-open");
});

document.querySelectorAll(".nav__list a").forEach((link) => {
    link.addEventListener("click", () => {
        nav?.classList.remove("is-open");
    });
});

dropdownButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const parent = button.closest(".has-dropdown");
        const isOpen = parent?.classList.toggle("open");
        dropdownButtons.forEach((btn) => {
            if (btn !== button) {
                btn.closest(".has-dropdown")?.classList.remove("open");
                btn.setAttribute("aria-expanded", "false");
            }
        });
        button.setAttribute("aria-expanded", isOpen ? "true" : "false");
        event.preventDefault();
    });
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav")) {
        nav?.classList.remove("is-open");
        dropdownButtons.forEach((btn) => {
            btn.closest(".has-dropdown")?.classList.remove("open");
            btn.setAttribute("aria-expanded", "false");
        });
    }
});

const reviewTrack = document.getElementById("reviewTrack");
document.querySelectorAll(".review-nav").forEach((button) => {
    button.addEventListener("click", () => {
        const direction = button.classList.contains("review-nav--next") ? 1 : -1;
        reviewTrack?.scrollBy({
            left: direction * 320,
            behavior: "smooth"
        });
    });
});

const photoTrack = document.getElementById("photoTrack");
document.querySelectorAll(".photo-nav").forEach((button) => {
    button.addEventListener("click", () => {
        const viewport = photoTrack?.parentElement;
        const scrollAmount = viewport ? viewport.clientWidth * 0.9 : 320;
        const direction = button.classList.contains("photo-nav--next") ? 1 : -1;
        photoTrack?.scrollBy({
            left: direction * scrollAmount,
            behavior: "smooth"
        });
    });
});

const accordionItems = document.querySelectorAll(".accordion__item");
accordionItems.forEach((item) => {
    const trigger = item.querySelector(".accordion__trigger");
    trigger?.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        accordionItems.forEach((accordionItem) => {
            accordionItem.classList.remove("is-open");
            accordionItem.querySelector(".accordion__trigger")?.setAttribute("aria-expanded", "false");
            const icon = accordionItem.querySelector(".accordion__icon");
            if (icon) icon.textContent = "+";
        });

        if (!isOpen) {
            item.classList.add("is-open");
            trigger.setAttribute("aria-expanded", "true");
            const icon = item.querySelector(".accordion__icon");
            if (icon) icon.textContent = "-";
        }
    });
});
