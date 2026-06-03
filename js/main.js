/* ============================================================
   UNIQUE HAIR & BEAUTY – LOGIKK
   Leser innhold fra content/innhold.json (det CMS-et redigerer).
   Faller tilbake til js/data.js hvis siden åpnes uten server.
   Du trenger normalt ikke endre noe her.
   ============================================================ */
(function () {
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const liveFetch = () => fetch("content/innhold.json", { cache: "no-store" })
    .then(r => { if (!r.ok) throw new Error("ikke funnet"); return r.json(); })
    .then(render)
    .catch(() => render(window.SALON_DATA || {}));

  const srcMatch = location.hash.match(/preview-src=([^&]+)/);
  const inIframePreview = window.parent !== window && location.hash.indexOf("preview") !== -1;

  if (srcMatch) {
    // Delbar forhåndsvisnings-lenke: hent utkastet fra Studio-portalen.
    const url = decodeURIComponent(srcMatch[1]);
    showPreviewBanner();
    fetch(url, { cache: "no-store" })
      .then(r => r.json())
      .then(j => render(j.content || {}))
      .catch(liveFetch);
  } else if (inIframePreview) {
    // Forhåndsvisning inne i portalen (iframe): vent på innhold via postMessage.
    window.addEventListener("message", (e) => {
      const m = e.data;
      if (m && m.type === "studioportal-preview") render(m.content || {});
    });
    try { window.parent.postMessage({ type: "studioportal-ready" }, "*"); } catch (e) {}
  } else {
    liveFetch();
  }

  function showPreviewBanner() {
    const bar = document.createElement("div");
    bar.textContent = "Forhåndsvisning – ikke publisert ennå";
    bar.style.cssText = "position:fixed;top:0;left:0;right:0;z-index:9999;background:#c4a35a;color:#fff;text-align:center;font:500 13px/2.6 sans-serif;letter-spacing:1px;";
    document.addEventListener("DOMContentLoaded", () => { document.body.appendChild(bar); });
    if (document.body) document.body.appendChild(bar);
  }

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

    /* ---------- Logo (lastet opp via portalen) ---------- */
    const brand = $(".nav__brand");
    if (brand && info.logo) {
      brand.innerHTML = `<img src="${info.logo}" alt="${info.navn || "Logo"}" class="nav__logo">`;
    }

    /* ---------- Bilde av salongen i Om oss ---------- */
    const omMedia = $(".om__media");
    if (omMedia && info.salongBilde) {
      omMedia.innerHTML = `<img src="${info.salongBilde}" alt="${info.navn || "Salongen"}">`;
      omMedia.removeAttribute("aria-hidden");
    }

    /* ---------- Bildegalleri ---------- */
    const galleriSec = $("#galleri");
    const galleriGrid = $("#galleriGrid");
    const bilder = (D.galleri || []).map(g => g && g.bilde).filter(Boolean);
    if (galleriSec && galleriGrid) {
      if (bilder.length) {
        galleriGrid.innerHTML = bilder.map((src, i) =>
          `<a class="galleri__item" href="${src}" target="_blank" rel="noopener">
             <img src="${src}" alt="${(info.navn || "Galleri")} – bilde ${i + 1}" loading="lazy">
           </a>`).join("");
        galleriSec.hidden = false;
      } else {
        galleriSec.hidden = true; // skjul seksjonen hvis ingen bilder
      }
    }

    /* ---------- Inline Timma-booking ---------- */
    const bookingEmbed = $("#bookingEmbed");
    if (bookingEmbed && info.bookingUrl) {
      bookingEmbed.innerHTML =
        `<iframe src="${info.bookingUrl}" title="Bestill time" loading="lazy"
           referrerpolicy="no-referrer-when-downgrade"></iframe>`;
    }

    /* ---------- "Åpent nå"-indikator ---------- */
    renderAapent(D.apningstider || []);
  }

  /* ---------- Hjelper: er salongen åpen nå? ---------- */
  function renderAapent(apningstider) {
    const badge = $("#aapentNaa");
    if (!badge) return;
    const days = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
    const now = new Date();
    const todayName = days[now.getDay()].toLowerCase();
    const entry = (apningstider || []).find(d => (d.dag || "").toLowerCase().includes(todayName));
    let open = false, label = "Stengt i dag";
    if (entry) {
      const m = (entry.tid || "").match(/(\d{1,2})(?:[.:](\d{2}))?\s*[–-]\s*(\d{1,2})(?:[.:](\d{2}))?/);
      if (m) {
        const openMin = (+m[1]) * 60 + (+(m[2] || 0));
        const closeMin = (+m[3]) * 60 + (+(m[4] || 0));
        const cur = now.getHours() * 60 + now.getMinutes();
        open = cur >= openMin && cur < closeMin;
        label = open ? `Åpent nå – til kl ${m[3]}` : "Stengt nå";
      } else {
        label = entry.tid && entry.tid.toLowerCase() !== "stengt" ? entry.tid : "Stengt i dag";
      }
    }
    badge.classList.toggle("is-open", open);
    badge.classList.toggle("is-closed", !open);
    badge.innerHTML = `<span class="status-dot"></span>${label}`;
  }

  /* ---------- Mobilmeny (uavhengig av innhold) ---------- */
  const toggle = $("#navToggle");
  const navLinks = $("#navLinks");
  if (toggle && navLinks) {
    const setOpen = (open) => {
      navLinks.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Lukk meny" : "Åpne meny");
    };
    toggle.addEventListener("click", () => setOpen(!navLinks.classList.contains("open")));
    $$("a", navLinks).forEach(a => a.addEventListener("click", () => setOpen(false)));
  }

  /* ---------- Årstall i footer ---------- */
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
