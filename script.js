const PASSWORD = "chili heat wave";

const days = [
  {
    date: "Thursday",
    title: "Arrival Day",
    vibe: "Airport pickup, dinner, and a movie.",
    stripe: "#16777b",
    outfit: "Comfortable clothes.",
    plan: [
      ["6:45pm", "Airport pickup"],
      ["Evening", "Homemade dinner"],
      ["Late", "Movie night"],
    ],
  },
  {
    date: "Friday",
    title: "Waterfront Day",
    vibe: "Aquarium, boat tour, Wings Over Washington, and the Great Wheel.",
    stripe: "#d65f45",
    outfit: "Comfortable shoes during the day.",
    plan: [
      ["Morning", "Breakfast at home"],
      ["Late morning", "Walk to the waterfront"],
      ["Late morning", "Seattle Aquarium and Ocean Pavilion"],
      ["Early afternoon", "Snack or coffee"],
      ["Afternoon", "Salish Sea Tours from Pier 57"],
      ["After boat", "Wings Over Washington"],
      ["After Wings", "Seattle Great Wheel"],
      ["Evening", "Return home"],
    ],
  },
  {
    date: "Saturday",
    title: "Seattle Center",
    vibe: "Space Needle, Chihuly, Bite of Seattle, and friends.",
    stripe: "#e3b64d",
    outfit: "Casual during the day. Semi-formal in the evening.",
    plan: [
      ["Late morning", "Space Needle"],
      ["Midday", "Chihuly Garden and Glass"],
      ["Afternoon", "Bite of Seattle with friends"],
      ["Late afternoon", "Return home and change"],
      ["Evening", "Dinner or light drinks"],
      ["Night", "Classified"],
      ["Late night", "Bar hopping"],
      ["Late night", "Photobooth at Jupiter"],
    ],
  },
  {
    date: "Sunday",
    title: "Tea and Movies",
    vibe: "Tea, a bookstore, movies, and dinner.",
    stripe: "#9bd3bf",
    outfit: "Comfortable during the day. Dressy for dinner.",
    plan: [
      ["Morning", "Tea somewhere"],
      ["After tea", "Cool bookstore"],
      ["Afternoon", "Movies all afternoon"],
      ["Night", "Dressy dinner around 8:30pm"],
      ["After dinner", "House of the Dragon"],
    ],
  },
  {
    date: "Monday",
    title: "Microsoft and Movie",
    vibe: "Microsoft campus, the mall, Barnes & Noble, and The Odyssey.",
    stripe: "#7bb7d8",
    plan: [
      ["Daytime", "Microsoft campus tour"],
      ["After", "Mall stop + Barnes & Noble"],
      ["7:30pm", "The Odyssey"],
    ],
  },
  {
    date: "Tuesday",
    title: "WNBA Game",
    vibe: "Time at home, then the WNBA game.",
    stripe: "#5d406f",
    outfit: "Casual clothes.",
    plan: [
      ["Daytime", "Stay at home, relax, and hang out"],
      ["Before the game", "Get ready and head to the arena"],
      ["6:30pm", "WNBA game"],
    ],
  },
  {
    date: "Wednesday",
    title: "Departure Day",
    vibe: "Time at home, then the airport.",
    stripe: "#ef9a8a",
    plan: [
      ["Morning", "Spend time at home"],
      ["Departure", "Airport run"],
    ],
  },
];

const movies = [
  "Is This Thing On",
  "The Worst Person in the World",
  "Fingernails",
  "You Hurt My Feelings",
  "Voicenotes for Isabelle",
  "Sylvie's Love",
  "Hitch",
  "Dead Poets Society",
];

const passwordScreen = document.querySelector("#passwordScreen");
const siteShell = document.querySelector("#siteShell");
const passwordForm = document.querySelector("#passwordForm");
const passwordInput = document.querySelector("#passwordInput");
const passwordHelp = document.querySelector("#passwordHelp");
const dayStack = document.querySelector("#dayStack");
const movieBoard = document.querySelector("#movieBoard");

function normalize(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function unlockSite() {
  passwordScreen.classList.add("is-hidden");
  siteShell.classList.add("is-unlocked");
  siteShell.removeAttribute("aria-hidden");
}

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (normalize(passwordInput.value) === PASSWORD) {
    unlockSite();
    return;
  }
  passwordHelp.textContent = "Not quite. Think your favorite Doritos flavor.";
  passwordHelp.classList.add("is-error");
  passwordInput.focus();
});

function renderDays() {
  dayStack.innerHTML = days
    .map((day, index) => {
      const plan = day.plan
        .map(([time, detail]) => `<li><strong>${time}</strong><span>${detail}</span></li>`)
        .join("");
      const classified = day.classified
        ? `<div class="classified-box">
            <strong>Classified note</strong>
            <p>${day.classified}</p>
          </div>`
        : "";
      const outfit = day.outfit
        ? `<div class="outfit-box">
            <strong>Outfit hint</strong>
            <p>${day.outfit}</p>
          </div>`
        : "";
      const daySide = outfit || classified
        ? `<aside class="day-side">${outfit}${classified}</aside>`
        : "";

      return `
        <article class="day-card ${index === 0 ? "is-open" : ""}" style="--stripe: ${day.stripe}">
          <button class="day-toggle" type="button" aria-expanded="${index === 0 ? "true" : "false"}">
            <span class="date-pill">${day.date.replace(" ", "<br>")}</span>
            <span class="day-title">
              <h3>${day.title}</h3>
              <p>${day.vibe}</p>
            </span>
            <span class="toggle-mark" aria-hidden="true">${index === 0 ? "-" : "+"}</span>
          </button>
          <div class="day-details ${daySide ? "" : "is-full"}">
            <ul class="plan-list">${plan}</ul>
            ${daySide}
          </div>
        </article>
      `;
    })
    .join("");

  dayStack.querySelectorAll(".day-card").forEach((card) => {
    const button = card.querySelector(".day-toggle");
    const mark = card.querySelector(".toggle-mark");
    button.addEventListener("click", () => {
      const isOpen = card.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
      mark.textContent = isOpen ? "-" : "+";
    });
  });
}

function renderMovies() {
  movieBoard.innerHTML = movies
    .map(
      (title) => `
        <article class="movie-card" tabindex="0" role="button" aria-pressed="false">
          <h3>${title}</h3>
        </article>
      `,
    )
    .join("");

  movieBoard.querySelectorAll(".movie-card").forEach((card) => {
    const toggle = () => {
      const isSelected = card.classList.toggle("is-selected");
      card.setAttribute("aria-pressed", String(isSelected));
    };
    card.addEventListener("click", toggle);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    });
  });
}

renderDays();
renderMovies();
