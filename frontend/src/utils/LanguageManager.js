// Language Management Utilities
export class LanguageManager {
  static STORAGE_KEY = "app-language";
  static PREFERRED_KEY = "preferred-language";

  // Get current language from various sources
  static getCurrentLanguage() {
    // Priority: URL hash > localStorage > default
    const hash = window.location.hash;
    if (hash.includes("googtrans")) {
      const match = hash.match(/googtrans\(en\|([a-z]{2})\)/);
      if (match && match[1]) {
        return match[1];
      }
    }

    return localStorage.getItem(this.STORAGE_KEY) || "en";
  }

  // Force language persistence
  static persistLanguage(langCode) {
    localStorage.setItem(this.STORAGE_KEY, langCode);
    localStorage.setItem(this.PREFERRED_KEY, langCode);

    // Also store in sessionStorage for extra persistence
    sessionStorage.setItem(this.STORAGE_KEY, langCode);

    // Store in a cookie as backup
    document.cookie = `${this.STORAGE_KEY}=${langCode}; path=/; max-age=31536000`; // 1 year

    // Also set the Google Translate cookie so the widget recognizes the language immediately
    try {
      // value format used by Google Translate cookie is like '/en/hi'
      document.cookie = `googtrans=/en/${langCode}; path=/; max-age=31536000`;
    } catch (e) {
      // ignore cookie set failures
    }
  }

  // Set the hash and persist language (call only on user action or first load)
  static async setLanguage(langCode) {
    const targetHash = `#googtrans(en|${langCode})`;
    // Always set the googtrans hash (including English) to make Google Translate reflect change immediately
    // For English, clearing the hash often resets properly
    if (langCode === 'en') {
      window.location.hash = '';
    } else {
      window.location.hash = targetHash;
    }

    // Persist language and set googtrans cookie
    this.persistLanguage(langCode);

    // Try to reinitialize Google Translate so the change takes effect without a full reload
    try {
      // If the init function exists, call it
      if (
        typeof window.google !== "undefined" &&
        typeof window.google.translate !== "undefined" &&
        typeof window.google.translate.TranslateElement !== "undefined"
      ) {
        if (typeof window.googleTranslateElementInit === "function") {
          try {
            window.googleTranslateElementInit();
          } catch (e) {
            // ignore
          }
        }
      } else {
        // Otherwise, reload the translate script tag so it re-reads the cookie/hash
        const existing = document.querySelector(
          'script[src*="translate.google.com/translate_a/element.js"]'
        );
        if (existing) existing.remove();
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(s);
      }
    } catch (e) {
      // ignore any errors during re-init
    }

    // Try to set the language via the widget's select (if present) to force immediate translation
    try {
      await this.applySelectValue(langCode);
    } catch (e) {}
  }

  // Try to find the Google Translate select control and set its value, retrying a few times
  static applySelectValue(langCode, attempts = 10, delay = 300) {
    return new Promise((resolve) => {
      let tries = 0;
      const attempt = () => {
        tries++;
        try {
          // The select may be injected as .goog-te-combo
          const select = document.querySelector('.goog-te-combo');
          if (select) {
            // Try to set by value; some implementations use language codes, others short codes
            select.value = langCode;
            const ev = document.createEvent('HTMLEvents');
            ev.initEvent('change', true, true);
            select.dispatchEvent(ev);
            // Resolve after short delay to allow widget to apply
            setTimeout(() => resolve(true), 300);
            return;
          }

          // Some implementations render a menu in an iframe; try to open menu and click the language element
          const menuFrame = document.querySelector('iframe.goog-te-menu-frame');
          if (menuFrame && menuFrame.contentWindow) {
            try {
              const doc = menuFrame.contentWindow.document;
              const items = doc.querySelectorAll('.goog-te-menu2-item, .goog-te-menu2');
              for (let item of items) {
                // Match by data-lang or value attributes when available
                const dataLang = item.getAttribute('data-lang') || item.getAttribute('value') || item.getAttribute('lang');
                if (dataLang && dataLang.toLowerCase() === langCode.toLowerCase()) {
                  item.click();
                  setTimeout(() => resolve(true), 300);
                  return;
                }
                // Fallback: match innerText (language name) contains code or vice-versa
                if (item.innerText && item.innerText.toLowerCase().indexOf(langCode.toLowerCase()) !== -1) {
                  item.click();
                  setTimeout(() => resolve(true), 300);
                  return;
                }
              }
            } catch (e) {
              // cross-origin protections may prevent access
            }
          }
        } catch (e) {
          // ignore
        }

        if (tries < attempts) {
          setTimeout(attempt, delay);
        } else {
          resolve(false);
        }
      };
      attempt();
    });
  }

  // On first load, set hash to last selected language if not already set
  static ensureLanguageOnLoad() {
    const savedLang = this.getCurrentLanguage();
    const hash = window.location.hash;
    // Always ensure the hash matches persisted language (including English)
    if (savedLang) {
      const targetHash = `#googtrans(en|${savedLang})`;
      if (!hash.includes("googtrans") || hash !== targetHash) {
        window.location.hash = targetHash;
      }
      // Also ensure cookie matches
      try {
        document.cookie = `googtrans=/en/${savedLang}; path=/; max-age=31536000`;
      } catch (e) {}
    }
  }

  // Get language from cookie as fallback
  static getLanguageFromCookie() {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === this.STORAGE_KEY) {
        return value;
      }
    }
    return null;
  }

  // Comprehensive language recovery
  static recoverLanguage() {
    return (
      localStorage.getItem(this.STORAGE_KEY) ||
      sessionStorage.getItem(this.STORAGE_KEY) ||
      this.getLanguageFromCookie() ||
      "en"
    );
  }
}
