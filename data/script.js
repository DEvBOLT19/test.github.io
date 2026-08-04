/* BOLT. portfolio — data + interactions */

// ---------- config ----------
const CONFIG = {
  email: "devbolt19@gmail.com",
  discordId: "1465964458282188820",
  github: "https://github.com/DEvBOLT19",
};

// ---------- watchlist ----------
const WATCHLIST = {
  franchises: [
    {
      name: "Marvel Cinematic Universe",
      shortName: "MCU",
      movies: [
        {
          title: "Iron Man",
          releaseDate: "2008",
          availableInIndia: true,
          where: "Disney+ Hotstar",
          watched: true,
          currentlyWatching: false
        }
      ]
    },
    {
      name: "The Dark Knight Trilogy",
      shortName: "TDK",
      movies: [
        {
          title: "Batman Begins",
          releaseDate: "2005",
          availableInIndia: true,
          where: "Prime Video",
          watched: true,
          currentlyWatching: false
        },
        {
          title: "The Dark Knight",
          releaseDate: "2008",
          availableInIndia: true,
          where: "Prime Video",
          watched: false,
          currentlyWatching: true
        }
      ]
    }
  ],
  standalone: [
    {
      title: "Inception",
      releaseDate: "2010",
      availableInIndia: true,
      where: "Netflix",
      watched: false,
      currentlyWatching: false
    }
  ]
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

// ---------- render watchlist ----------
function renderWatchlist() {
  // Currently watching
  const currentlyWatchingList = document.getElementById("currently-watching-list");
  if (currentlyWatchingList) {
    const currentMovies = [];
    WATCHLIST.franchises.forEach(function (f) {
      f.movies.forEach(function (m) {
        if (m.currentlyWatching) currentMovies.push({ ...m, franchise: f.name });
      });
    });
    WATCHLIST.standalone.forEach(function (m) {
      if (m.currentlyWatching) currentMovies.push(m);
    });

    if (currentMovies.length === 0) {
      currentlyWatchingList.innerHTML = '<p class="empty-state mono">No movies currently being watched</p>';
    } else {
      currentlyWatchingList.innerHTML = currentMovies.map(function (m) {
        return renderMovieCard(m);
      }).join("");
    }
  }

  // Franchises
  const franchisesList = document.getElementById("franchises-list");
  if (franchisesList) {
    franchisesList.innerHTML = WATCHLIST.franchises.map(function (f) {
      return renderFranchise(f);
    }).join("");
  }
  const franchiseCount = document.getElementById("franchise-count");
  if (franchiseCount) franchiseCount.textContent = WATCHLIST.franchises.length + " franchises";

  // Standalone
  const standaloneList = document.getElementById("standalone-list");
  if (standaloneList) {
    standaloneList.innerHTML = WATCHLIST.standalone.map(function (m) {
      return renderMovieCard(m);
    }).join("");
  }
  const standaloneCount = document.getElementById("standalone-count");
  if (standaloneCount) standaloneCount.textContent = WATCHLIST.standalone.length + " films";

  // Stats
  updateWatchlistStats();
}

function renderFranchise(franchise) {
  const moviesHtml = franchise.movies.map(function (m) {
    return renderMovieInFranchise(m);
  }).join("");

  return (
    '<div class="franchise-card">' +
    '<div class="franchise-header">' +
    '<h3 class="franchise-name">' + franchise.name + '</h3>' +
    '<span class="franchise-tag mono">' + franchise.shortName + '</span>' +
    '</div>' +
    '<div class="franchise-movies">' +
    moviesHtml +
    '</div>' +
    '</div>'
  );
}

function renderMovieInFranchise(movie) {
  const statusClass = movie.watched ? 'watched' : movie.currentlyWatching ? 'watching' : 'pending';
  const statusText = movie.watched ? '✓ Watched' : movie.currentlyWatching ? '▶ Watching' : 'Pending';
  
  return (
    '<div class="movie-in-franchise">' +
    '<div class="movie-info">' +
    '<p class="movie-title">' + movie.title + '</p>' +
    '<p class="movie-meta mono">' + movie.releaseDate + ' • ' + movie.where + '</p>' +
    '</div>' +
    '<span class="movie-status ' + statusClass + ' mono">' + statusText + '</span>' +
    '</div>'
  );
}

function renderMovieCard(movie) {
  const statusClass = movie.watched ? 'watched' : movie.currentlyWatching ? 'watching' : 'pending';
  const statusText = movie.watched ? '✓ Watched' : movie.currentlyWatching ? '▶ Watching' : 'Pending';
  const franchiseText = movie.franchise ? ' • ' + movie.franchise : '';
  
  return (
    '<div class="movie-card">' +
    '<div class="movie-card-content">' +
    '<h3 class="movie-card-title">' + movie.title + '</h3>' +
    '<p class="movie-card-meta mono">' + movie.releaseDate + franchiseText + '</p>' +
    '<p class="movie-card-location mono">' + movie.where + '</p>' +
    '</div>' +
    '<span class="movie-card-status ' + statusClass + ' mono">' + statusText + '</span>' +
    '</div>'
  );
}

function updateWatchlistStats() {
  let total = 0;
  let watched = 0;
  let watching = 0;

  WATCHLIST.franchises.forEach(function (f) {
    f.movies.forEach(function (m) {
      total += 1;
      if (m.watched) watched += 1;
      else if (m.currentlyWatching) watching += 1;
    });
  });

  WATCHLIST.standalone.forEach(function (m) {
    total += 1;
    if (m.watched) watched += 1;
    else if (m.currentlyWatching) watching += 1;
  });

  const pending = total - watched - watching;

  const totalEl = document.getElementById("stat-total");
  const watchedEl = document.getElementById("stat-watched");
  const watchingEl = document.getElementById("stat-watching");
  const pendingEl = document.getElementById("stat-pending");

  if (totalEl) totalEl.textContent = String(total);
  if (watchedEl) watchedEl.textContent = String(watched);
  if (watchingEl) watchingEl.textContent = String(watching);
  if (pendingEl) pendingEl.textContent = String(pending);
}

// ---------- init ----------
document.addEventListener("DOMContentLoaded", function () {
  renderProjects();
  renderWatchlist();

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
