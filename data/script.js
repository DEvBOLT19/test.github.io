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

// ---------- render interactive project boxes ----------
function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map(function (p, i) {
    const index = String(i + 1).padStart(2, "0");
    const tags = p.tags
      .map(function (t) {
        return '<span class="tag">' + t + "</span>";
      })
      .join("");

    return (
      '<div class="project-box" role="button" tabindex="0" data-index="' + i + '" aria-pressed="false">' +
      '<span class="project-top">' +
      '<span class="project-index mono">[' + index + "]</span>" +
      '<a class="project-open mono" href="' + p.url + '" target="_blank" rel="noopener noreferrer" aria-label="Open ' + p.name + ' on GitHub">Open ↗</a>' +
      "</span>" +
      '<span class="project-name">' + p.name + "</span>" +
      '<span class="project-desc mono">' + p.description + "</span>" +
      '<span class="project-tags">' + tags + "</span>" +
      "</button>"
    );
  }).join("");

  // click a box → light it up (alternating orange / blue) + grow; click again to release
  grid.querySelectorAll(".project-box").forEach(function (box) {
    box.addEventListener("click", function (e) {
      // let the "Open ↗" link work normally without toggling
      if (e.target.closest("a")) return;

      const i = Number(box.dataset.index);
      const colorClass = i % 2 === 0 ? "active-orange" : "active-blue";

      if (box.classList.contains(colorClass)) {
        box.classList.remove(colorClass);
        box.setAttribute("aria-pressed", "false");
      } else {
        box.classList.remove("active-orange", "active-blue");
        box.classList.add(colorClass);
        box.setAttribute("aria-pressed", "true");
      }
    });
  });
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

// ---------- cursor glow ----------
function wireCursorGlow() {
  const glow = document.getElementById("cursor-glow");
  if (!glow || window.matchMedia("(pointer: coarse)").matches) return;

  document.addEventListener("mousemove", function (e) {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
    glow.style.opacity = "1";
  });

  document.addEventListener("mouseleave", function () {
    glow.style.opacity = "0";
  });
}

// ---------- scroll reveal ----------
function wireReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  els.forEach(function (el) { observer.observe(el); });
}

// ---------- nav active section highlighting ----------
function wireNavHighlight() {
  const links = document.querySelectorAll(".nav-link");
  const sections = ["top", "work", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle("is-active", link.dataset.section === entry.target.id);
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sections.forEach(function (s) { observer.observe(s); });
}

// ---------- init ----------
document.addEventListener("DOMContentLoaded", function () {
  renderProjects();
  wireCursorGlow();
  wireReveal();
  wireNavHighlight();

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
