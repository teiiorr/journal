// Server-rendered listing of every published article — this is the page
// Google Scholar's crawler follows to discover /maqola/<slug> pages, since it
// does not execute the JS on /#maqolalar.

import { createClient } from "@supabase/supabase-js";

const SITE = "journal";
const SITE_ORIGIN = "https://uzsiac-bulletin.uz";
const JOURNAL_TITLE = "O'zbekiston davlat san'at va madaniyat instituti xabarlari";
const JOURNAL_TITLE_SHORT = "O'zDSMI xabarlari";

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
        --page-bg: #8ec0c6;
        --panel: #ffffff;
        --panel-warm: #fcfaf6;
        --muted: #5d6c78;
        --text: #28333c;
        --ink: #1b2128;
        --border: #dde2e6;
        --border-soft: #e9edef;
        --maroon: #9f2d31;
        --maroon-dark: #7f2024;
        --gold: #b9923f;
        --green: #7dad2f;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
        background: var(--page-bg);
        color: var(--text);
        font-family: "Montserrat", system-ui, -apple-system, "Segoe UI", sans-serif;
        line-height: 1.6;
        min-height: 100vh;
    }
    .site-shell {
        width: min(1360px, calc(100% - 36px));
        margin: 0 auto 44px;
        background: var(--panel);
        box-shadow: 0 16px 40px rgba(38, 58, 71, 0.14);
    }
    .masthead-strip {
        background: var(--panel-warm);
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 18px 32px;
        border-bottom: 1px solid var(--border-soft);
    }
    .masthead-strip img { width: 44px; height: 44px; object-fit: contain; }
    .masthead-strip .brand-text { display: flex; flex-direction: column; gap: 2px; }
    .masthead-strip .brand-title { font-weight: 800; font-size: 15px; color: var(--ink); letter-spacing: -0.005em; }
    .masthead-strip .brand-sub { font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); }
    .top-nav {
        display: flex;
        flex-wrap: wrap;
        background: rgba(150, 64, 82, 0.97);
    }
    .top-nav a {
        min-height: 62px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 28px;
        border-right: 1px solid rgba(255, 255, 255, 0.14);
        color: rgba(255, 255, 255, 0.9);
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        text-decoration: none;
        transition: background 0.25s, color 0.25s;
    }
    .top-nav a:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }
    .top-nav a.is-current { background: rgba(255, 255, 255, 0.14); color: #fff; }
    .notice-bar { background: var(--green); color: #fff; padding: 12px 32px; font-size: 13px; font-weight: 500; }

    .content {
        padding: 38px 42px 46px;
    }
    .breadcrumb {
        display: flex;
        flex-wrap: wrap;
        gap: 9px;
        font-size: 12.5px;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--muted);
        margin-bottom: 18px;
    }
    .breadcrumb a { color: var(--muted); text-decoration: none; }
    .breadcrumb a:hover { color: var(--maroon); }
    .breadcrumb strong { color: var(--maroon); font-weight: 800; }
    .content-header {
        padding-bottom: 22px;
        border-bottom: 2px solid var(--border-soft);
        margin-bottom: 26px;
    }
    h1.content-title {
        margin: 0 0 8px;
        font-size: clamp(30px, 3vw, 42px);
        line-height: 1.02;
        letter-spacing: -0.02em;
        color: var(--ink);
        font-weight: 800;
    }
    .content-lead { color: var(--muted); margin: 0; font-size: 15px; max-width: 68ch; }

    .articles-list { display: grid; gap: 18px; }
    .listing-item {
        padding: 22px 24px;
        border: 1px solid var(--border);
        border-left: 3px solid var(--gold);
        background: var(--panel-warm);
        border-radius: 4px;
        transition: transform 0.2s, border-left-color 0.2s, box-shadow 0.2s;
    }
    .listing-item:hover {
        transform: translateY(-2px);
        border-left-color: var(--maroon);
        box-shadow: 0 12px 30px rgba(21, 36, 46, 0.09);
    }
    .listing-item .issue-badge {
        display: inline-block;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--maroon);
        font-weight: 800;
        margin-bottom: 6px;
    }
    .listing-item h2 { font-size: 19px; line-height: 1.35; margin: 0 0 8px; font-weight: 700; }
    .listing-item h2 a { color: var(--ink); text-decoration: none; }
    .listing-item h2 a:hover { color: var(--maroon); text-decoration: underline; }
    .listing-item .authors { font-style: italic; color: var(--text); margin: 0 0 8px; font-size: 14px; }
    .listing-item .abstract { color: var(--muted); font-size: 14px; margin: 0; line-height: 1.55; }
    .empty { padding: 60px 20px; text-align: center; color: var(--muted); background: var(--panel-warm); border: 1px dashed var(--border); border-radius: 4px; }
    .empty h3 { margin: 0 0 6px; color: var(--ink); font-weight: 700; }

    .site-footer { margin-top: 26px; padding: 18px 42px 4px; }
    .foot-credit { font-size: 12px; letter-spacing: 0.04em; color: var(--muted); opacity: 0.75; margin: 0; }
    .foot-credit a { color: inherit; text-decoration: underline; text-underline-offset: 3px; }

    @media (max-width: 720px) {
        .content, .site-footer { padding-left: 22px; padding-right: 22px; }
        .top-nav a { padding: 0 18px; font-size: 12px; min-height: 54px; }
        .masthead-strip { padding: 14px 22px; }
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
        const authors = Array.isArray(a.authors) ? a.authors.map((au) => au.name).filter(Boolean).join(", ") : "";
        const issue = [a.journal_year, a.journal_issue && `${a.journal_issue}-son`].filter(Boolean).join(" · ");
        const pages = a.first_page ? `${a.first_page}${a.last_page ? "–" + a.last_page : ""}-bet` : "";
        const meta = [issue, pages].filter(Boolean).join(" · ");
        return `<article class="listing-item">
            ${meta ? `<span class="issue-badge">${esc(meta)}</span>` : ""}
            <h2><a href="/maqola/${esc(encodeURIComponent(a.slug))}">${esc(a.title)}</a></h2>
            ${authors ? `<p class="authors">${esc(authors)}</p>` : ""}
            ${a.abstract ? `<p class="abstract">${esc(a.abstract.slice(0, 260))}${a.abstract.length > 260 ? "…" : ""}</p>` : ""}
        </article>`;
    }).join("\n");

    const html = `<!DOCTYPE html>
<html lang="uz">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maqolalar — ${esc(JOURNAL_TITLE_SHORT)}</title>
    <meta name="description" content="${esc(JOURNAL_TITLE)} — chop etilgan barcha ilmiy maqolalar ro'yxati. ISSN 2181-8932.">
    <link rel="canonical" href="${SITE_ORIGIN}/maqola">
    <meta name="robots" content="index, follow">
    <link rel="icon" href="/assets/logo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>${STYLES}</style>
</head>
<body>
    <div class="site-shell">
        <header class="masthead-strip">
            <a href="/" style="display:flex;align-items:center;gap:14px;text-decoration:none;color:inherit;">
                <img src="/assets/logo.png" alt="">
                <span class="brand-text">
                    <span class="brand-title">${esc(JOURNAL_TITLE_SHORT)}</span>
                    <span class="brand-sub">ISSN 2181-8932 · OAK ro'yxatida</span>
                </span>
            </a>
        </header>

        <nav class="top-nav">
            <a href="/">Jurnal haqida</a>
            <a href="/#talablar">Talablar</a>
            <a href="/maqola" class="is-current">Maqolalar</a>
            <a href="/#arxiv">Arxiv</a>
            <a href="/#redkollegiya">Tahrir hay'ati</a>
        </nav>

        <div class="notice-bar">
            Jurnal O'zbekiston Respublikasi OAK Rayosatining 2017-yil 29-noyabrdagi 245/6-sonli qarori bilan tavsiya etilgan ilmiy nashrlar ro'yxatiga kiritilgan.
        </div>

        <main class="content">
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <a href="/">Asosiy sahifa</a>
                <span>/</span>
                <strong>Maqolalar</strong>
            </nav>

            <header class="content-header">
                <h1 class="content-title">Maqolalar</h1>
                <p class="content-lead">${esc(JOURNAL_TITLE)} — chop etilgan barcha ilmiy maqolalar. Har bir maqola alohida sahifada, to'liq metama'lumot va PDF matn bilan.</p>
            </header>

            ${articles.length
                ? `<div class="articles-list">${rows}</div>`
                : `<div class="empty"><h3>Maqolalar hali qo'shilmagan</h3><p>Yangi sonlar tez orada shu yerda paydo bo'ladi.</p></div>`}
        </main>

        <footer class="site-footer">
            <p class="foot-credit">Designed &amp; developed by <a href="https://teiior.uz" target="_blank" rel="noopener noreferrer">teiior</a></p>
        </footer>
    </div>
</body>
</html>`;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
    res.status(200).send(html);
}
