const navButtons = document.querySelectorAll(".nav-button");
const panels = document.querySelectorAll(".tab-panel");
const breadcrumbCurrent = document.getElementById("breadcrumb-current");
const mobileNavToggle = document.getElementById("mobile-nav-toggle");
const sidebar = document.getElementById("sidebar");
const pageJumpForm = document.getElementById("page-jump-form");
const pageInput = document.getElementById("page-input");
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
const languageButtons = document.querySelectorAll("[data-lang]");

const PDF_URL = "assets/journal/4-son-2025.pdf";
const PDF_PAGE_WIDTH = 595.276;
const PDF_PAGE_HEIGHT = 841.89;

const translations = {
    uz: {
        htmlLang: "uz",
        pageTitle: "Ilmiy elektron jurnal",
        sidebarTitle: "Ilmiy nashr",
        sidebarSubtitle: "Lorem ipsum dolor sit amet",
        navAbout: "Jurnal haqida",
        navRequirements: "Talablar",
        navArchive: "Arxiv",
        navEditorial: "Redkollegiya",
        breadcrumbHome: "Asosiy sahifa",
        breadcrumbJournal: "Jurnal",
        aboutTitle: "Jurnal faoliyati va maqsadi",
        aboutIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae libero non neque facilisis gravida.",
        aboutCopyOne: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae magna sed lectus efficitur luctus.",
        periodicity: "Davriyligi",
        languages: "Tillar",
        format: "Nashr formati",
        founder: "Muassis",
        date: "Nashr sanasi",
        directions: "Yo'nalishlar",
        journal: "Jurnal",
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
        requirementsTitle: "Mualliflar uchun asosiy talablar",
        requirementsIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae nibh id mi tincidunt posuere.",
        reqOne: "1. Matn hajmi",
        reqTwo: "2. Tuzilishi",
        reqThree: "3. Til talabi",
        reqFour: "4. Format",
        archiveTitle: "Jurnal arxivi",
        editorialTitle: "Redkollegiya tarkibi",
        chiefEditor: "Bosh muharrir",
        deputyEditor: "Muharrir o'rinbosari",
        secretary: "Mas'ul kotib",
        technicalEditor: "Texnik muharrir",
        loremShort: "Lorem ipsum",
        loremSentence: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        loremTiny: "Lorem ipsum dolor"
    },
    ru: {
        htmlLang: "ru",
        pageTitle: "Научный электронный журнал",
        sidebarTitle: "Научное издание",
        sidebarSubtitle: "Лорем ипсум долор сит амет",
        navAbout: "О журнале",
        navRequirements: "Требования",
        navArchive: "Архив",
        navEditorial: "Редколлегия",
        breadcrumbHome: "Главная",
        breadcrumbJournal: "Журнал",
        aboutTitle: "Деятельность и цель журнала",
        aboutIntro: "Лорем ипсум долор сит амет, консектетур адиписцинг элит. Интегер витае либеро нон neque facilisis gravida.",
        aboutCopyOne: "Лорем ипсум долор сит амет, консектетур адиписцинг элит. Суспендиcсе витае магна сед лектус эффицитур луктус.",
        periodicity: "Периодичность",
        languages: "Языки",
        format: "Формат издания",
        founder: "Учредитель",
        date: "Дата издания",
        directions: "Направления",
        journal: "Журнал",
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
        requirementsTitle: "Основные требования для авторов",
        requirementsIntro: "Лорем ипсум долор сит амет, консектетур адиписцинг элит. Донец витае нибх ид ми тинцидунт posuere.",
        reqOne: "1. Объём текста",
        reqTwo: "2. Структура",
        reqThree: "3. Языковое требование",
        reqFour: "4. Формат",
        archiveTitle: "Архив журнала",
        editorialTitle: "Состав редколлегии",
        chiefEditor: "Главный редактор",
        deputyEditor: "Заместитель редактора",
        secretary: "Ответственный секретарь",
        technicalEditor: "Технический редактор",
        loremShort: "Лорем ипсум",
        loremSentence: "Лорем ипсум долор сит амет, консектетур адиписцинг элит.",
        loremTiny: "Лорем ипсум долор"
    },
    en: {
        htmlLang: "en",
        pageTitle: "Scientific Electronic Journal",
        sidebarTitle: "Scientific Publication",
        sidebarSubtitle: "Lorem ipsum dolor sit amet",
        navAbout: "About Journal",
        navRequirements: "Requirements",
        navArchive: "Archive",
        navEditorial: "Editorial Board",
        breadcrumbHome: "Home",
        breadcrumbJournal: "Journal",
        aboutTitle: "Journal Activity and Purpose",
        aboutIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae libero non neque facilisis gravida.",
        aboutCopyOne: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae magna sed lectus efficitur luctus.",
        periodicity: "Periodicity",
        languages: "Languages",
        format: "Publication Format",
        founder: "Founder",
        date: "Publication Date",
        directions: "Directions",
        journal: "Journal",
        fullscreen: "Full Screen",
        exitFullscreen: "Normal Screen",
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
        requirementsTitle: "Main Requirements for Authors",
        requirementsIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae nibh id mi tincidunt posuere.",
        reqOne: "1. Text length",
        reqTwo: "2. Structure",
        reqThree: "3. Language requirement",
        reqFour: "4. Format",
        archiveTitle: "Journal Archive",
        editorialTitle: "Editorial Board Members",
        chiefEditor: "Editor-in-Chief",
        deputyEditor: "Deputy Editor",
        secretary: "Executive Secretary",
        technicalEditor: "Technical Editor",
        loremShort: "Lorem ipsum",
        loremSentence: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        loremTiny: "Lorem ipsum dolor"
    }
};

let pdfDoc = null;
let totalPages = 0;
let spreadStart = 1;
let isRendering = false;
let queuedSpread = null;
let currentViewMode = window.innerWidth <= 780 ? "single" : "spread";
let currentLanguage = localStorage.getItem("journalLanguage") || "uz";

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

    if (window.innerWidth <= 780) {
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

const hashTab = window.location.hash.replace("#", "");
if (hashTab) {
    openTab(hashTab);
}

function clampSpreadStart(page) {
    if (!totalPages) {
        return 1;
    }

    const normalized = Math.max(1, Math.min(totalPages, page));
    return normalized % 2 === 0 ? normalized - 1 : normalized;
}

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

function getScaleForPage(page, canvas, singlePageMode) {
    const parentWidth = canvas.parentElement?.clientWidth || 0;
    const parentHeight = canvas.parentElement?.clientHeight || 0;
    const spreadWidth = bookSpread.clientWidth || bookShell.clientWidth || 1200;
    const fallbackWidth = singlePageMode
        ? spreadWidth
        : Math.floor(spreadWidth / 2);
    const containerWidth = parentWidth || fallbackWidth || 600;
    const containerHeight = parentHeight || Math.round(containerWidth * (PDF_PAGE_HEIGHT / PDF_PAGE_WIDTH));
    const baseViewport = page.getViewport({ scale: 1 });
    const horizontalPadding = singlePageMode ? 28 : 18;
    const availableWidth = Math.max(120, containerWidth - horizontalPadding);
    const availableHeight = Math.max(160, containerHeight - 8);
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
        emptyNode.style.display = "flex";
        numberNode.textContent = "";
        return;
    }

    canvas.width = preparedCanvas.width;
    canvas.height = preparedCanvas.height;
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

async function renderPageIntoCanvas(pageNumber, canvas, singlePageMode) {
    const preparedCanvas = await preparePageCanvas(pageNumber, singlePageMode);
    const context = canvas.getContext("2d");

    if (!preparedCanvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = 0;
        canvas.height = 0;
        return;
    }

    canvas.width = preparedCanvas.width;
    canvas.height = preparedCanvas.height;
    context.clearRect(0, 0, preparedCanvas.width, preparedCanvas.height);
    context.drawImage(preparedCanvas, 0, 0);
}

function updateViewerMeta(normalizedStart, rightPage, singlePageMode) {
    spreadStart = normalizedStart;
    pageInput.max = String(totalPages);
    pageInput.value = String(singlePageMode ? rightPage : normalizedStart);
    journalPageCounter.textContent = singlePageMode
        ? `${rightPage} / ${totalPages}`
        : `${normalizedStart}-${Math.min(totalPages, rightPage)} / ${totalPages}`;
    journalStatus.textContent = "";
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

        node.style.setProperty("background", "#fff", "important");
        node.style.setProperty("background-color", "#fff", "important");
        node.style.setProperty("background-image", "none", "important");
        node.style.setProperty("box-shadow", "none", "important");
    });
}

async function toggleFullscreen() {
    const activeFullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

    if (!activeFullscreenElement) {
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
    if (window.innerWidth > 780 || !document.body.classList.contains("nav-open")) {
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

window.addEventListener("resize", () => {
    if (pdfDoc) {
        renderSpread(spreadStart);
    }

    if (window.innerWidth > 780) {
        document.body.classList.remove("nav-open");
    }
});

document.addEventListener("fullscreenchange", () => {
    syncFullscreenButton();
    if (pdfDoc) {
        renderSpread(spreadStart);
    }
});

document.addEventListener("webkitfullscreenchange", () => {
    syncFullscreenButton();
    if (pdfDoc) {
        renderSpread(spreadStart);
    }
});

document.addEventListener("keydown", (event) => {
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

    pdfjsLib.GlobalWorkerOptions.workerSrc = "assets/vendor/pdf.worker.min.js";

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
