const PASSWORD = "chili heat wave";

const days = [
  {
    date: "Thursday",
    title: "Soft Landing",
    vibe: "Airport pickup, homemade dinner, movie night, and very little ambition.",
    stripe: "#16777b",
    outfit: "Cozy PJs lol.",
    plan: [
      ["6:45pm", "Airport pickup"],
      ["Evening", "Homemade dinner. I hope you like my cooking."],
      ["Late", "Movie night"],
      ["Overall", "Really chill. Nothing stressful."],
    ],
  },
  {
    date: "Friday",
    title: "Exploring the City",
    vibe: "Waterfront, aquarium, boat views, a big wheel, and city wandering.",
    stripe: "#d65f45",
    outfit: "Comfortable shoes during the day.",
    plan: [
      ["Morning", "Breakfast at home"],
      ["Late morning", "Walk to the waterfront"],
      ["Late morning", "Seattle Aquarium and Ocean Pavilion"],
      ["Early afternoon", "Snack or coffee checkpoint"],
      ["Afternoon", "Salish Sea Tours from Pier 57"],
      ["After boat", "Wings Over Washington"],
      ["After Wings", "Seattle Great Wheel"],
      ["Evening", "Home reset, then a chill night"],
    ],
  },
  {
    date: "Saturday",
    title: "Seattle Center + Meeting Friends",
    vibe: "Views, glass gardens, Bite of Seattle, friends, and a classified night plan.",
    stripe: "#e3b64d",
    outfit: "Casual during the day. Semi-formal-ish for the night, but not dressy.",
    plan: [
      ["Late morning", "Space Needle"],
      ["Midday", "Chihuly Garden and Glass"],
      ["Afternoon", "Bite of Seattle with friends"],
      ["Late afternoon", "Home reset and change"],
      ["Evening", "Dinner or light drinks"],
      ["Night", "Classified"],
      ["Late night", "Bar hopping"],
    ],
  },
  {
    date: "Sunday",
    title: "Spend the Day at Home With Me?",
    vibe: "Brunch, movies, dinner, baking, and doing the absolute least.",
    stripe: "#9bd3bf",
    outfit: "Cozy during the day. Something dressy for dinner.",
    plan: [
      ["Morning", "Brunch at home"],
      ["All day", "Movies all day"],
      ["Evening", "Baking"],
      ["Night", "Dressy dinner around 8:30pm"],
      ["After dinner", "House of the Dragon"],
    ],
  },
  {
    date: "Monday",
    title: "See Where I Work + Mall + Bookstore",
    vibe: "Microsoft campus, mall wandering, and a bookstore stop.",
    stripe: "#7bb7d8",
    outfit: "Casual, walkable, bookstore-compatible.",
    plan: [
      ["Daytime", "Microsoft campus tour"],
      ["After", "Mall stop"],
      ["Book hour", "Barnes & Noble"],
      ["7:30pm", "The Odyssey"],
    ],
  },
  {
    date: "Tuesday",
    title: "TBD",
    vibe: "Still planning.",
    stripe: "#5d406f",
    outfit: "TBD.",
    plan: [
      ["Status", "TBD"],
      ["Note", "Still planning this one."],
    ],
  },
  {
    date: "Wednesday",
    title: "Final Chapter",
    vibe: "Final moments at home, doing nothing.",
    stripe: "#ef9a8a",
    outfit: "Comfortable.",
    plan: [
      ["Morning", "I would like to spend the final moments at home with you doing nothing."],
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
          <div class="day-details">
            <ul class="plan-list">${plan}</ul>
            <aside class="day-side">
              <div class="outfit-box">
                <strong>Outfit hint</strong>
                <p>${day.outfit}</p>
              </div>
              ${classified}
            </aside>
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
