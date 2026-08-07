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
        line-height: 1.7;
        font-size: 17px;
        -webkit-font-smoothing: antialiased;
    }

    /* ==== Full-width chrome ==== */
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
    .top-nav-inner {
        max-width: 1400px; margin: 0 auto;
        display: flex; flex-wrap: wrap;
    }
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

    /* ==== Article page ==== */
    .article-cover {
        padding: 4rem 2rem 3rem;
        background: linear-gradient(180deg, var(--panel-warm) 0%, var(--panel) 100%);
        border-bottom: 1px solid var(--border-soft);
    }
    .article-cover-inner {
        max-width: 820px;
        margin: 0 auto;
    }
    .breadcrumb {
        display: flex; flex-wrap: wrap; gap: 0.5rem;
        font-size: 0.75rem; font-weight: 700;
        letter-spacing: 0.09em; text-transform: uppercase;
        color: var(--muted); margin-bottom: 1.5rem;
    }
    .breadcrumb a { color: var(--muted); text-decoration: none; transition: color 0.15s; }
    .breadcrumb a:hover { color: var(--maroon); }
    .breadcrumb strong { color: var(--maroon); }
    .breadcrumb span.sep { opacity: 0.4; }

    .meta-line {
        display: flex; flex-wrap: wrap; gap: 0.75rem;
        font-size: 0.75rem; font-weight: 800;
        letter-spacing: 0.1em; text-transform: uppercase;
        color: var(--maroon); margin-bottom: 1.25rem;
    }
    .meta-line .dot { color: var(--gold); }

    h1.article-title {
        font-family: "Montserrat", system-ui, sans-serif;
        font-size: clamp(1.75rem, 3.4vw, 2.75rem);
        line-height: 1.15;
        margin: 0 0 1.25rem;
        color: var(--ink);
        font-weight: 800;
        letter-spacing: -0.02em;
    }
    .rubric-tag {
        display: inline-block;
        padding: 0.375rem 0.875rem;
        border: 1.5px solid var(--gold);
        color: var(--gold-dark);
        font-size: 0.6875rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        border-radius: 2px;
    }

    .article-body {
        padding: 3rem 2rem 4rem;
        max-width: 820px;
        margin: 0 auto;
    }

    /* Authors */
    .article-authors {
        display: grid; gap: 1.125rem;
        margin: 0 0 2.5rem;
        padding: 1.75rem 2rem;
        background: var(--panel-soft);
        border-left: 4px solid var(--gold);
        border-radius: 4px;
    }
    .author { display: grid; gap: 0.25rem; }
    .author strong {
        font-size: 1.0625rem;
        color: var(--ink);
        font-weight: 700;
        letter-spacing: -0.005em;
    }
    .author span {
        color: var(--muted);
        font-style: italic;
        font-size: 0.9375rem;
    }
    .author a {
        color: var(--maroon);
        text-decoration: none;
        font-size: 0.875rem;
        font-weight: 500;
        display: inline-block;
        margin-top: 0.125rem;
    }
    .author a:hover { text-decoration: underline; text-underline-offset: 3px; }

    h2.section-title {
        font-size: 0.875rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--maroon);
        font-weight: 800;
        margin: 2.75rem 0 1rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid var(--border-soft);
    }

    .article-abstract p,
    .article-keywords p {
        color: var(--text);
        font-size: 1.0625rem;
        line-height: 1.85;
        margin: 0;
    }
    .article-keywords p {
        font-style: italic;
        color: #4a5560;
        padding: 0.875rem 1.25rem;
        background: var(--panel-warm);
        border-radius: 4px;
    }

    .article-doi {
        font-size: 0.9375rem;
        margin: 1rem 0 0;
        color: var(--muted);
        padding: 0.875rem 1.125rem;
        background: var(--panel-warm);
        border-radius: 4px;
        border-left: 3px solid var(--maroon-soft);
    }
    .article-doi strong { color: var(--ink); }
    .article-doi a { color: var(--maroon); font-weight: 600; text-decoration: none; }
    .article-doi a:hover { text-decoration: underline; }

    /* PDF hero */
    .article-pdf {
        display: flex; align-items: center; gap: 1.25rem;
        margin: 3rem 0;
        padding: 1.75rem 2rem;
        background:
            radial-gradient(circle at 15% 20%, rgba(255,255,255,0.08), transparent 50%),
            linear-gradient(135deg, var(--maroon) 0%, var(--maroon-dark) 100%);
        border-radius: 8px;
        color: #fff;
        box-shadow: 0 12px 32px rgba(159, 45, 49, 0.18);
    }
    .article-pdf .icon {
        font-size: 2rem;
        width: 3rem; height: 3rem;
        display: grid; place-items: center;
        background: rgba(255, 255, 255, 0.12);
        border-radius: 8px;
    }
    .article-pdf .txt { flex: 1; }
    .article-pdf .txt strong {
        display: block;
        font-size: 1.0625rem;
        font-weight: 700;
        letter-spacing: -0.005em;
    }
    .article-pdf .txt small {
        display: block;
        font-size: 0.8125rem;
        opacity: 0.85;
        margin-top: 0.25rem;
    }
    .article-pdf a.download {
        padding: 0.75rem 1.375rem;
        background: var(--gold);
        color: var(--ink);
        border-radius: 4px;
        text-decoration: none;
        font-weight: 700;
        font-size: 0.8125rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        transition: background 0.2s, transform 0.15s;
        white-space: nowrap;
    }
    .article-pdf a.download:hover { background: #d0a44a; transform: translateY(-1px); }

    /* References */
    .article-refs pre {
        white-space: pre-wrap; word-break: break-word;
        background: var(--panel-warm);
        border: 1px solid var(--border-soft);
        padding: 1.5rem 1.75rem;
        border-radius: 4px;
        font-family: "Georgia", "Times New Roman", serif;
        font-size: 0.9375rem;
        line-height: 1.85;
        color: var(--text);
        margin: 0;
    }

    /* Footer */
    .site-footer {
        background: var(--panel-warm);
        border-top: 1px solid var(--border);
        padding: 1.75rem 2rem;
        margin-top: 2rem;
    }
    .footer-inner {
        max-width: 1400px; margin: 0 auto;
        display: flex; justify-content: space-between; align-items: center;
        flex-wrap: wrap; gap: 1rem;
    }
    .footer-inner .foot-brand { font-size: 0.75rem; color: var(--muted); letter-spacing: 0.05em; text-transform: uppercase; }
    .foot-credit { font-size: 0.75rem; color: var(--muted); margin: 0; letter-spacing: 0.04em; }
    .foot-credit a { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
    .foot-credit a:hover { color: var(--maroon); }

    @media (max-width: 720px) {
        body { font-size: 16px; }
        .article-cover { padding: 2.5rem 1.25rem 2rem; }
        .article-body { padding: 2rem 1.25rem 3rem; }
        .article-pdf { flex-direction: column; align-items: flex-start; padding: 1.5rem; }
        .article-authors { padding: 1.25rem 1.5rem; }
        .top-nav a { padding: 0 1rem; font-size: 0.75rem; min-height: 52px; }
        .masthead-strip { padding: 0.875rem 1.25rem; }
        .site-footer { padding: 1.5rem 1.25rem; }
    }
`;

function renderHtml(article) {
    const authors = Array.isArray(article.authors) ? article.authors : [];
    const authorNames = authors.map((a) => a.name).filter(Boolean);
    const authorMeta = authorNames.map((n) => `    <meta name="citation_author" content="${esc(n)}">`).join("\n");
    const orcidMeta = authors.filter((a) => a.orcid)
        .map((a) => `    <meta name="citation_author_orcid" content="${esc(a.orcid)}">`).join("\n");
    const affMeta = authors.filter((a) => a.affiliation)
        .map((a) => `    <meta name="citation_author_institution" content="${esc(a.affiliation)}">`).join("\n");

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

    const metaParts = [
        article.journal_year && `${article.journal_year}`,
        article.journal_issue && `${article.journal_issue}-son`,
        article.first_page && `${article.first_page}${article.last_page ? "–" + article.last_page : ""}-bet`
    ].filter(Boolean);
    const metaLine = metaParts.length
        ? metaParts.map((p, i) => i > 0 ? `<span class="dot">·</span> ${esc(p)}` : esc(p)).join(" ")
        : "";

    const authorsBlock = authors.length
        ? `<section class="article-authors">${authors.map((a) => `
            <div class="author">
                <strong>${esc(a.name)}</strong>
                ${a.affiliation ? `<span>${esc(a.affiliation)}</span>` : ""}
                ${a.orcid ? `<a href="https://orcid.org/${esc(a.orcid)}" target="_blank" rel="noopener">ORCID: ${esc(a.orcid)}</a>` : ""}
                ${a.email ? `<a href="mailto:${esc(a.email)}">${esc(a.email)}</a>` : ""}
            </div>`).join("")}</section>` : "";

    const abstractHtml = article.abstract
        ? `<section class="article-abstract"><h2 class="section-title">Annotatsiya</h2><p>${esc(article.abstract)}</p></section>` : "";
    const keywordsHtml = Array.isArray(article.keywords) && article.keywords.length
        ? `<section class="article-keywords"><h2 class="section-title">Kalit so'zlar</h2><p>${esc(article.keywords.join(" · "))}</p></section>` : "";
    const refsHtml = article.references_list
        ? `<section class="article-refs"><h2 class="section-title">Foydalanilgan adabiyotlar</h2><pre>${esc(article.references_list)}</pre></section>` : "";
    const doiHtml = article.doi
        ? `<p class="article-doi"><strong>DOI:</strong> <a href="https://doi.org/${esc(article.doi)}" target="_blank" rel="noopener">${esc(article.doi)}</a></p>` : "";
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

    <section class="article-cover">
        <div class="article-cover-inner">
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <a href="/">Asosiy sahifa</a>
                <span class="sep">/</span>
                <a href="/maqola">Maqolalar</a>
                <span class="sep">/</span>
                <strong>Maqola</strong>
            </nav>
            ${metaLine ? `<div class="meta-line">${metaLine}</div>` : ""}
            <h1 class="article-title">${esc(article.title)}</h1>
            ${article.rubric ? `<span class="rubric-tag">${esc(article.rubric)}</span>` : ""}
        </div>
    </section>

    <main class="article-body">
        ${authorsBlock}
        ${doiHtml}
        ${abstractHtml}
        ${keywordsHtml}
        ${pdfBlock}
        ${refsHtml}
    </main>

    <footer class="site-footer">
        <div class="footer-inner">
            <span class="foot-brand">© ${esc(PUBLISHER)}</span>
            <p class="foot-credit">Designed &amp; developed by <a href="https://teiior.uz" target="_blank" rel="noopener noreferrer">teiior</a></p>
        </div>
    </footer>
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
            `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Maqola topilmadi — ${JOURNAL_TITLE_SHORT}</title></head><body style="font-family:Montserrat,system-ui;max-width:600px;margin:60px auto;padding:24px;text-align:center;"><h1 style="color:#9f2d31;">Maqola topilmadi</h1><p><a href="/maqola" style="color:#9f2d31;">Barcha maqolalar</a> · <a href="/" style="color:#9f2d31;">Bosh sahifa</a></p></body></html>`
        );
        return;
    }

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
    res.status(200).send(renderHtml(data));
}
