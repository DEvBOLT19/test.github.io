/* ==========================================================================
   BOLT. — BLOG DATA
   ==========================================================================
   This is the ONLY file you edit to publish a post.

   HOW TO WRITE A POST
   -------------------
   Add a new object to the TOP of the BLOG_POSTS array below.
   The `content` is plain Markdown:

     # Heading           -> big heading
     ## Subheading       -> subheading
     ### Small heading   -> smaller subheading
     **bold text**       -> bold
     *italic text*       -> italic
     [text](https://url) -> hyperlink
     ![alt](images/x.png)-> image (put the file in the /images folder)
     > quoted text       -> blockquote
     `code`              -> inline code
     ---                 -> horizontal divider

   The newest post (by date) automatically shows its excerpt on the homepage.
   Don't start content with "# your title" — the page renders the title itself.
   ========================================================================== */

const BLOG_POSTS = [
  {
    slug: "how-i-write-these-posts",
    title: "How I write these posts",
    date: "2026-07-19", // YYYY-MM-DD
    tags: ["meta", "writing"],
    excerpt:
      "Every post on this site is just plain Markdown. Headings, bold text, links, images — all of it lives in one file. Here is the exact syntax I use, so future-me never forgets.",
    content: `
Every post here is written in **Markdown** inside a single file: \`blog-data.js\`. No CMS, no database, no build step. Just text.

## Headings

A single \`#\` makes a big heading. Two \`##\` make a subheading like the one above. Three \`###\` make a smaller one.

### Like this

## Bold and italic

Wrap text in double asterisks for **bold text**, single asterisks for *italic text*.

## Links

Write \`[the text](https://vercel.com)\` and you get [the text](https://vercel.com) as a clickable hyperlink.

## Images

Drop an image into the \`images\` folder, then write:

\`![a pixel sunset](images/pfp.png)\`

![a pixel sunset over a mountain landscape](images/pixel-sunset.png)

## Quotes and code

> Simplicity is the whole point.

And inline \`code\` looks like this.

---

That's the whole system. Write, save, publish.
`,
  },
  {
    slug: "hello-world",
    title: "hello, world",
    date: "2026-07-01",
    tags: ["meta"],
    excerpt: "First post. Testing the pixels.",
    content: `
This is the first post on **BOLT.** — a small corner of the internet for notes, experiments and half-finished thoughts.

idk what to write its just a demo post first time testing this shit , is soooooo crazy \`BOLT IS SO PEAK\`

More soon.
`,
  },
]

/* Your social links — update the usernames here */
const SOCIAL_LINKS = {
  github: "https://github.com/DEvBOLT19",
  x: "https://x.com/yourusername",
  linkedin: "https://www.linkedin.com/in/raghvendra-dodiya-0768413b4/",
}

// ---------- markdown rendering ----------
function markdownToHtml(markdown) {
  if (!markdown) return "";

  let html = markdown
    .trim()
    .split("\n")
    .map(function (line) {
      const trimmed = line.trim();

      // Horizontal divider
      if (trimmed === "---") return "<hr>";

      // Headings
      if (trimmed.startsWith("### ")) {
        return (
          "<h3>" + escapeHtml(trimmed.substring(4)) + "</h3>"
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          "<h2>" + escapeHtml(trimmed.substring(3)) + "</h2>"
        );
      }
      if (trimmed.startsWith("# ")) {
        return (
          "<h1>" + escapeHtml(trimmed.substring(2)) + "</h1>"
        );
      }

      // Blockquotes
      if (trimmed.startsWith("> ")) {
        return (
          "<blockquote>" + renderInlineMarkdown(trimmed.substring(2)) + "</blockquote>"
        );
      }

      // Paragraphs
      if (trimmed.length > 0) {
        return "<p>" + renderInlineMarkdown(trimmed) + "</p>";
      }

      return "";
    })
    .join("");

  return html;
}

function renderInlineMarkdown(text) {
  // Escape HTML first
  text = escapeHtml(text);

  // Links [text](url)
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    function (match, linkText, url) {
      return '<a href="' + url + '" target="_blank" rel="noopener">' + linkText + "</a>";
    }
  );

  // Images ![alt](src)
  text = text.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    function (match, alt, src) {
      return '<img src="' + src + '" alt="' + alt + '" loading="lazy" />';
    }
  );

  // Bold **text**
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  // Italic *text*
  text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // Inline code `code`
  text = text.replace(/`([^`]+)`/g, "<code>$1</code>");

  return text;
}

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, function (char) {
    return map[char];
  });
}

// ---------- render blog page ----------
function renderBlogPage() {
  const postList = document.getElementById("blog-post-list");
  if (!postList) return;

  if (BLOG_POSTS.length === 0) {
    postList.innerHTML = '<div class="empty-state mono">No posts yet</div>';
    return;
  }

  postList.innerHTML = BLOG_POSTS.map(function (post) {
    return renderBlogPostCard(post);
  }).join("");

  // Add click handlers
  const postCards = postList.querySelectorAll(".blog-post-card");
  postCards.forEach(function (card) {
    card.addEventListener("click", function () {
      const slug = card.getAttribute("data-slug");
      renderBlogPost(slug);
    });
  });
}

function renderBlogPostCard(post) {
  const tagsHtml = post.tags.map(function (tag) {
    return '<span class="blog-tag mono">' + tag + "</span>";
  }).join("");

  return (
    '<article class="blog-post-card" data-slug="' + post.slug + '" role="button" tabindex="0">' +
    '<div class="blog-post-card-header">' +
    '<h3 class="blog-post-title">' + post.title + "</h3>" +
    '<time class="blog-post-date mono" datetime="' + post.date + '">' +
    formatDate(post.date) +
    "</time>" +
    "</div>" +
    '<p class="blog-post-excerpt">' + post.excerpt + "</p>" +
    '<div class="blog-tags">' + tagsHtml + "</div>" +
    "</article>"
  );
}

function renderBlogPost(slug) {
  const post = BLOG_POSTS.find(function (p) {
    return p.slug === slug;
  });

  if (!post) return;

  const postList = document.getElementById("blog-post-list");
  const postDetail = document.getElementById("blog-post-detail");

  postList.style.display = "none";
  postDetail.style.display = "block";

  const backBtn = postDetail.querySelector(".blog-back-btn");
  backBtn.onclick = function () {
    postList.style.display = "grid";
    postDetail.style.display = "none";
  };

  const header = postDetail.querySelector(".blog-post-header");
  header.innerHTML =
    '<h1 class="blog-post-title-large">' + post.title + "</h1>" +
    '<div class="blog-post-meta">' +
    '<time class="mono" datetime="' + post.date + '">' +
    formatDate(post.date) +
    "</time>" +
    '<div class="blog-tags">' +
    post.tags.map(function (tag) {
      return '<span class="blog-tag mono">' + tag + "</span>";
    }).join("") +
    "</div>" +
    "</div>";

  const content = postDetail.querySelector(".blog-post-content");
  content.innerHTML = markdownToHtml(post.content);
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

// ---------- init ----------
document.addEventListener("DOMContentLoaded", function () {
  renderBlogPage();

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});
