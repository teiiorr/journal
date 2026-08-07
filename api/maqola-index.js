// Server-rendered listing of every published article — this is the page
// Google Scholar's crawler follows to discover /maqola/<slug> pages, since it
// does not execute the JS on /#maqolalar.

import { createClient } from "@supabase/supabase-js";

const SITE = "journal";
const SITE_ORIGIN = "https://uzsiac-bulletin.uz";
const JOURNAL_TITLE = "O'zbekiston davlat san'at va madaniyat instituti xabarlari";
const JOURNAL_TITLE_SHORT = "O'zDSMI xabarlari";
const ISSN = "2181-8932";
const PUBLISHER = "O'zbekiston davlat san'at va madaniyat instituti";

const supabase = createClient(
    process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
);

function esc(s) {
    return String(s ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const STYLES = `
    :root {
        color-scheme: light;
        --panel: #ffffff;
        --panel-warm: #fbf7ee;
        --panel-soft: #fdfaf3;
        --muted: #5d6c78;
        --text: #2a343e;
        --ink: #171b21;
        --border: #e5dfd3;
        --border-soft: #efebde;
        --maroon: #9f2d31;
        --maroon-dark: #7f2024;
        --maroon-soft: #f6ebec;
        --gold: #b9923f;
        --gold-dark: #8e6f2c;
        --green: #7dad2f;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
        background: var(--panel);
        color: var(--text);
        font-family: "Montserrat", system-ui, -apple-system, "Segoe UI", sans-serif;
        line-height: 1.6;
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
    }

    /* ==== Chrome ==== */
    .masthead-strip {
        background: var(--panel-warm);
        border-bottom: 1px solid var(--border);
        padding: 1.125rem 2rem;
    }
    .masthead-inner {
        max-width: 1400px; margin: 0 auto;
        display: flex; align-items: center; justify-content: space-between;
        gap: 1rem; flex-wrap: wrap;
    }
    .masthead-strip a.brand { display: flex; align-items: center; gap: 0.875rem; text-decoration: none; color: inherit; }
    .masthead-strip img { width: 48px; height: 48px; object-fit: contain; }
    .brand-title { font-weight: 800; font-size: 1rem; color: var(--ink); letter-spacing: -0.005em; display: block; line-height: 1.2; }
    .brand-sub { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); display: block; margin-top: 3px; }

    .top-nav {
        background: var(--maroon);
        border-bottom: 3px solid var(--gold);
        position: sticky; top: 0; z-index: 10;
    }
    .top-nav-inner { max-width: 1400px; margin: 0 auto; display: flex; flex-wrap: wrap; }
    .top-nav a {
        min-height: 58px;
        display: inline-flex; align-items: center; justify-content: center;
        padding: 0 1.75rem;
        color: rgba(255, 255, 255, 0.92);
        font-size: 0.8125rem; font-weight: 700;
        letter-spacing: 0.09em; text-transform: uppercase;
        text-decoration: none;
        transition: background 0.2s;
        position: relative;
    }
    .top-nav a:hover { background: rgba(255, 255, 255, 0.08); color: #fff; }
    .top-nav a.is-current { color: #fff; background: rgba(0, 0, 0, 0.12); }
    .top-nav a.is-current::after {
        content: ""; position: absolute; left: 0; right: 0; bottom: -3px;
        height: 3px; background: var(--gold);
    }

    .notice-bar {
        background: var(--green); color: #fff;
        padding: 0.75rem 2rem;
        font-size: 0.8125rem; font-weight: 500;
    }
    .notice-inner { max-width: 1400px; margin: 0 auto; }

    /* ==== Hero ==== */
    .page-hero {
        padding: 4rem 2rem 2.5rem;
        background: linear-gradient(180deg, var(--panel-warm) 0%, var(--panel) 100%);
        border-bottom: 1px solid var(--border-soft);
    }
    .hero-inner { max-width: 1200px; margin: 0 auto; }
    .breadcrumb {
        display: flex; flex-wrap: wrap; gap: 0.5rem;
        font-size: 0.75rem; font-weight: 700;
        letter-spacing: 0.09em; text-transform: uppercase;
        color: var(--muted); margin-bottom: 1.25rem;
    }
    .breadcrumb a { color: var(--muted); text-decoration: none; }
    .breadcrumb a:hover { color: var(--maroon); }
    .breadcrumb strong { color: var(--maroon); }
    .breadcrumb span.sep { opacity: 0.4; }

    .hero-eyebrow {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--maroon);
        font-weight: 800;
        margin-bottom: 0.75rem;
    }
    h1.hero-title {
        font-family: "Montserrat", system-ui, sans-serif;
        font-size: clamp(2rem, 4.5vw, 3.5rem);
        line-height: 1.05;
        letter-spacing: -0.025em;
        color: var(--ink);
        font-weight: 800;
        margin: 0 0 1rem;
    }
    .hero-lead {
        color: var(--muted);
        font-size: 1.0625rem;
        line-height: 1.7;
        max-width: 60ch;
        margin: 0;
    }

    /* ==== Listing ==== */
    .listing-section {
        padding: 2.5rem 2rem 4rem;
        background: var(--panel);
    }
    .listing-inner { max-width: 1200px; margin: 0 auto; }

    /* Search */
    .search-bar {
        display: grid;
        grid-template-columns: 1fr minmax(220px, 280px) auto;
        align-items: center;
        gap: 0.875rem;
        margin: 0 0 2rem;
        padding: 1rem 1.25rem;
        background: var(--panel-warm);
        border: 1px solid var(--border);
        border-radius: 8px;
    }
    @media (max-width: 720px) {
        .search-bar { grid-template-columns: 1fr; }
        .search-bar .search-count { text-align: left; }
    }
    .search-bar input, .search-bar select {
        padding: 0.6875rem 0.875rem;
        border: 1px solid var(--border);
        border-radius: 4px;
        font: inherit; font-size: 0.9375rem;
        background: #fff; color: var(--text);
        transition: border-color 0.15s, box-shadow 0.15s;
        width: 100%;
    }
    .search-bar select {
        appearance: none;
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%235d6c78' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>");
        background-repeat: no-repeat;
        background-position: right 12px center;
        padding-right: 34px;
        cursor: pointer;
    }
    .search-bar input:focus, .search-bar select:focus {
        outline: none;
        border-color: var(--maroon);
        box-shadow: 0 0 0 3px rgba(159, 45, 49, 0.14);
    }
    .search-bar .search-count {
        font-size: 0.8125rem; color: var(--muted); font-weight: 600;
        min-width: 120px; text-align: right; padding: 0 0.375rem;
    }

    /* Cards grid */
    .articles-list {
        display: grid;
        gap: 1.25rem;
        grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    }
    .listing-item {
        padding: 1.75rem;
        border: 1px solid var(--border);
        background: #fff;
        border-radius: 8px;
        display: flex; flex-direction: column;
        gap: 0.75rem;
        transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        position: relative;
        overflow: hidden;
    }
    .listing-item::before {
        content: ""; position: absolute; left: 0; top: 0; bottom: 0;
        width: 3px; background: var(--gold); opacity: 0.6;
        transition: opacity 0.2s, background 0.2s;
    }
    .listing-item:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 32px rgba(21, 36, 46, 0.09);
        border-color: transparent;
    }
    .listing-item:hover::before { background: var(--maroon); opacity: 1; }
    .listing-item .issue-badge {
        display: inline-block;
        font-size: 0.6875rem;
        text-transform: uppercase;
        letter-spacing: 0.11em;
        color: var(--maroon);
        font-weight: 800;
        align-self: flex-start;
    }
    .listing-item h2 {
        font-size: 1.1875rem;
        line-height: 1.35;
        margin: 0;
        font-weight: 700;
        letter-spacing: -0.01em;
    }
    .listing-item h2 a { color: var(--ink); text-decoration: none; }
    .listing-item h2 a:hover { color: var(--maroon); }
    .listing-item .authors {
        font-style: italic;
        color: var(--text);
        margin: 0;
        font-size: 0.9375rem;
    }
    .listing-item .abstract {
        color: var(--muted);
        font-size: 0.9375rem;
        margin: 0;
        line-height: 1.65;
        flex: 1;
    }
    .listing-item .read-more {
        margin-top: 0.375rem;
        color: var(--maroon);
        font-size: 0.8125rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        text-decoration: none;
        display: inline-flex; align-items: center; gap: 0.375rem;
    }
    .listing-item .read-more::after { content: "→"; transition: transform 0.2s; }
    .listing-item:hover .read-more::after { transform: translateX(4px); }

    /* Empty states */
    .empty {
        padding: 4rem 1.5rem;
        text-align: center;
        color: var(--muted);
        background: var(--panel-warm);
        border: 1px dashed var(--border);
        border-radius: 8px;
    }
    .empty h3 { margin: 0 0 0.5rem; color: var(--ink); font-weight: 700; font-size: 1.125rem; }
    .search-no-results {
        padding: 2.5rem 1.5rem;
        text-align: center;
        color: var(--muted);
        background: var(--panel-warm);
        border: 1px dashed var(--border);
        border-radius: 8px;
        display: none;
    }
    .search-no-results.is-visible { display: block; }
    .search-no-results strong {
        display: block;
        color: var(--maroon);
        font-size: 1.0625rem;
        margin-bottom: 0.375rem;
    }

    /* Footer */
    .site-footer {
        background: var(--panel-warm);
        border-top: 1px solid var(--border);
        padding: 1.75rem 2rem;
    }
    .footer-inner {
        max-width: 1400px; margin: 0 auto;
        display: flex; justify-content: space-between; align-items: center;
        flex-wrap: wrap; gap: 1rem;
    }
    .footer-inner .foot-brand { font-size: 0.75rem; color: var(--muted); letter-spacing: 0.05em; text-transform: uppercase; }
    .foot-credit { font-size: 0.75rem; color: var(--muted); margin: 0; }
    .foot-credit a { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
    .foot-credit a:hover { color: var(--maroon); }

    @media (max-width: 720px) {
        .page-hero { padding: 2.5rem 1.25rem 2rem; }
        .listing-section { padding: 2rem 1.25rem 3rem; }
        .articles-list { grid-template-columns: 1fr; }
        .top-nav a { padding: 0 1rem; font-size: 0.75rem; min-height: 52px; }
        .masthead-strip, .notice-bar { padding-left: 1.25rem; padding-right: 1.25rem; }
        .site-footer { padding: 1.5rem 1.25rem; }
    }
`;

export default async function handler(req, res) {
    const { data, error } = await supabase
        .from("articles")
        .select("slug, title, authors, abstract, journal_year, journal_issue, published_at, language, first_page, last_page")
        .eq("site", SITE)
        .eq("is_published", true)
        .order("published_at", { ascending: false });

    if (error) {
        res.status(500).send(`DB error: ${error.message}`);
        return;
    }

    const articles = data || [];

    const rows = articles.map((a) => {
        const authorList = Array.isArray(a.authors) ? a.authors.map((au) => au.name).filter(Boolean) : [];
        const authors = authorList.join(", ");
        const issue = [a.journal_year, a.journal_issue && `${a.journal_issue}-son`].filter(Boolean).join(" · ");
        const pages = a.first_page ? `${a.first_page}${a.last_page ? "–" + a.last_page : ""}-bet` : "";
        const meta = [issue, pages].filter(Boolean).join(" · ");
        return `<article class="listing-item" data-authors="${esc(authorList.join("|"))}">
            ${meta ? `<span class="issue-badge">${esc(meta)}</span>` : ""}
            <h2><a href="/maqola/${esc(encodeURIComponent(a.slug))}">${esc(a.title)}</a></h2>
            ${authors ? `<p class="authors">${esc(authors)}</p>` : ""}
            ${a.abstract ? `<p class="abstract">${esc(a.abstract.slice(0, 240))}${a.abstract.length > 240 ? "…" : ""}</p>` : ""}
            <a class="read-more" href="/maqola/${esc(encodeURIComponent(a.slug))}">O'qish</a>
        </article>`;
    }).join("\n");

    const uniqueAuthors = [...new Set(
        articles.flatMap((a) => Array.isArray(a.authors) ? a.authors.map((au) => au.name).filter(Boolean) : [])
    )].sort((a, b) => a.localeCompare(b, "uz"));
    const authorOptions = uniqueAuthors.map((name) => `<option value="${esc(name)}">${esc(name)}</option>`).join("");

    const html = `<!DOCTYPE html>
<html lang="uz">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maqolalar — ${esc(JOURNAL_TITLE_SHORT)}</title>
    <meta name="description" content="${esc(JOURNAL_TITLE)} — chop etilgan barcha ilmiy maqolalar. ISSN ${ISSN}.">
    <link rel="canonical" href="${SITE_ORIGIN}/maqola">
    <meta name="robots" content="index, follow">
    <link rel="icon" href="/assets/logo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>${STYLES}</style>
</head>
<body>
    <header class="masthead-strip">
        <div class="masthead-inner">
            <a href="/" class="brand">
                <img src="/assets/logo.png" alt="">
                <span>
                    <span class="brand-title">${esc(JOURNAL_TITLE_SHORT)}</span>
                    <span class="brand-sub">ISSN ${ISSN} · OAK ro'yxatida</span>
                </span>
            </a>
        </div>
    </header>

    <nav class="top-nav">
        <div class="top-nav-inner">
            <a href="/">Jurnal haqida</a>
            <a href="/#talablar">Talablar</a>
            <a href="/maqola" class="is-current">Maqolalar</a>
            <a href="/#arxiv">Arxiv</a>
            <a href="/#redkollegiya">Tahrir hay'ati</a>
        </div>
    </nav>

    <div class="notice-bar">
        <div class="notice-inner">Jurnal O'zbekiston Respublikasi OAK Rayosatining 2017-yil 29-noyabrdagi 245/6-sonli qarori bilan tavsiya etilgan ilmiy nashrlar ro'yxatiga kiritilgan.</div>
    </div>

    <section class="page-hero">
        <div class="hero-inner">
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <a href="/">Asosiy sahifa</a>
                <span class="sep">/</span>
                <strong>Maqolalar</strong>
            </nav>
            <div class="hero-eyebrow">Ilmiy nashr · ${articles.length} maqola</div>
            <h1 class="hero-title">Maqolalar</h1>
            <p class="hero-lead">${esc(JOURNAL_TITLE)} — chop etilgan barcha ilmiy maqolalar. Har bir maqola alohida sahifada, to'liq metama'lumot va PDF matn bilan.</p>
        </div>
    </section>

    <section class="listing-section">
        <div class="listing-inner">
            ${articles.length ? `
            <div class="search-bar" role="search">
                <input type="search" id="live-search" placeholder="Sarlavha, muallif yoki matn bo'yicha qidiring…" autocomplete="off" aria-label="Maqolalarni qidirish">
                <select id="author-filter" aria-label="Muallif bo'yicha filtrlash">
                    <option value="">Barcha mualliflar</option>
                    ${authorOptions}
                </select>
                <span class="search-count" id="search-count" aria-live="polite"></span>
            </div>
            <div class="articles-list" id="articles-list">${rows}</div>
            <div class="search-no-results" id="search-no-results" role="status">
                <strong>Hech narsa topilmadi</strong>
                <p style="margin: 0;">Boshqa so'z yoki muallifni tanlab ko'ring.</p>
            </div>
            <script>
                (function () {
                    var input = document.getElementById("live-search");
                    var authorSel = document.getElementById("author-filter");
                    var count = document.getElementById("search-count");
                    var empty = document.getElementById("search-no-results");
                    var items = Array.prototype.slice.call(document.querySelectorAll(".listing-item"));
                    var total = items.length;
                    function norm(s) { return (s || "").toLowerCase().trim(); }
                    function apply() {
                        var q = norm(input.value);
                        var a = authorSel.value;
                        var visible = 0;
                        items.forEach(function (item) {
                            var text = norm(item.textContent);
                            var authors = (item.getAttribute("data-authors") || "").split("|");
                            var matchesText = !q || text.indexOf(q) !== -1;
                            var matchesAuthor = !a || authors.indexOf(a) !== -1;
                            var ok = matchesText && matchesAuthor;
                            item.style.display = ok ? "" : "none";
                            if (ok) visible++;
                        });
                        count.textContent = (q || a) ? visible + " / " + total + " topildi" : total + " ta maqola";
                        empty.classList.toggle("is-visible", visible === 0 && (q || a));
                    }
                    input.addEventListener("input", apply);
                    authorSel.addEventListener("change", apply);
                    apply();
                })();
            </script>
            ` : `<div class="empty"><h3>Maqolalar hali qo'shilmagan</h3><p>Yangi sonlar tez orada shu yerda paydo bo'ladi.</p></div>`}
        </div>
    </section>

    <footer class="site-footer">
        <div class="footer-inner">
            <span class="foot-brand">© ${esc(PUBLISHER)}</span>
            <p class="foot-credit">Designed &amp; developed by <a href="https://teiior.uz" target="_blank" rel="noopener noreferrer">teiior</a></p>
        </div>
    </footer>
</body>
</html>`;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
    res.status(200).send(html);
}
