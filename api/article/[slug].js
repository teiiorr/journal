// Vercel Serverless Function: /api/article/[slug]
// Serves an HTML page with full Google Scholar / Highwire Press citation metadata
// so that Google Scholar can index the article. Bots don't run JS; the meta tags
// must be present in the initial response — that's why this is server-rendered.

import { createClient } from "@supabase/supabase-js";

const SITE = "journal";
const JOURNAL_TITLE = "O'zbekiston davlat san'at va madaniyat instituti xabarlari";
const JOURNAL_TITLE_SHORT = "O'zDSMI xabarlari";
const ISSN = "2181-8932";
const PUBLISHER = "O'zbekiston davlat san'at va madaniyat instituti";
const SITE_ORIGIN = "https://uzsiac-bulletin.uz";

const supabase = createClient(
    process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
);

function esc(s) {
    return String(s ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function pdfUrl(article) {
    if (article.pdf_url) return article.pdf_url;
    if (article.pdf_path) {
        const base = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "").replace(/\/+$/, "");
        return `${base}/storage/v1/object/public/article-pdfs/${article.pdf_path}`;
    }
    return null;
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
        line-height: 1.65;
        min-height: 100vh;
    }
    .site-shell {
        width: min(1160px, calc(100% - 36px));
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
    .masthead-strip a.brand { display: flex; align-items: center; gap: 14px; text-decoration: none; color: inherit; }
    .masthead-strip img { width: 44px; height: 44px; object-fit: contain; }
    .masthead-strip .brand-title { font-weight: 800; font-size: 15px; color: var(--ink); letter-spacing: -0.005em; }
    .masthead-strip .brand-sub { font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); display: block; margin-top: 2px; }
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

    .content { padding: 36px 42px 50px; }
    .breadcrumb {
        display: flex; flex-wrap: wrap; gap: 9px;
        font-size: 12.5px; font-weight: 600; letter-spacing: 0.04em;
        text-transform: uppercase; color: var(--muted); margin-bottom: 22px;
    }
    .breadcrumb a { color: var(--muted); text-decoration: none; }
    .breadcrumb a:hover { color: var(--maroon); }
    .breadcrumb strong { color: var(--maroon); font-weight: 800; }

    .article-header {
        padding-bottom: 26px;
        border-bottom: 2px solid var(--border-soft);
        margin-bottom: 28px;
    }
    .article-meta-strip {
        display: inline-block;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--maroon);
        font-weight: 800;
        margin-bottom: 10px;
    }
    h1.article-title {
        margin: 0 0 16px;
        font-size: clamp(24px, 2.6vw, 34px);
        line-height: 1.2;
        letter-spacing: -0.01em;
        color: var(--ink);
        font-weight: 800;
    }
    .article-rubric {
        display: inline-block;
        padding: 4px 12px;
        border: 1px solid var(--gold);
        color: var(--gold);
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-weight: 700;
        border-radius: 3px;
    }
    .article-authors {
        display: grid;
        gap: 12px;
        margin: 24px 0;
        padding: 20px 22px;
        background: var(--panel-warm);
        border-left: 3px solid var(--gold);
        border-radius: 3px;
    }
    .author { display: grid; gap: 4px; font-size: 14px; }
    .author strong { font-size: 15.5px; color: var(--ink); font-weight: 700; }
    .author span { color: var(--muted); font-style: italic; }
    .author a { color: var(--maroon); text-decoration: none; font-size: 13px; }
    .author a:hover { text-decoration: underline; }

    h2.section-title {
        font-size: 15px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--maroon);
        font-weight: 800;
        margin: 32px 0 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--border-soft);
    }

    .article-abstract p, .article-keywords p {
        color: var(--text);
        font-size: 15.5px;
        line-height: 1.75;
        margin: 0;
    }
    .article-keywords p { font-style: italic; color: var(--muted); }

    .article-doi { font-size: 14px; margin: 12px 0; color: var(--muted); }
    .article-doi a { color: var(--maroon); font-weight: 600; text-decoration: none; }
    .article-doi a:hover { text-decoration: underline; }

    .article-pdf {
        display: flex; align-items: center; gap: 14px;
        margin: 32px 0;
        padding: 22px 24px;
        background: linear-gradient(135deg, var(--maroon) 0%, var(--maroon-dark) 100%);
        border-radius: 4px;
        color: #fff;
    }
    .article-pdf .icon { font-size: 28px; }
    .article-pdf .txt { flex: 1; }
    .article-pdf .txt strong { display: block; font-size: 16px; font-weight: 700; }
    .article-pdf .txt small { display: block; font-size: 12.5px; opacity: 0.8; margin-top: 2px; }
    .article-pdf a.download {
        padding: 12px 22px;
        background: var(--gold);
        color: #1b2128;
        border-radius: 3px;
        text-decoration: none;
        font-weight: 700;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        transition: background 0.2s;
    }
    .article-pdf a.download:hover { background: #d0a44a; }

    .article-refs pre {
        white-space: pre-wrap; word-break: break-word;
        background: var(--panel-warm);
        border: 1px solid var(--border);
        padding: 18px 20px;
        border-radius: 3px;
        font-family: "Georgia", "Times New Roman", serif;
        font-size: 13.5px;
        line-height: 1.7;
        color: var(--text);
    }

    .site-footer { margin-top: 26px; padding: 18px 42px 4px; }
    .foot-credit { font-size: 12px; letter-spacing: 0.04em; color: var(--muted); opacity: 0.75; margin: 0; }
    .foot-credit a { color: inherit; text-decoration: underline; text-underline-offset: 3px; }

    @media (max-width: 720px) {
        .content, .site-footer { padding-left: 22px; padding-right: 22px; }
        .top-nav a { padding: 0 18px; font-size: 12px; min-height: 54px; }
        .masthead-strip { padding: 14px 22px; }
        .article-pdf { flex-direction: column; align-items: flex-start; }
    }
`;

function renderHtml(article) {
    const authors = Array.isArray(article.authors) ? article.authors : [];
    const authorNames = authors.map((a) => a.name).filter(Boolean);
    const authorMeta = authorNames.map((n) => `    <meta name="citation_author" content="${esc(n)}">`).join("\n");
    const orcidMeta = authors
        .filter((a) => a.orcid)
        .map((a) => `    <meta name="citation_author_orcid" content="${esc(a.orcid)}">`)
        .join("\n");
    const affMeta = authors
        .filter((a) => a.affiliation)
        .map((a) => `    <meta name="citation_author_institution" content="${esc(a.affiliation)}">`)
        .join("\n");

    const canonical = `${SITE_ORIGIN}/maqola/${encodeURIComponent(article.slug)}`;
    const pubDate = article.published_at ? new Date(article.published_at).toISOString().slice(0, 10) : (article.journal_year ? String(article.journal_year) : "");
    const pdfHref = pdfUrl(article);

    const doiMeta = article.doi ? `    <meta name="citation_doi" content="${esc(article.doi)}">` : "";
    const pagesMeta = [
        article.first_page ? `    <meta name="citation_firstpage" content="${article.first_page}">` : "",
        article.last_page ? `    <meta name="citation_lastpage" content="${article.last_page}">` : ""
    ].filter(Boolean).join("\n");
    const issueMeta = article.journal_issue ? `    <meta name="citation_issue" content="${article.journal_issue}">` : "";
    const volumeMeta = article.journal_year ? `    <meta name="citation_volume" content="${article.journal_year}">` : "";
    const keywordsMeta = Array.isArray(article.keywords) && article.keywords.length
        ? `    <meta name="citation_keywords" content="${esc(article.keywords.join("; "))}">`
        : "";
    const pdfMeta = pdfHref ? `    <meta name="citation_pdf_url" content="${esc(pdfHref)}">` : "";

    const metaStrip = [
        article.journal_year && `${article.journal_year}`,
        article.journal_issue && `${article.journal_issue}-son`,
        article.first_page && `${article.first_page}${article.last_page ? "–" + article.last_page : ""}-bet`
    ].filter(Boolean).join(" · ");

    const authorsBlock = authors.length
        ? `<section class="article-authors">${authors.map((a) => `
            <div class="author">
                <strong>${esc(a.name)}</strong>
                ${a.affiliation ? `<span>${esc(a.affiliation)}</span>` : ""}
                ${a.orcid ? `<a href="https://orcid.org/${esc(a.orcid)}" target="_blank" rel="noopener">ORCID: ${esc(a.orcid)}</a>` : ""}
                ${a.email ? `<a href="mailto:${esc(a.email)}">${esc(a.email)}</a>` : ""}
            </div>`).join("")}</section>`
        : "";

    const abstractHtml = article.abstract
        ? `<section class="article-abstract"><h2 class="section-title">Annotatsiya</h2><p>${esc(article.abstract)}</p></section>`
        : "";
    const keywordsHtml = Array.isArray(article.keywords) && article.keywords.length
        ? `<section class="article-keywords"><h2 class="section-title">Kalit so'zlar</h2><p>${esc(article.keywords.join(", "))}</p></section>`
        : "";
    const refsHtml = article.references_list
        ? `<section class="article-refs"><h2 class="section-title">Foydalanilgan adabiyotlar</h2><pre>${esc(article.references_list)}</pre></section>`
        : "";

    const doiHtml = article.doi
        ? `<p class="article-doi"><strong>DOI:</strong> <a href="https://doi.org/${esc(article.doi)}" target="_blank" rel="noopener">${esc(article.doi)}</a></p>`
        : "";

    const pdfBlock = pdfHref ? `
        <div class="article-pdf">
            <span class="icon" aria-hidden="true">📄</span>
            <div class="txt">
                <strong>To'liq matn PDF formatda</strong>
                <small>Yangi oynada ochiladi</small>
            </div>
            <a class="download" href="${esc(pdfHref)}" target="_blank" rel="noopener">PDF ochish</a>
        </div>` : "";

    return `<!DOCTYPE html>
<html lang="${esc(article.language || "uz")}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(article.title)} — ${esc(JOURNAL_TITLE_SHORT)}</title>
    <meta name="description" content="${esc((article.abstract || article.title || "").slice(0, 200))}">
    <link rel="canonical" href="${esc(canonical)}">

    <!-- Google Scholar / Highwire Press citation metadata -->
    <meta name="citation_journal_title" content="${esc(JOURNAL_TITLE)}">
    <meta name="citation_journal_abbrev" content="${esc(JOURNAL_TITLE_SHORT)}">
    <meta name="citation_publisher" content="${esc(PUBLISHER)}">
    <meta name="citation_issn" content="${ISSN}">
    <meta name="citation_title" content="${esc(article.title)}">
${authorMeta}
${orcidMeta}
${affMeta}
    <meta name="citation_publication_date" content="${esc(pubDate)}">
    <meta name="citation_date" content="${esc(pubDate)}">
    <meta name="citation_language" content="${esc(article.language || "uz")}">
    <meta name="citation_abstract_html_url" content="${esc(canonical)}">
${pdfMeta}
${doiMeta}
${volumeMeta}
${issueMeta}
${pagesMeta}
${keywordsMeta}

    <!-- Dublin Core -->
    <meta name="DC.title" content="${esc(article.title)}">
    <meta name="DC.creator" content="${esc(authorNames.join("; "))}">
    <meta name="DC.publisher" content="${esc(PUBLISHER)}">
    <meta name="DC.language" content="${esc(article.language || "uz")}">
    <meta name="DC.identifier" content="${esc(canonical)}">

    <meta property="og:type" content="article">
    <meta property="og:title" content="${esc(article.title)}">
    <meta property="og:description" content="${esc((article.abstract || "").slice(0, 200))}">
    <meta property="og:url" content="${esc(canonical)}">

    <link rel="icon" href="/assets/logo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>${STYLES}</style>
</head>
<body>
    <div class="site-shell">
        <header class="masthead-strip">
            <a href="/" class="brand">
                <img src="/assets/logo.png" alt="">
                <span>
                    <span class="brand-title">${esc(JOURNAL_TITLE_SHORT)}</span>
                    <span class="brand-sub">ISSN ${ISSN} · OAK ro'yxatida</span>
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

        <main class="content">
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <a href="/">Asosiy sahifa</a>
                <span>/</span>
                <a href="/maqola">Maqolalar</a>
                <span>/</span>
                <strong>Maqola</strong>
            </nav>

            <header class="article-header">
                ${metaStrip ? `<span class="article-meta-strip">${esc(metaStrip)}</span>` : ""}
                <h1 class="article-title">${esc(article.title)}</h1>
                ${article.rubric ? `<span class="article-rubric">${esc(article.rubric)}</span>` : ""}
            </header>

            ${authorsBlock}
            ${doiHtml}
            ${abstractHtml}
            ${keywordsHtml}
            ${pdfBlock}
            ${refsHtml}
        </main>

        <footer class="site-footer">
            <p class="foot-credit">Designed &amp; developed by <a href="https://teiior.uz" target="_blank" rel="noopener noreferrer">teiior</a></p>
        </footer>
    </div>
</body>
</html>`;
}

export default async function handler(req, res) {
    const { slug } = req.query;
    if (!slug) {
        res.status(400).send("slug required");
        return;
    }

    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("site", SITE)
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

    if (error) {
        res.status(500).send(`DB error: ${error.message}`);
        return;
    }
    if (!data) {
        res.status(404).setHeader("Content-Type", "text/html; charset=utf-8").send(
            `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Maqola topilmadi — ${JOURNAL_TITLE_SHORT}</title></head><body style="font-family:Montserrat,system-ui;max-width:600px;margin:60px auto;padding:24px;text-align:center;background:#8ec0c6;"><div style="background:#fff;padding:40px;border-radius:4px;"><h1 style="color:#9f2d31;">Maqola topilmadi</h1><p><a href="/maqola" style="color:#9f2d31;">Barcha maqolalar</a> · <a href="/" style="color:#9f2d31;">Bosh sahifa</a></p></div></body></html>`
        );
        return;
    }

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
    res.status(200).send(renderHtml(data));
}
