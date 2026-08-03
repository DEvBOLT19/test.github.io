/* BOLT. portfolio — data + interactions */

// ---------- config ----------
const CONFIG = {
  email: "devbolt19@gmail.com",
  discordId: "1465964458282188820",
  github: "https://github.com/DEvBOLT19",
};

// ---------- projects (from github.com/DEvBOLT19) ----------
const PROJECTS = [
  {
    name: "CRICKET_PREDICTOR",
    description:
      "Machine Learning web app that predicts the winning probability of the chasing team in a T20 (IPL) cricket match.",
    tags: ["Python", "ML", "Streamlit"],
    url: "https://github.com/DEvBOLT19/CRICKET_PREDICTOR",
  },
  {
    name: "BOLT-AI",
    description: "Personal AI assistant project built in Python.",
    tags: ["Python", "AI"],
    url: "https://github.com/DEvBOLT19/BOLT-AI",
  },
  {
    name: "task-tracker",
    description: "Minimal command-line task tracking utility.",
    tags: ["Python", "CLI"],
    url: "https://github.com/DEvBOLT19/task-tracker",
  },
  {
    name: "russian_roullete",
    description: "A small game of chance — pull the trigger if you dare.",
    tags: ["Game"],
    url: "https://github.com/DEvBOLT19/russian_roullete",
  },
  {
    name: "devbolt19.github.io",
    description: "This very portfolio website. Raw HTML, CSS and JavaScript.",
    tags: ["HTML", "CSS", "JS"],
    url: "https://github.com/DEvBOLT19/devbolt19.github.io",
  },
];

// ---------- render projects ----------
function renderProjects() {
  const list = document.getElementById("project-list");
  if (!list) return;

  list.innerHTML = PROJECTS.map(function (p, i) {
    const index = String(i + 1).padStart(2, "0");
    const tags = p.tags
      .map(function (t) {
        return '<span class="tag">' + t + "</span>";
      })
      .join("");

    return (
      '<li class="project-item">' +
      '<a class="project-link" href="' + p.url + '" target="_blank" rel="noopener noreferrer">' +
      '<span class="project-index mono">' + index + "</span>" +
      "<span>" +
      '<span class="project-name">' + p.name + "</span>" +
      '<span class="project-desc mono">' + p.description + "</span>" +
      "</span>" +
      '<span class="project-meta">' +
      tags +
      '<span class="project-arrow" aria-hidden="true">&#8599;</span>' +
      "</span>" +
      "</a>" +
      "</li>"
    );
  }).join("");
}

// ---------- copy helpers ----------
function wireCopyButton(buttonId, getValue) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;

  const label = btn.querySelector("span:last-child");
  const original = label ? label.textContent : "";

  btn.addEventListener("click", function () {
    navigator.clipboard.writeText(getValue()).then(function () {
      btn.classList.add("copied");
      if (label) label.textContent = "Copied";
      setTimeout(function () {
        btn.classList.remove("copied");
        if (label) label.textContent = original;
      }, 1600);
    });
  });
}

// ---------- init ----------
document.addEventListener("DOMContentLoaded", function () {
  renderProjects();

  const emailEl = document.getElementById("email-value");
  if (emailEl) emailEl.textContent = CONFIG.email;

  wireCopyButton("copy-email", function () {
    return CONFIG.email;
  });

  wireCopyButton("copy-discord", function () {
    return CONFIG.discordId;
  });

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});
