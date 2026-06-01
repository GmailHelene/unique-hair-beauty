/* ============================================================
   UNIQUE HAIR & BEAUTY – LOGIKK
   Leser innhold fra content/innhold.json (det CMS-et redigerer).
   Faller tilbake til js/data.js hvis siden åpnes uten server.
   Du trenger normalt ikke endre noe her.
   ============================================================ */
(function () {
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Hent live-innhold; fall tilbake til data.js (window.SALON_DATA) ved feil.
  fetch("content/innhold.json", { cache: "no-store" })
    .then(r => { if (!r.ok) throw new Error("ikke funnet"); return r.json(); })
    .then(render)
    .catch(() => render(window.SALON_DATA || {}));

  function render(D) {
    D = D || {};
    const info = D.info || {};
    const setText = (sel, text) => $$(sel).forEach(el => { if (text) el.textContent = text; });

    /* ---------- Generelle tekster ---------- */
    setText("[data-navn]", info.navn);
    setText("[data-slagord]", info.slagord);
    setText("[data-kort]", info.kortBeskrivelse);
    setText("[data-omoss]", D.omOss);

    /* ---------- Kontaktinfo ---------- */
    const adresse = [info.adresseGate, info.adressePostnr].filter(Boolean).join(", ");
    setText("[data-adresse]", adresse || "Åmot");

    $$("[data-tel]").forEach(a => {
      if (info.telefon) { a.textContent = info.telefon; a.href = "tel:" + info.telefon.replace(/\s/g, ""); }
    });
    $$("[data-epost]").forEach(a => {
      if (info.epost) { a.textContent = info.epost; a.href = "mailto:" + info.epost; }
    });

    /* ---------- Booking-lenker (alle data-booking) ---------- */
    $$("[data-booking]").forEach(a => {
      if (info.bookingUrl) { a.href = info.bookingUrl; a.target = "_blank"; a.rel = "noopener"; }
    });

    /* ---------- Behandlinger & priser ---------- */
    const cards = $("#prisCards");
    if (cards && Array.isArray(D.kategorier)) {
      cards.innerHTML = D.kategorier.map(kat => `
        <article class="card">
          <div class="card__head">
            <span class="card__icon">${kat.ikon || "✦"}</span>
            <h3 class="card__title">${kat.tittel}</h3>
          </div>
          ${(kat.behandlinger || []).map(b => `
            <div class="price">
              <span class="price__name">${b.navn}</span>
              <span class="price__dots"></span>
              <span class="price__amount">${b.pris} kr</span>
            </div>`).join("")}
        </article>
      `).join("");
    }

    /* ---------- Åpningstider ---------- */
    const hours = $("#apningstider");
    if (hours && Array.isArray(D.apningstider)) {
      hours.innerHTML = D.apningstider.map(d => `
        <li><span>${d.dag}</span><strong>${d.tid}</strong></li>
      `).join("");
    }

    /* ---------- Sosiale medier ---------- */
    const social = $("#social");
    if (social) {
      const links = [];
      if (info.instagram) links.push(`<a href="${info.instagram}" target="_blank" rel="noopener">Instagram</a>`);
      if (info.facebook)  links.push(`<a href="${info.facebook}" target="_blank" rel="noopener">Facebook</a>`);
      social.innerHTML = links.join("");
    }

    /* ---------- Google Maps med adresse hvis satt ---------- */
    const map = $(".kontakt__map iframe");
    if (map && adresse && adresse !== "Åmot") {
      map.src = "https://www.google.com/maps?q=" + encodeURIComponent(adresse) + "&output=embed";
    }
  }

  /* ---------- Mobilmeny (uavhengig av innhold) ---------- */
  const toggle = $("#navToggle");
  const navLinks = $("#navLinks");
  if (toggle && navLinks) {
    toggle.addEventListener("click", () => navLinks.classList.toggle("open"));
    $$("a", navLinks).forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));
  }

  /* ---------- Årstall i footer ---------- */
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
