// Category filter on the recipe index, serving scaler and print button on recipe pages.
(function () {
  var filters = document.querySelector(".filters");
  if (filters) {
    var cards = document.querySelectorAll("#grid .card");
    var empty = document.getElementById("empty");
    function apply(f) {
      if (!filters.querySelector('[data-f="' + f + '"]')) f = "all";
      var shown = 0;
      filters.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.dataset.f === f));
      });
      cards.forEach(function (c) {
        var on = f === "all" || c.dataset.cat === f;
        c.hidden = !on;
        if (on) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    }
    filters.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      history.replaceState(null, "", b.dataset.f === "all" ? location.pathname : "#" + b.dataset.f);
      apply(b.dataset.f);
    });
    window.addEventListener("hashchange", function () { apply(location.hash.slice(1) || "all"); });
    apply(location.hash.slice(1) || "all");
  }

  var scaler = document.querySelector(".scaler");
  if (scaler) {
    var base = Number(scaler.dataset.serves), n = base;
    var out = scaler.querySelector(".sv-out");
    var qs = document.querySelectorAll(".ing .q[data-q]");
    function fmt(x) {
      if (x >= 10) return String(Math.round(x));
      var fr = { 0.25: "¼", 0.5: "½", 0.75: "¾" };
      var w = Math.floor(x), f = Math.round((x - w) * 4) / 4;
      if (f === 1) return String(w + 1);
      if (fr[f]) return (w ? w : "") + fr[f];
      return String(Math.round(x * 10) / 10);
    }
    function render() {
      out.textContent = n;
      qs.forEach(function (el) {
        var u = el.dataset.u;
        el.textContent = fmt(Number(el.dataset.q) * n / base) + (u ? " " + u : "");
      });
    }
    scaler.querySelector(".sv-minus").addEventListener("click", function () { if (n > 1) { n--; render(); } });
    scaler.querySelector(".sv-plus").addEventListener("click", function () { if (n < 40) { n++; render(); } });
    render();
  }

  document.querySelectorAll(".js-print").forEach(function (b) {
    b.addEventListener("click", function () { window.print(); });
  });
})();
