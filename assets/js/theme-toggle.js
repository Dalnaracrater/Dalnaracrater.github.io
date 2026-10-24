// Light/dark theme for the main page and the blog.
// Uses the same "theme" localStorage key and data-theme attribute as the
// al-folio pages (assets/js/theme.js), so the choice carries across the site.
// Load this in <head>, after the stylesheets, so the theme applies before first paint.
(function () {
  var root = document.documentElement;

  function readStored() {
    try {
      return localStorage.getItem("theme");
    } catch (e) {
      return null;
    }
  }

  function store(theme) {
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      // Storage blocked: the choice still applies until the page is left.
    }
  }

  function systemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);

    // Swap code highlighting themes when the page has them.
    var light = document.getElementById("highlight_theme_light");
    var dark = document.getElementById("highlight_theme_dark");
    if (light && dark) {
      light.media = theme === "dark" ? "none" : "";
      dark.media = theme === "dark" ? "" : "none";
    }

    var button = document.getElementById("theme-toggle");
    if (button) {
      var label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
      button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      button.setAttribute("aria-label", label);
      button.title = label;
    }
  }

  var stored = readStored();
  var theme = stored === "dark" || stored === "light" ? stored : systemTheme();
  apply(theme);

  document.addEventListener("DOMContentLoaded", function () {
    apply(theme);
    var button = document.getElementById("theme-toggle");
    if (!button) return;
    button.addEventListener("click", function () {
      theme = theme === "dark" ? "light" : "dark";
      store(theme);
      apply(theme);
    });
  });
})();
