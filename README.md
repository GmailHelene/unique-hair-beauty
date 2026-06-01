# Unique Hair & Beauty – nettside

Elegant, statisk one-page nettside for salongen i Åmot.
Frisør · Negledesign · Vippedesign.

## Slik endrer du innhold, behandlinger og priser
Det live innholdet ligger i **`content/innhold.json`** og redigeres
enklest via CMS-et på `/admin` (se `CMS-SETUP.md`). Whoever logger inn
endrer tekst og priser i skjema – ingen kode.

Vil du heller redigere fila direkte? Åpne `content/innhold.json` og endre
verdiene mellom anførselstegnene. Ikke fjern `"` eller `,`.
(`js/data.js` er kun en offline-reserve hvis siden åpnes uten server.)

Fyll inn disse før lansering:
- `telefon`, `epost`
- `adresseGate` (Google Maps og kontakt-info bruker denne)
- `bookingUrl` – lim inn hele Timma-lenken
- `instagram` (lagt inn) / `facebook` (valgfritt)

## Logo og bilder
- **Logo:** legg `logo.png` i `assets/`, og bytt ut tekst-logoen i
  `index.html` (se kommentar ved `nav__brand`).
- **Bilde av salongen:** legg `salong.jpg` i `assets/` og bytt ut
  plassholderen i "Om oss"-seksjonen (se kommentar i `index.html`).

## Kjøre lokalt
Dobbeltklikk `index.html`, eller for korrekt visning av kart/fonter:
```
npx serve .
```

## Publisere (gratis)
Dra mappen inn på [netlify.com/drop](https://app.netlify.com/drop) eller
koble repoet til Vercel/Netlify. Koble så eget domene.

## CMS – kunden redigerer selv via innlogging
Siden er klargjort for to CMS-er (se **`CMS-SETUP.md`**):
- **Pages CMS** (anbefalt) – konfig i `.pages.yml`, logg inn på
  app.pagescms.org med GitHub. Ingen OAuth-oppsett.
- **Sveltia CMS** – konfig i `admin/`, gir innlogging på `dittdomene.no/admin`
  (krever egen GitHub OAuth-app).

Begge redigerer `content/innhold.json` i skjema – ingen kode.

---
Laget av [helene.cloud](https://helene.cloud)
