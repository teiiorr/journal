const navButtons = document.querySelectorAll(".nav-button");
const panels = document.querySelectorAll(".tab-panel");
const breadcrumbCurrent = document.getElementById("breadcrumb-current");
const mobileNavToggle = document.getElementById("mobile-nav-toggle");
const sidebar = document.getElementById("sidebar");
const pageJumpForm = document.getElementById("page-jump-form");
const pageInput = document.getElementById("page-input");
const journalViewer = document.querySelector(".journal-viewer");
const viewModeButtons = document.querySelectorAll("[data-view-mode]");
const journalPageCounter = document.getElementById("journal-page-counter");
const journalNavButtons = document.querySelectorAll("[data-journal-nav]");
const journalStatus = document.getElementById("journal-status");
const bookShell = document.getElementById("book-shell");
const bookSpread = document.getElementById("book-spread");
const leftCanvas = document.getElementById("left-page-canvas");
const rightCanvas = document.getElementById("right-page-canvas");
const leftEmpty = document.getElementById("left-page-empty");
const rightEmpty = document.getElementById("right-page-empty");
const leftPageNumber = document.getElementById("left-page-number");
const rightPageNumber = document.getElementById("right-page-number");
const fullscreenToggle = document.getElementById("fullscreen-toggle");
const fullscreenExit = document.getElementById("fullscreen-exit");
const fullscreenPageCounter = document.getElementById("fullscreen-page-counter");
const fullscreenPageSlider = document.getElementById("fullscreen-page-slider");
const readerToneButtons = document.querySelectorAll("[data-reader-tone]");
const languageButtons = document.querySelectorAll("[data-lang]");
const languageShortLinks = document.querySelectorAll("[data-lang-short]");

const PDF_URL = "/assets/journal/4-son-2025.pdf";
const PDF_PAGE_WIDTH = 595.276;
const PDF_PAGE_HEIGHT = 841.89;

const translations = {
    uz: {
        htmlLang: "uz",
        pageTitle: "O'zDSMI",
        heroSubtitle: "",
        heroTitle: "Tadqiqotlar, maqolalar va ilmiy muloqot uchun zamonaviy jurnal makoni",
        heroDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        noticeText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        statFrequency: "son / yil",
        statArticles: "maqola / son",
        statReviewers: "ekspert",
        navAbout: "Jurnal haqida",
        navRequirements: "Talablar",
        navArchive: "Arxiv",
        navEditorial: "Redkollegiya",
        breadcrumbHome: "Asosiy sahifa",
        breadcrumbJournal: "Jurnal",
        contentCaption: "Jurnal sahifasi",
        aboutTitle: "Jurnal faoliyati va maqsadi",
        aboutIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        aboutCopyOne: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        aboutCopyTwo: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        periodicity: "Davriyligi",
        periodicityValue: "Lorem ipsum dolor sit amet",
        languages: "Tillar",
        languagesValue: "Lorem ipsum dolor sit amet",
        format: "Nashr formati",
        formatValue: "Lorem ipsum dolor sit amet",
        founder: "Muassis",
        founderValue: "Akademik nashrlar markazi",
        date: "Nashr sanasi",
        dateValue: "1998-yildan beri",
        directions: "Yo'nalishlar",
        directionsValue: "Ijtimoiy, tabiiy va amaliy fanlar",
        journal: "Jurnal",
        viewerTitle: "So'nggi sonni ko'rish",
        viewerIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fullscreen: "To'liq ekran",
        exitFullscreen: "Oddiy ekran",
        singlePage: "1 sahifa",
        twoPages: "2 sahifa",
        page: "Sahifa",
        open: "Ochish",
        pdfLoading: "PDF yuklanmoqda...",
        pdfLibraryError: "PDF kutubxonasi yuklanmadi",
        pdfOpenError: "PDF faylni ochib bo'lmadi",
        pdfRenderError: "PDF ochilmadi",
        emptyPage: "Bo'sh sahifa",
        openPdf: "PDF ochish",
        softMode: "Yumshoq",
        darkMode: "Tungi",
        requirementsTitle: "Mualliflar uchun asosiy talablar",
        requirementsIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        reqOne: "1. Matn hajmi",
        reqOneDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqTwo: "2. Tuzilishi",
        reqTwoDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqThree: "3. Til talabi",
        reqThreeDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqFour: "4. Format",
        reqFourDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqPointOne: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqPointTwo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqPointThree: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqPointFour: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        archiveTitle: "Jurnal arxivi",
        archiveIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        archiveIssueA: "1-son",
        archiveItemA1: "Lorem ipsum dolor sit amet",
        archiveItemA2: "Lorem ipsum dolor sit amet",
        archiveIssueB: "4-son",
        archiveItemB1: "Lorem ipsum dolor sit amet",
        archiveItemB2: "Lorem ipsum dolor sit amet",
        archiveIssueC: "3-son",
        archiveItemC1: "Lorem ipsum dolor sit amet",
        archiveItemC2: "Lorem ipsum dolor sit amet",
        editorialTitle: "Redkollegiya tarkibi",
        editorialIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        chiefEditor: "Bosh muharrir",
        deputyEditor: "Muharrir o'rinbosari",
        secretary: "Mas'ul kotib",
        technicalEditor: "Texnik muharrir",
        editorOne: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        editorTwo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        editorThree: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        editorFour: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        sideCurrentIssue: "Joriy son",
        sideIssueText: "Lorem ipsum dolor sit amet",
        sideIssueDate: "Lorem ipsum dolor sit amet",
        sideIssueArticles: "Lorem ipsum dolor sit amet",
        sideIssueTheme: "Lorem ipsum dolor sit amet",
        sideSubmission: "Maqola yuborish",
        sideSubmissionText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        sideLinks: "Tezkor havolalar",
        sideContacts: "Aloqa",
        sideAddress: "Lorem ipsum dolor sit amet"
    },
    ru: {
        htmlLang: "ru",
        pageTitle: "O'zDSMI",
        heroSubtitle: "",
        heroTitle: "Современное журнальное пространство для исследований, статей и научного диалога",
        heroDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        noticeText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        statFrequency: "выпуска / год",
        statArticles: "статей / выпуск",
        statReviewers: "экспертов",
        navAbout: "О журнале",
        navRequirements: "Требования",
        navArchive: "Архив",
        navEditorial: "Редколлегия",
        breadcrumbHome: "Главная",
        breadcrumbJournal: "Журнал",
        contentCaption: "Страница журнала",
        aboutTitle: "Деятельность и цель журнала",
        aboutIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        aboutCopyOne: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        aboutCopyTwo: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        periodicity: "Периодичность",
        periodicityValue: "Ежеквартально",
        languages: "Языки",
        languagesValue: "Узбекский, русский, английский",
        format: "Формат издания",
        formatValue: "Электронный PDF и веб-архив",
        founder: "Учредитель",
        founderValue: "Центр академических изданий",
        date: "Дата издания",
        dateValue: "С 1998 года",
        directions: "Направления",
        directionsValue: "Социальные, естественные и прикладные науки",
        journal: "Журнал",
        viewerTitle: "Просмотр последнего выпуска",
        viewerIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fullscreen: "Полный экран",
        exitFullscreen: "Обычный экран",
        singlePage: "1 страница",
        twoPages: "2 страницы",
        page: "Страница",
        open: "Открыть",
        pdfLoading: "PDF загружается...",
        pdfLibraryError: "PDF-библиотека не загрузилась",
        pdfOpenError: "Не удалось открыть PDF-файл",
        pdfRenderError: "PDF не открылся",
        emptyPage: "Пустая страница",
        openPdf: "Открыть PDF",
        softMode: "Мягкий",
        darkMode: "Ночной",
        requirementsTitle: "Основные требования для авторов",
        requirementsIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        reqOne: "1. Объём текста",
        reqOneDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqTwo: "2. Структура",
        reqTwoDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqThree: "3. Языковое требование",
        reqThreeDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqFour: "4. Формат",
        reqFourDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqPointOne: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqPointTwo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqPointThree: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqPointFour: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        archiveTitle: "Архив журнала",
        archiveIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        archiveIssueA: "Выпуск 1",
        archiveItemA1: "Lorem ipsum dolor sit amet",
        archiveItemA2: "Lorem ipsum dolor sit amet",
        archiveIssueB: "Выпуск 4",
        archiveItemB1: "Lorem ipsum dolor sit amet",
        archiveItemB2: "Lorem ipsum dolor sit amet",
        archiveIssueC: "Выпуск 3",
        archiveItemC1: "Lorem ipsum dolor sit amet",
        archiveItemC2: "Lorem ipsum dolor sit amet",
        editorialTitle: "Состав редколлегии",
        editorialIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        chiefEditor: "Главный редактор",
        deputyEditor: "Заместитель редактора",
        secretary: "Ответственный секретарь",
        technicalEditor: "Технический редактор",
        editorOne: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        editorTwo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        editorThree: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        editorFour: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        sideCurrentIssue: "Текущий выпуск",
        sideIssueText: "Lorem ipsum dolor sit amet",
        sideIssueDate: "Lorem ipsum dolor sit amet",
        sideIssueArticles: "Lorem ipsum dolor sit amet",
        sideIssueTheme: "Lorem ipsum dolor sit amet",
        sideSubmission: "Отправить статью",
        sideSubmissionText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        sideLinks: "Быстрые ссылки",
        sideContacts: "Контакты",
        sideAddress: "Lorem ipsum dolor sit amet"
    },
    en: {
        htmlLang: "en",
        pageTitle: "O'zDSMI",
        heroSubtitle: "",
        heroTitle: "A modern journal space for research, articles and scientific dialogue",
        heroDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        noticeText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        statFrequency: "issues / year",
        statArticles: "articles / issue",
        statReviewers: "reviewers",
        navAbout: "About Journal",
        navRequirements: "Requirements",
        navArchive: "Archive",
        navEditorial: "Editorial Board",
        breadcrumbHome: "Home",
        breadcrumbJournal: "Journal",
        contentCaption: "Journal page",
        aboutTitle: "Journal activity and purpose",
        aboutIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        aboutCopyOne: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        aboutCopyTwo: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        periodicity: "Periodicity",
        periodicityValue: "Quarterly",
        languages: "Languages",
        languagesValue: "Uzbek, Russian, English",
        format: "Publication format",
        formatValue: "Electronic PDF and web archive",
        founder: "Founder",
        founderValue: "Academic Publications Center",
        date: "Publication date",
        dateValue: "Since 1998",
        directions: "Scope",
        directionsValue: "Social, natural and applied sciences",
        journal: "Journal",
        viewerTitle: "View the latest issue",
        viewerIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fullscreen: "Fullscreen",
        exitFullscreen: "Exit fullscreen",
        singlePage: "1 page",
        twoPages: "2 pages",
        page: "Page",
        open: "Open",
        pdfLoading: "PDF loading...",
        pdfLibraryError: "PDF library failed to load",
        pdfOpenError: "Could not open PDF file",
        pdfRenderError: "PDF could not be opened",
        emptyPage: "Empty page",
        openPdf: "Open PDF",
        softMode: "Soft",
        darkMode: "Night",
        requirementsTitle: "Main requirements for authors",
        requirementsIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        reqOne: "1. Text length",
        reqOneDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqTwo: "2. Structure",
        reqTwoDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqThree: "3. Language requirement",
        reqThreeDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqFour: "4. Format",
        reqFourDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqPointOne: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqPointTwo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqPointThree: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        reqPointFour: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        archiveTitle: "Journal archive",
        archiveIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        archiveIssueA: "Issue 1",
        archiveItemA1: "Lorem ipsum dolor sit amet",
        archiveItemA2: "Lorem ipsum dolor sit amet",
        archiveIssueB: "Issue 4",
        archiveItemB1: "Lorem ipsum dolor sit amet",
        archiveItemB2: "Lorem ipsum dolor sit amet",
        archiveIssueC: "Issue 3",
        archiveItemC1: "Lorem ipsum dolor sit amet",
        archiveItemC2: "Lorem ipsum dolor sit amet",
        editorialTitle: "Editorial board",
        editorialIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        chiefEditor: "Editor-in-Chief",
        deputyEditor: "Deputy Editor",
        secretary: "Executive Secretary",
        technicalEditor: "Technical Editor",
        editorOne: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        editorTwo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        editorThree: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        editorFour: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        sideCurrentIssue: "Current issue",
        sideIssueText: "Lorem ipsum dolor sit amet",
        sideIssueDate: "Lorem ipsum dolor sit amet",
        sideIssueArticles: "Lorem ipsum dolor sit amet",
        sideIssueTheme: "Lorem ipsum dolor sit amet",
        sideSubmission: "Submit article",
        sideSubmissionText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        sideLinks: "Quick links",
        sideContacts: "Contact",
        sideAddress: "Lorem ipsum dolor sit amet"
    }
};

let pdfDoc = null;
let totalPages = 0;
let spreadStart = 1;
let isRendering = false;
let queuedSpread = null;
let currentViewMode = window.innerWidth <= 780 ? "single" : "spread";
let currentLanguage = localStorage.getItem("journalLanguage") || "uz";
let readerTone = "normal";
let scrollPositionBeforeFullscreen = 0;

function t(key) {
    return translations[currentLanguage]?.[key] || translations.uz[key] || key;
}

function getCurrentPanel() {
    return document.querySelector(".tab-panel.active") || document.getElementById("jurnal-haqida");
}

function updateBreadcrumb() {
    const currentPanel = getCurrentPanel();
    const labelKey = currentPanel?.dataset.labelKey || "navAbout";
    breadcrumbCurrent.textContent = t(labelKey);
}

function setLanguage(language) {
    currentLanguage = translations[language] ? language : "uz";
    localStorage.setItem("journalLanguage", currentLanguage);
    document.documentElement.lang = t("htmlLang");
    document.title = t("pageTitle");

    document.querySelectorAll("[data-i18n]").forEach((node) => {
        node.textContent = t(node.dataset.i18n);
    });

    panels.forEach((panel) => {
        panel.dataset.label = t(panel.dataset.labelKey || "navAbout");
    });

    languageButtons.forEach((button) => {
        const isActive = button.dataset.lang === currentLanguage;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    updateBreadcrumb();
    syncFullscreenButton();

    if (pdfDoc) {
        journalStatus.textContent = "";
    }
}

function openTab(targetId) {
    const nextPanel = document.getElementById(targetId);

    if (!nextPanel) {
        return;
    }

    navButtons.forEach((button) => {
        const isActive = button.dataset.tab === targetId;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    panels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === targetId);
    });

    updateBreadcrumb();
    window.history.replaceState(null, "", `#${targetId}`);

    if (window.innerWidth <= 900) {
        document.body.classList.remove("nav-open");
    }
}

navButtons.forEach((button) => {
    button.addEventListener("click", () => {
        openTab(button.dataset.tab);
    });
});

languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
        setLanguage(button.dataset.lang);
    });
});

languageShortLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        setLanguage(link.dataset.langShort);
    });
});

function openTabFromHash() {
    const hashTab = window.location.hash.replace("#", "");
    if (hashTab) {
        openTab(hashTab);
    }
}

openTabFromHash();
window.addEventListener("hashchange", openTabFromHash);

function clampPage(page) {
    if (!totalPages) {
        return 1;
    }

    return Math.max(1, Math.min(totalPages, page));
}

function isSinglePageMode() {
    return currentViewMode === "single";
}

function normalizePageForMode(page, singlePageMode = isSinglePageMode()) {
    const normalized = clampPage(page);
    return singlePageMode ? normalized : (normalized % 2 === 0 ? normalized - 1 : normalized);
}

function syncViewModeUI() {
    const singleMode = isSinglePageMode();
    bookShell.classList.toggle("is-single-view", singleMode);
    bookShell.classList.toggle("is-spread-view", !singleMode);

    viewModeButtons.forEach((button) => {
        const isActive = button.dataset.viewMode === currentViewMode;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

function syncReaderControls() {
    if (fullscreenPageSlider) {
        fullscreenPageSlider.max = String(totalPages || 1);
        fullscreenPageSlider.value = String(Number(pageInput.value) || spreadStart || 1);
    }

    readerToneButtons.forEach((button) => {
        const isActive = button.dataset.readerTone === readerTone;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    bookShell.classList.toggle("reader-tone-soft", readerTone === "soft");
    bookShell.classList.toggle("reader-tone-dark", readerTone === "dark");
}

function getScaleForPage(page, canvas, singlePageMode) {
    const isFullscreen = bookShell.classList.contains("is-fullscreen-active")
        || document.fullscreenElement === bookShell
        || document.webkitFullscreenElement === bookShell;
    const parentWidth = canvas.parentElement?.clientWidth || 0;
    const parentHeight = canvas.parentElement?.clientHeight || 0;
    const spreadWidth = bookSpread.clientWidth || bookShell.clientWidth || 1200;
    const fallbackWidth = singlePageMode ? spreadWidth : Math.floor(spreadWidth / 2);
    let containerWidth = parentWidth || fallbackWidth || 600;
    let containerHeight = parentHeight || Math.round(containerWidth * (PDF_PAGE_HEIGHT / PDF_PAGE_WIDTH));

    if (isFullscreen) {
        const maxSpreadWidth = singlePageMode ? 800 : 1320;
        const maxPageWidth = singlePageMode ? maxSpreadWidth : Math.floor(maxSpreadWidth / 2);
        containerWidth = Math.min(containerWidth, maxPageWidth);
    }

    const baseViewport = page.getViewport({ scale: 1 });
    const horizontalPadding = isFullscreen ? (singlePageMode ? 24 : 16) : (singlePageMode ? 28 : 18);
    const verticalPadding = isFullscreen ? 44 : 8;
    const availableWidth = Math.max(120, containerWidth - horizontalPadding);
    const availableHeight = Math.max(160, containerHeight - verticalPadding);
    const widthScale = availableWidth / baseViewport.width;
    const heightScale = availableHeight / baseViewport.height;
    return Math.min(widthScale, heightScale);
}

async function renderProcessedPage(pageNumber, canvas, singlePageMode) {
    const page = await pdfDoc.getPage(pageNumber);
    const scale = getScaleForPage(page, canvas, singlePageMode);
    const viewport = page.getViewport({ scale });
    const outputScale = window.devicePixelRatio || 1;
    const targetContext = canvas.getContext("2d");

    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;
    targetContext.setTransform(outputScale, 0, 0, outputScale, 0, 0);
    targetContext.clearRect(0, 0, viewport.width, viewport.height);

    await page.render({
        canvasContext: targetContext,
        viewport
    }).promise;
}

async function preparePageCanvas(pageNumber, singlePageMode) {
    if (pageNumber < 1 || pageNumber > totalPages) {
        return null;
    }

    const preparedCanvas = document.createElement("canvas");
    await renderProcessedPage(pageNumber, preparedCanvas, singlePageMode);
    return preparedCanvas;
}

function commitPreparedCanvas(preparedCanvas, canvas, emptyNode, numberNode, pageNumber) {
    const context = canvas.getContext("2d");

    if (!preparedCanvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = "none";
        canvas.style.removeProperty("width");
        canvas.style.removeProperty("height");
        emptyNode.style.display = "flex";
        numberNode.textContent = "";
        return;
    }

    canvas.width = preparedCanvas.width;
    canvas.height = preparedCanvas.height;
    canvas.style.width = preparedCanvas.style.width;
    canvas.style.height = preparedCanvas.style.height;
    context.clearRect(0, 0, preparedCanvas.width, preparedCanvas.height);
    context.drawImage(preparedCanvas, 0, 0);
    canvas.style.display = "block";
    emptyNode.style.display = "none";
    numberNode.textContent = String(pageNumber);
}

async function renderPdfPage(pageNumber, canvas, emptyNode, numberNode, singlePageMode) {
    const preparedCanvas = await preparePageCanvas(pageNumber, singlePageMode);
    commitPreparedCanvas(preparedCanvas, canvas, emptyNode, numberNode, pageNumber);
}

function updateViewerMeta(normalizedStart, rightPage, singlePageMode) {
    spreadStart = normalizedStart;
    pageInput.max = String(totalPages);
    pageInput.value = String(singlePageMode ? rightPage : normalizedStart);
    journalPageCounter.textContent = singlePageMode
        ? `${rightPage} / ${totalPages}`
        : `${normalizedStart}-${Math.min(totalPages, rightPage)} / ${totalPages}`;
    fullscreenPageCounter.textContent = journalPageCounter.textContent;
    journalStatus.textContent = "";
    syncReaderControls();
}

async function renderSpread(startPage) {
    if (!pdfDoc) {
        return;
    }

    if (isRendering) {
        queuedSpread = startPage;
        return;
    }

    isRendering = true;
    const singlePageMode = isSinglePageMode();
    const normalizedStart = normalizePageForMode(startPage, singlePageMode);
    const leftPage = singlePageMode ? 0 : normalizedStart;
    const rightPage = singlePageMode ? normalizedStart : normalizedStart + 1;

    try {
        await renderPdfPage(leftPage, leftCanvas, leftEmpty, leftPageNumber, singlePageMode);
        await renderPdfPage(rightPage, rightCanvas, rightEmpty, rightPageNumber, singlePageMode);
        updateViewerMeta(normalizedStart, rightPage, singlePageMode);
    } catch (error) {
        journalStatus.textContent = t("pdfRenderError");
        console.error(error);
    } finally {
        isRendering = false;
        if (queuedSpread !== null) {
            const pendingSpread = queuedSpread;
            queuedSpread = null;
            renderSpread(pendingSpread);
        }
    }
}

function moveJournal(direction) {
    const step = isSinglePageMode() ? 1 : 2;
    const targetSpread = spreadStart + direction * step;
    renderSpread(targetSpread);
}

function setFullscreenStyles(active) {
    const background = readerTone === "dark" ? "#111820" : readerTone === "soft" ? "#f5efe4" : "#fff";
    const nodes = [
        bookShell,
        bookSpread,
        document.getElementById("left-page"),
        document.getElementById("right-page")
    ].filter(Boolean);

    nodes.forEach((node) => {
        if (!active) {
            node.style.removeProperty("background");
            node.style.removeProperty("background-color");
            node.style.removeProperty("background-image");
            node.style.removeProperty("box-shadow");
            return;
        }

        node.style.setProperty("background", background, "important");
        node.style.setProperty("background-color", background, "important");
        node.style.setProperty("background-image", "none", "important");
        node.style.setProperty("box-shadow", "none", "important");
    });

    syncReaderControls();
}

async function toggleFullscreen() {
    const activeFullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

    if (!activeFullscreenElement) {
        scrollPositionBeforeFullscreen = window.scrollY || window.pageYOffset || 0;

        if (bookShell.requestFullscreen) {
            await bookShell.requestFullscreen();
            return;
        }

        if (bookShell.webkitRequestFullscreen) {
            bookShell.webkitRequestFullscreen();
        }
        return;
    }

    if (document.exitFullscreen) {
        await document.exitFullscreen();
        return;
    }

    if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function syncFullscreenButton() {
    const activeFullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
    const isFullscreen = activeFullscreenElement === bookShell;
    bookShell.classList.toggle("is-fullscreen-active", isFullscreen);
    setFullscreenStyles(isFullscreen);
    fullscreenToggle.textContent = isFullscreen ? t("exitFullscreen") : t("fullscreen");
}

function restoreJournalScrollAfterFullscreen() {
    const targetTop = journalViewer
        ? journalViewer.getBoundingClientRect().top + window.scrollY - 18
        : scrollPositionBeforeFullscreen;
    const targetScroll = Math.max(0, Math.min(scrollPositionBeforeFullscreen || targetTop, targetTop));

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            window.scrollTo({ top: targetScroll, left: 0, behavior: "auto" });
        });
    });
}

function setViewMode(mode) {
    if (mode !== "single" && mode !== "spread") {
        return;
    }

    if (currentViewMode === mode) {
        return;
    }

    const currentPage = Number(pageInput.value) || spreadStart || 1;
    currentViewMode = mode;
    syncViewModeUI();

    if (pdfDoc) {
        renderSpread(currentPage);
    }
}

journalNavButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const direction = button.dataset.journalNav === "next" ? 1 : -1;
        moveJournal(direction);
    });
});

viewModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        setViewMode(button.dataset.viewMode);
    });
});

mobileNavToggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
});

document.addEventListener("click", (event) => {
    if (window.innerWidth > 900 || !document.body.classList.contains("nav-open")) {
        return;
    }

    if (sidebar.contains(event.target) || mobileNavToggle.contains(event.target)) {
        return;
    }

    document.body.classList.remove("nav-open");
});

pageJumpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const targetPage = Number(pageInput.value);
    if (!Number.isFinite(targetPage) || targetPage < 1) {
        return;
    }
    renderSpread(targetPage);
});

fullscreenToggle.addEventListener("click", async () => {
    try {
        await toggleFullscreen();
    } catch (error) {
        console.error(error);
    }
});

fullscreenExit.addEventListener("click", async () => {
    try {
        await toggleFullscreen();
    } catch (error) {
        console.error(error);
    }
});

readerToneButtons.forEach((button) => {
    button.addEventListener("click", () => {
        readerTone = readerTone === button.dataset.readerTone ? "normal" : button.dataset.readerTone;
        setFullscreenStyles(bookShell.classList.contains("is-fullscreen-active"));
    });
});

fullscreenPageSlider.addEventListener("input", () => {
    pageInput.value = fullscreenPageSlider.value;
});

fullscreenPageSlider.addEventListener("change", () => {
    renderSpread(Number(fullscreenPageSlider.value));
});

window.addEventListener("resize", () => {
    if (pdfDoc) {
        renderSpread(spreadStart);
    }

    if (window.innerWidth > 900) {
        document.body.classList.remove("nav-open");
    }
});

document.addEventListener("fullscreenchange", () => {
    const wasFullscreen = bookShell.classList.contains("is-fullscreen-active");
    syncFullscreenButton();
    const isFullscreen = bookShell.classList.contains("is-fullscreen-active");

    if (wasFullscreen && !isFullscreen) {
        restoreJournalScrollAfterFullscreen();
    }

    if (pdfDoc) {
        renderSpread(spreadStart);
    }
});

document.addEventListener("webkitfullscreenchange", () => {
    const wasFullscreen = bookShell.classList.contains("is-fullscreen-active");
    syncFullscreenButton();
    const isFullscreen = bookShell.classList.contains("is-fullscreen-active");

    if (wasFullscreen && !isFullscreen) {
        restoreJournalScrollAfterFullscreen();
    }

    if (pdfDoc) {
        renderSpread(spreadStart);
    }
});

document.addEventListener("keydown", (event) => {
    const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName);

    if (isTyping) {
        return;
    }

    if (event.key === "ArrowLeft") {
        moveJournal(-1);
    }

    if (event.key === "ArrowRight") {
        moveJournal(1);
    }

});

async function loadPdf() {
    if (!window.pdfjsLib) {
        journalStatus.textContent = t("pdfLibraryError");
        return;
    }

    pdfjsLib.GlobalWorkerOptions.workerSrc = "/assets/vendor/pdf.worker.min.js";

    try {
        const loadingTask = pdfjsLib.getDocument(PDF_URL);
        pdfDoc = await loadingTask.promise;
        totalPages = pdfDoc.numPages;
        pageInput.max = String(totalPages);
        await renderSpread(1);
    } catch (error) {
        journalStatus.textContent = t("pdfOpenError");
        console.error(error);
    }
}

setLanguage(currentLanguage);
loadPdf();
syncFullscreenButton();
syncViewModeUI();
syncReaderControls();
