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
        pageTitle: "O'zDSMI xabarlari",
        heroSubtitle: "",
        heroTitle: "O'zbekiston davlat san'at va madaniyat instituti xabarlari",
        heroTagline: "Ilmiy-nazariy, amaliy-uslubiy va ma'naviy-ma'rifiy jurnal",
        heroDescription: "Jurnal madaniyat va san'at sohalaridagi ilmiy-tadqiqot yutuqlarini targ'ib etish, yangi ilmiy-nazariy va kontseptual qarashlarni bayon etish hamda soha mutaxassislari muloqotini tashkil etishga xizmat qiladi.",
        noticeText: "Jurnal O'zbekiston Respublikasi OAK Rayosatining 2017-yil 29-noyabrdagi 245/6-sonli qarori bilan tavsiya etilgan ilmiy nashrlar ro'yxatiga kiritilgan. ISSN 2181-8932.",
        statFrequency: "son / yil",
        statArticles: "maqola / son",
        statReviewers: "ekspert",
        navAbout: "Jurnal haqida",
        navRequirements: "Talablar",
        navArchive: "Arxiv",
        navEditorial: "Tahrir hay'ati",
        breadcrumbHome: "Asosiy sahifa",
        breadcrumbJournal: "Jurnal",
        contentCaption: "Jurnal sahifasi",
        aboutTitle: "Jurnal faoliyati va maqsadi",
        aboutIntro: "«O'zbekiston davlat san'at va madaniyat instituti xabarlari» — O'zbekiston Respublikasi OAK ro'yxatiga kiritilgan ilmiy-nazariy, amaliy-uslubiy, ma'naviy-ma'rifiy jurnal (ISSN 2181-8932). Nashr mamlakatda madaniyat va san'at sohalarida olib borilayotgan ilmiy-tadqiqot yutuqlarini targ'ib etishga xizmat qiladi.",
        aboutCopyOne: "Jurnalda teatr va kino, musiqa san'ati, san'at tarixi, falsafa va nomoddiy madaniy meros, pedagogika hamda psixologiya yo'nalishlariga oid, aniq o'rganilgan va ishonchli manbalarga asoslangan ilmiy maqolalar chop etiladi.",
        aboutCopyTwo: "Jurnalning asosiy maqsadi — ilm-fanni qo'llab-quvvatlash siyosatini targ'ib qilish, oliy ta'lim va ilmiy-tadqiqot muassasalari natijalarini nashr etish, yosh tadqiqotchilarni ilmiy faoliyatga jalb etish va yuksak ma'naviyatni shakllantirishdan iborat.",
        founder: "Ta'sischi",
        founderValue: "O'zbekiston davlat san'at va madaniyat instituti",
        languages: "Tillar",
        languagesValue: "O'zbek, qoraqalpoq, rus, ingliz",
        format: "Nashr shakli",
        formatValue: "An'anaviy (bosma)",
        directions: "Yo'nalishlar",
        directionsValue: "San'atshunoslik, filologiya, tarix, falsafa, pedagogika, psixologiya, sotsiologiya, siyosatshunoslik",
        periodicity: "Davriyligi",
        periodicityValue: "",
        date: "Nashr sanasi",
        dateValue: "",
        aboutLeadOne: "Bosh muharrir — Nodirbek Sayfullayev",
        aboutLeadTwo: "Bosh muharrir o'rinbosari — Baxtiyor Yakubov",
        aboutLeadThree: "Mas'ul kotib — Lazizaxon Axmataliyeva",
        aboutLeadFour: "Sahifalovchi dizayner — Abdug'ani Mamasodiqov",
        journal: "Jurnal",
        viewerTitle: "So'nggi sonni ko'rish",
        viewerIntro: "Jurnalning so'nggi soni (2025-yil, 4-son) bilan to'g'ridan-to'g'ri shu sahifada tanishing. Sahifalarni varaqlash yoki to'liq ekran rejimidan foydalanishingiz mumkin.",
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
        requirementsIntro: "Jurnalga taqdim etiladigan ilmiy maqolalarga qo'yiladigan talablar jahon andozalari hamda O'zbekistondagi doktorlik (PhD va DSc) tadqiqotlari tizimi andozalaridan kelib chiqadi. Maqola mavzusi jurnal ruknlariga mos kelishi shart.",
        reqOne: "1. Matn hajmi",
        reqOneDesc: "Maqolaning maksimal hajmi — 8 bet. Foydalanilgan adabiyotlar soni kamida 5–10 ta manbadan iborat bo'lishi lozim.",
        reqTwo: "2. Tuzilishi",
        reqTwoDesc: "Muallif ma'lumoti, mavzu (Title), annotatsiya (Abstract), kalit so'zlar, kirish, asosiy qism, xulosa va foydalanilgan adabiyotlar.",
        reqThree: "3. Til talabi",
        reqThreeDesc: "Maqolalar o'zbek, qoraqalpoq, rus yoki ingliz tillarida qabul qilinadi. O'zbek tilidagi o', g', q, h harflari matnda to'liq yozilishi shart.",
        reqFour: "4. Format",
        reqFourDesc: "«Times New Roman», 14 shrift, 1.5 interval. Sahifa chetlari: chap 3 sm, yuqori va quyi 2 sm, o'ng 1.5 sm; abzas 1.25 sm.",
        reqPointOne: "Barcha maqolalar «Antiplagiat» tizimida tekshiriladi.",
        reqPointTwo: "Annotatsiya 6 qatordan oshmasligi, kalit so'zlar 8–10 tadan iborat bo'lishi lozim.",
        reqPointThree: "Ekspert xulosasiga ko'ra talabga javob bermaydigan maqolalar qabul qilinmaydi; tahririyat texnik tahrir huquqiga ega.",
        reqPointFour: "Tahrir va nashrga tayyorlash narxi — 300 ming so'm.",
        archiveTitle: "Jurnal arxivi",
        archiveIntro: "Jurnalning chop etilgan sonlari arxivi. Har bir sonni ro'yxatdan tanlab, PDF shaklida o'qishingiz mumkin.",
        archiveIssueA: "1-son",
        archiveItemA1: "Ilmiy maqolalar to'plami",
        archiveItemA2: "PDF formatda",
        archiveIssueB: "4-son",
        archiveItemB1: "So'nggi chop etilgan son",
        archiveItemB2: "To'liq matn PDF'da mavjud",
        archiveIssueC: "3-son",
        archiveItemC1: "Ilmiy maqolalar to'plami",
        archiveItemC2: "PDF formatda",
        editorialTitle: "Rahbariyat",
        editorialIntro: "Jurnalning tahrir hay'ati va jamoatchilik kengashi tarkibi. Quyida jurnal rahbariyati hamda tahrir hay'ati a'zolari keltirilgan.",
        boardMembersTitle: "Tahrir hay'ati a'zolari",
        chiefEditor: "Bosh muharrir",
        deputyEditor: "Bosh muharrir o'rinbosari",
        secretary: "Mas'ul kotib",
        technicalEditor: "Sahifalovchi dizayner",
        editorOne: "O'zbekiston davlat san'at va madaniyat instituti rektori",
        editorTwo: "Ilmiy ishlar va innovatsiyalar bo'yicha prorektor",
        editorThree: "Jurnalning mas'ul kotibi",
        editorFour: "Jurnal sahifalovchi dizayneri",
        sideCurrentIssue: "Joriy son",
        sideIssueText: "4-son",
        sideIssueDate: "2025-yil",
        sideIssueArticles: "To'liq matn PDF formatda",
        sideIssueTheme: "San'at, madaniyat va pedagogika",
        sideSubmission: "Maqola yuborish",
        sideSubmissionText: "Maqolalar tahririyat talablariga muvofiq tayyorlanadi. Tahrir va nashrga tayyorlash narxi — 300 ming so'm.",
        sideLinks: "Tezkor havolalar",
        sideContacts: "Aloqa",
        sideAddress: "Toshkent sh., Yalang'och dahasi, Zafar Diyor ko'chasi, 127-A"
    },
    ru: {
        htmlLang: "ru",
        pageTitle: "O'zDSMI xabarlari",
        heroSubtitle: "",
        heroTitle: "Вестник Государственного института искусств и культуры Узбекистана",
        heroTagline: "Научно-теоретический, практико-методический и духовно-просветительский журнал",
        heroDescription: "Журнал служит популяризации научно-исследовательских достижений в сфере культуры и искусства, изложению новых научно-теоретических и концептуальных взглядов и организации диалога специалистов отрасли.",
        noticeText: "Журнал включён в перечень научных изданий, рекомендованных решением Президиума ВАК Республики Узбекистан № 245/6 от 29 ноября 2017 года. ISSN 2181-8932.",
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
        aboutIntro: "«Вестник Государственного института искусств и культуры Узбекистана» — научно-теоретический, практико-методический и духовно-просветительский журнал, включённый в перечень ВАК Республики Узбекистан (ISSN 2181-8932). Издание служит популяризации научно-исследовательских достижений в сфере культуры и искусства страны.",
        aboutCopyOne: "В журнале публикуются основанные на достоверных источниках научные статьи по театру и кино, музыкальному искусству, истории искусств, философии и нематериальному культурному наследию, педагогике и психологии.",
        aboutCopyTwo: "Основная цель журнала — пропаганда политики поддержки науки, публикация результатов высших учебных и научно-исследовательских учреждений, привлечение молодых исследователей к научной деятельности и формирование высокой духовности.",
        founder: "Учредитель",
        founderValue: "Государственный институт искусств и культуры Узбекистана",
        languages: "Языки",
        languagesValue: "Узбекский, каракалпакский, русский, английский",
        format: "Форма издания",
        formatValue: "Традиционная (печатная)",
        directions: "Направления",
        directionsValue: "Искусствоведение, филология, история, философия, педагогика, психология, социология, политология",
        periodicity: "Периодичность",
        periodicityValue: "",
        date: "Дата издания",
        dateValue: "",
        aboutLeadOne: "Главный редактор — Nodirbek Sayfullayev",
        aboutLeadTwo: "Заместитель главного редактора — Baxtiyor Yakubov",
        aboutLeadThree: "Ответственный секретарь — Lazizaxon Axmataliyeva",
        aboutLeadFour: "Дизайнер-вёрстка — Abdug'ani Mamasodiqov",
        journal: "Журнал",
        viewerTitle: "Просмотр последнего выпуска",
        viewerIntro: "Ознакомьтесь с последним выпуском журнала (2025 год, № 4) прямо на этой странице. Доступны перелистывание страниц и полноэкранный режим.",
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
        requirementsIntro: "Требования к научным статьям, представляемым в журнал, основаны на мировых стандартах и стандартах системы докторантуры (PhD и DSc) Узбекистана. Тема статьи должна соответствовать рубрикам журнала.",
        reqOne: "1. Объём текста",
        reqOneDesc: "Максимальный объём статьи — 8 страниц. Количество использованных источников — не менее 5–10.",
        reqTwo: "2. Структура",
        reqTwoDesc: "Сведения об авторе, название (Title), аннотация (Abstract), ключевые слова, введение, основная часть, заключение и список литературы.",
        reqThree: "3. Языковое требование",
        reqThreeDesc: "Статьи принимаются на узбекском, каракалпакском, русском или английском языках. Буквы o', g', q, h в узбекском тексте должны быть написаны полностью.",
        reqFour: "4. Формат",
        reqFourDesc: "«Times New Roman», кегль 14, интервал 1,5. Поля: слева 3 см, сверху и снизу 2 см, справа 1,5 см; абзац 1,25 см.",
        reqPointOne: "Все статьи проверяются в системе «Антиплагиат».",
        reqPointTwo: "Аннотация — не более 6 строк, ключевые слова — 8–10.",
        reqPointThree: "Статьи, не отвечающие требованиям по заключению экспертов, не принимаются; редакция вправе вносить техническую правку.",
        reqPointFour: "Стоимость редактирования и подготовки к печати — 300 000 сум.",
        archiveTitle: "Архив журнала",
        archiveIntro: "Архив вышедших выпусков журнала. Каждый выпуск можно выбрать из списка ниже и читать в формате PDF.",
        archiveIssueA: "Выпуск 1",
        archiveItemA1: "Сборник научных статей",
        archiveItemA2: "В формате PDF",
        archiveIssueB: "Выпуск 4",
        archiveItemB1: "Последний вышедший выпуск",
        archiveItemB2: "Полный текст доступен в PDF",
        archiveIssueC: "Выпуск 3",
        archiveItemC1: "Сборник научных статей",
        archiveItemC2: "В формате PDF",
        editorialTitle: "Состав редколлегии",
        editorialIntro: "Состав редакционной коллегии и общественного совета журнала. Ниже представлены руководство журнала и члены редколлегии.",
        boardMembersTitle: "Члены редколлегии",
        chiefEditor: "Главный редактор",
        deputyEditor: "Заместитель главного редактора",
        secretary: "Ответственный секретарь",
        technicalEditor: "Дизайнер-вёрстка",
        editorOne: "Ректор Государственного института искусств и культуры Узбекистана",
        editorTwo: "Проректор по научной работе и инновациям",
        editorThree: "Ответственный секретарь журнала",
        editorFour: "Дизайнер-вёрстка журнала",
        sideCurrentIssue: "Текущий выпуск",
        sideIssueText: "Выпуск № 4",
        sideIssueDate: "2025 год",
        sideIssueArticles: "Полный текст в PDF",
        sideIssueTheme: "Искусство, культура и педагогика",
        sideSubmission: "Отправить статью",
        sideSubmissionText: "Статьи готовятся в соответствии с требованиями редакции. Стоимость редактирования и подготовки к печати — 300 000 сум.",
        sideLinks: "Быстрые ссылки",
        sideContacts: "Контакты",
        sideAddress: "г. Ташкент, массив Яланғоч, ул. Зафар Диёр, 127-А"
    },
    en: {
        htmlLang: "en",
        pageTitle: "O'zDSMI xabarlari",
        heroSubtitle: "",
        heroTitle: "Bulletin of the Uzbekistan State Institute of Arts and Culture",
        heroTagline: "A scientific-theoretical, practical-methodological and educational journal",
        heroDescription: "The journal promotes research achievements in culture and the arts, presents new scientific and conceptual perspectives, and fosters dialogue among specialists in the field.",
        noticeText: "The journal is included in the list of scientific publications recommended by the Presidium of the HAC of the Republic of Uzbekistan (decision No. 245/6 of 29 November 2017). ISSN 2181-8932.",
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
        aboutIntro: "The Bulletin of the Uzbekistan State Institute of Arts and Culture is a scientific-theoretical, practical-methodological and educational journal included in the HAC list of the Republic of Uzbekistan (ISSN 2181-8932). It promotes research achievements in the country's culture and arts.",
        aboutCopyOne: "The journal publishes well-researched scholarly articles based on reliable sources in theatre and cinema, music, art history, philosophy and intangible cultural heritage, pedagogy and psychology.",
        aboutCopyTwo: "The journal's main goals are to promote the policy of supporting science, publish the results of higher-education and research institutions, involve young researchers in scholarly work, and foster high spiritual and moral values.",
        founder: "Founder",
        founderValue: "Uzbekistan State Institute of Arts and Culture",
        languages: "Languages",
        languagesValue: "Uzbek, Karakalpak, Russian, English",
        format: "Publication format",
        formatValue: "Traditional (print)",
        directions: "Scope",
        directionsValue: "Art studies, philology, history, philosophy, pedagogy, psychology, sociology, political science",
        periodicity: "Periodicity",
        periodicityValue: "",
        date: "Publication date",
        dateValue: "",
        aboutLeadOne: "Editor-in-Chief — Nodirbek Sayfullayev",
        aboutLeadTwo: "Deputy Editor-in-Chief — Baxtiyor Yakubov",
        aboutLeadThree: "Executive Secretary — Lazizaxon Axmataliyeva",
        aboutLeadFour: "Layout Designer — Abdug'ani Mamasodiqov",
        journal: "Journal",
        viewerTitle: "View the latest issue",
        viewerIntro: "Read the latest issue of the journal (2025, No. 4) directly on this page. Page flipping and fullscreen mode are available.",
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
        requirementsIntro: "The requirements for articles submitted to the journal are based on international standards and the standards of Uzbekistan's doctoral (PhD and DSc) research system. The topic must match the journal's sections.",
        reqOne: "1. Text length",
        reqOneDesc: "Maximum article length is 8 pages, with at least 5–10 references.",
        reqTwo: "2. Structure",
        reqTwoDesc: "Author information, title, abstract, keywords, introduction, main part, conclusion and references.",
        reqThree: "3. Language requirement",
        reqThreeDesc: "Articles are accepted in Uzbek, Karakalpak, Russian or English. The Uzbek letters o', g', q, h must be written in full.",
        reqFour: "4. Format",
        reqFourDesc: "Times New Roman, size 14, 1.5 line spacing. Margins: left 3 cm, top/bottom 2 cm, right 1.5 cm; indent 1.25 cm.",
        reqPointOne: "All articles are checked in the Antiplagiat system.",
        reqPointTwo: "Abstract up to 6 lines; 8–10 keywords.",
        reqPointThree: "Articles that do not meet the requirements per expert review are not accepted; the editorial team may make technical edits.",
        reqPointFour: "Editing and publication preparation fee — 300,000 UZS.",
        archiveTitle: "Journal archive",
        archiveIntro: "Archive of the journal's published issues. Select an issue from the list below and read it in PDF format.",
        archiveIssueA: "Issue 1",
        archiveItemA1: "Collection of scholarly articles",
        archiveItemA2: "In PDF format",
        archiveIssueB: "Issue 4",
        archiveItemB1: "Latest published issue",
        archiveItemB2: "Full text available in PDF",
        archiveIssueC: "Issue 3",
        archiveItemC1: "Collection of scholarly articles",
        archiveItemC2: "In PDF format",
        editorialTitle: "Editorial board",
        editorialIntro: "Composition of the journal's editorial board and public council. Below are the journal's leadership and editorial board members.",
        boardMembersTitle: "Editorial board members",
        chiefEditor: "Editor-in-Chief",
        deputyEditor: "Deputy Editor-in-Chief",
        secretary: "Executive Secretary",
        technicalEditor: "Layout Designer",
        editorOne: "Rector of the Uzbekistan State Institute of Arts and Culture",
        editorTwo: "Vice-Rector for Research and Innovation",
        editorThree: "Executive Secretary of the journal",
        editorFour: "Layout Designer of the journal",
        sideCurrentIssue: "Current issue",
        sideIssueText: "Issue No. 4",
        sideIssueDate: "2025",
        sideIssueArticles: "Full text in PDF",
        sideIssueTheme: "Arts, culture and pedagogy",
        sideSubmission: "Submit article",
        sideSubmissionText: "Articles are prepared in line with the editorial requirements. Editing and publication preparation fee — 300,000 UZS.",
        sideLinks: "Quick links",
        sideContacts: "Contact",
        sideAddress: "Tashkent, Yalang'och, Zafar Diyor St., 127-A"
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
    const value = translations[currentLanguage]?.[key];
    if (value !== undefined) {
        return value;
    }
    const fallback = translations.uz[key];
    return fallback !== undefined ? fallback : key;
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
    renderBoardMembers();

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

    // The journal viewer renders at the wrong size while its tab is hidden, so
    // render (or re-render) it once its panel is actually visible. Reading the
    // shell width inside renderSpread forces layout, so the size is correct
    // immediately after the panel switches to display: block.
    if (pdfDoc && nextPanel.contains(bookShell)) {
        renderSpread(spreadStart);
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

    if (!bookShell.clientWidth) {
        // The viewer lives inside a tab that is currently hidden, so its
        // container has no width yet. Rendering now would fall back to a wrong
        // page size; it re-renders correctly once its tab becomes visible.
        spreadStart = normalizePageForMode(startPage);
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

const boardMembersList = document.getElementById("board-members-list");

const boardMembers = [
    { name: "Abduxalil Mavrulov", degree: { uz: "Tarix fanlari doktori, professor", ru: "доктор исторических наук, профессор", en: "Doctor of Historical Sciences, Professor" } },
    { name: "Sarvinoz Qodirova", degree: { uz: "San'atshunoslik fanlari doktori, professor", ru: "доктор искусствоведения, профессор", en: "Doctor of Art Studies, Professor" } },
    { name: "Munavvara Abdullayeva", degree: { uz: "O'zbekistonda xizmat ko'rsatgan yoshlar murabbiysi, professor", ru: "заслуженный наставник молодёжи Узбекистана, профессор", en: "Honored Youth Mentor of Uzbekistan, Professor" } },
    { name: "Xamida Maxmudova", degree: { uz: "O'zbekistonda xizmat ko'rsatgan yoshlar murabbiysi, professor", ru: "заслуженный наставник молодёжи Узбекистана, профессор", en: "Honored Youth Mentor of Uzbekistan, Professor" } },
    { name: "Amanulla Rizayev", degree: { uz: "San'atshunoslik fanlari nomzodi, professor", ru: "кандидат искусствоведения, профессор", en: "Candidate of Art Studies, Professor" } },
    { name: "Xaytmatova Sabohat Agzamovna", degree: { uz: "San'atshunoslik fanlari nomzodi, professor", ru: "кандидат искусствоведения, профессор", en: "Candidate of Art Studies, Professor" } },
    { name: "Fayziyeva Feruza Xadjimuradovna", degree: { uz: "San'atshunoslik fanlari nomzodi, professor", ru: "кандидат искусствоведения, профессор", en: "Candidate of Art Studies, Professor" } },
    { name: "Sevara Malikova Samadovna", degree: { uz: "Pedagogika fanlari nomzodi, professor", ru: "кандидат педагогических наук, профессор", en: "Candidate of Pedagogical Sciences, Professor" } },
    { name: "Go'zal Xalikulova", degree: { uz: "San'atshunoslik fanlari nomzodi, professor", ru: "кандидат искусствоведения, профессор", en: "Candidate of Art Studies, Professor" } },
    { name: "Jahongir Mamatqosimov", degree: { uz: "Pedagogika fanlari bo'yicha falsafa doktori (PhD), professor", ru: "доктор философии (PhD) по педагогическим наукам, профессор", en: "Doctor of Philosophy (PhD) in Pedagogy, Professor" } },
    { name: "Alieva Sadagat Aga Safar gizi", degree: { uz: "Xizmat ko'rsatgan madaniyat xodimi, dotsent", ru: "заслуженный работник культуры, доцент", en: "Honored Cultural Worker, Associate Professor" } },
    { name: "Kerimova Sevil Alifettah gizi", degree: { uz: "San'atshunoslik fanlari bo'yicha falsafa doktori (PhD), dotsent", ru: "доктор философии (PhD) по искусствоведению, доцент", en: "Doctor of Philosophy (PhD) in Art Studies, Associate Professor" } },
    { name: "Nishonboyeva Qunduz Vahobovna", degree: { uz: "Tarix fanlari nomzodi, dotsent", ru: "кандидат исторических наук, доцент", en: "Candidate of Historical Sciences, Associate Professor" } },
    { name: "Antonina Kosheleva", degree: { uz: "Pedagogika fanlari nomzodi, dotsent", ru: "кандидат педагогических наук, доцент", en: "Candidate of Pedagogical Sciences, Associate Professor" } },
    { name: "Hamdam Ismoilov", degree: { uz: "Filologiya fanlari nomzodi, dotsent", ru: "кандидат филологических наук, доцент", en: "Candidate of Philological Sciences, Associate Professor" } },
    { name: "Mirali Maxmudov", degree: { uz: "Pedagogika fanlari nomzodi, dotsent", ru: "кандидат педагогических наук, доцент", en: "Candidate of Pedagogical Sciences, Associate Professor" } },
    { name: "Ziyodulla Isoqov", degree: { uz: "Tarix fanlari nomzodi, dotsent", ru: "кандидат исторических наук, доцент", en: "Candidate of Historical Sciences, Associate Professor" } },
    { name: "G'ani Xudoyev", degree: { uz: "San'atshunoslik fanlari bo'yicha falsafa doktori (PhD), dotsent", ru: "доктор философии (PhD) по искусствоведению, доцент", en: "Doctor of Philosophy (PhD) in Art Studies, Associate Professor" } },
    { name: "Abdurahmonova Feruza Eshkobilovna", degree: { uz: "Filologiya fanlari bo'yicha falsafa doktori (PhD), dotsent", ru: "доктор философии (PhD) по филологическим наукам, доцент", en: "Doctor of Philosophy (PhD) in Philology, Associate Professor" } }
];

function renderBoardMembers() {
    if (!boardMembersList) {
        return;
    }

    boardMembersList.innerHTML = "";

    boardMembers.forEach((member, index) => {
        const item = document.createElement("li");
        item.className = "board-member";

        const order = document.createElement("span");
        order.className = "board-member-index";
        order.textContent = String(index + 1);

        const body = document.createElement("div");
        body.className = "board-member-body";

        const name = document.createElement("span");
        name.className = "board-member-name";
        name.textContent = member.name;

        const degree = document.createElement("span");
        degree.className = "board-member-degree";
        degree.textContent = member.degree[currentLanguage] || member.degree.uz;

        body.append(name, degree);
        item.append(order, body);
        boardMembersList.append(item);
    });
}


setLanguage(currentLanguage);
loadPdf();
syncFullscreenButton();
syncViewModeUI();
syncReaderControls();
