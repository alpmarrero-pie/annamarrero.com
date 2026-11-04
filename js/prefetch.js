/* Smooth navigation: pre-render the next page when a visitor hovers a link,
   so when they click, the page is already built and the transition (View
   Transitions) plays instantly — instead of pausing to load over the network.

   Uses the browser's Speculation Rules API. Browsers that don't support it
   simply ignore this and navigate the normal way, so nothing breaks.

   The homepage ("/") is intentionally left out so its ripple intro plays
   fresh on each visit rather than being pre-run in the background. */
(function () {
  try {
    if (!(HTMLScriptElement.supports && HTMLScriptElement.supports("speculationrules"))) return;

    var rules = {
      prerender: [
        {
          where: {
            and: [
              { href_matches: "/*" },
              { not: { href_matches: "/" } }
            ]
          },
          eagerness: "moderate"
        }
      ]
    };

    var s = document.createElement("script");
    s.type = "speculationrules";
    s.textContent = JSON.stringify(rules);
    document.body.appendChild(s);
  } catch (e) {
    /* If anything is unsupported, do nothing — normal navigation still works. */
  }
})();
