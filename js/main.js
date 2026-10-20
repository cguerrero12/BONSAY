const DEFAULT_LANGUAGE = "es";
const SUPPORTED_LANGUAGES = ["es", "en"];
const languageButtons = document.querySelectorAll("[data-language]");
const year = document.querySelector("[data-year]");

let currentTranslations = {};
let languageRequest = 0;

const getTranslation = (key) =>
  key.split(".").reduce((value, part) => value?.[part], currentTranslations);

const getSavedLanguage = () => {
  try {
    return localStorage.getItem("bonsay-language");
  } catch {
    return null;
  }
};

const saveLanguage = (language) => {
  try {
    localStorage.setItem("bonsay-language", language);
  } catch {
    // The page still works when browser storage is unavailable.
  }
};

const applyTranslations = (translations, language) => {
  currentTranslations = translations;
  document.documentElement.lang = language;
  document.title = getTranslation("meta.title") ?? document.title;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const translation = getTranslation(element.dataset.i18n);
    if (typeof translation === "string") element.textContent = translation;
  });

  document.querySelectorAll("[data-i18n-content]").forEach((element) => {
    const translation = getTranslation(element.dataset.i18nContent);
    if (typeof translation === "string") element.setAttribute("content", translation);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const translation = getTranslation(element.dataset.i18nAriaLabel);
    if (typeof translation === "string") element.setAttribute("aria-label", translation);
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  saveLanguage(language);
};

const setLanguage = async (language) => {
  if (!SUPPORTED_LANGUAGES.includes(language)) return;

  const request = ++languageRequest;
  languageButtons.forEach((button) => { button.disabled = true; });

  try {
    const bundledTranslations = window.BONSAY_TRANSLATIONS?.[language];
    if (bundledTranslations) {
      if (request === languageRequest) applyTranslations(bundledTranslations, language);
      return;
    }

    const response = await fetch(`./assets/translations/${language}.json`);
    if (!response.ok) throw new Error(`Unable to load language: ${language}`);
    const translations = await response.json();
    if (request === languageRequest) applyTranslations(translations, language);
  } catch (error) {
    console.error(`BONSAY could not load the ${language} translation.`, error);
  } finally {
    if (request === languageRequest) {
      languageButtons.forEach((button) => { button.disabled = false; });
    }
  }
};

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

if (year) year.textContent = new Date().getFullYear();

const savedLanguage = getSavedLanguage();
const initialLanguage = SUPPORTED_LANGUAGES.includes(savedLanguage) ? savedLanguage : DEFAULT_LANGUAGE;
setLanguage(initialLanguage);
