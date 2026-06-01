# Sette opp CMS-et (/admin) – steg for steg

Salongen skal kunne logge inn på `dittdomene.no/admin` og endre tekst,
behandlinger og priser i et skjema – uten å røre kode. Innholdet lagres i
`content/innhold.json`, og nettsiden leser det automatisk.

CMS-et (Sveltia/Decap) trenger to ting for å virke i drift:
1. at koden ligger i et **GitHub-repo**
2. en **GitHub-innlogging** (OAuth) så endringer kan lagres

Disse stegene må gjøres én gang (av Helene). Etterpå er det bare å logge inn.

---

## 1. Legg prosjektet på GitHub
```bash
cd unique-hair-beauty
git init
git add .
git commit -m "Unique Hair & Beauty nettside"
gh repo create unique-hair-beauty --private --source=. --push
```
Åpne så `admin/config.yml` og bytt `BRUKERNAVN/unique-hair-beauty`
til ditt faktiske repo (f.eks. `GmailHelene/unique-hair-beauty`).

## 2. Publiser siden på Netlify (gratis)
- Logg inn på netlify.com → **Add new site → Import from GitHub** → velg repoet.
- Build command: *(tom)* · Publish directory: `.`
- Siden er live på en `*.netlify.app`-adresse. Koble eget domene under
  **Domain settings** når dere har et.

## 3. Skru på innlogging (GitHub OAuth)
Sveltia/Decap trenger en OAuth-app for å la deg logge inn med GitHub:

1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**
   - Homepage URL: `https://<ditt-netlify-domene>`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
2. Kopier **Client ID** og **Client Secret**.
3. Netlify → siden din → **Site configuration → Access & security →
   OAuth → Install provider → GitHub**, og lim inn Client ID + Secret.

Nå kan du gå til `https://<ditt-domene>/admin`, logge inn med GitHub,
og redigere alt. Endringer committes til repoet og siden oppdateres
automatisk.

> 💡 **Enklere alternativ uten OAuth-oppsett:** [Pages CMS](https://pagescms.org).
> Logg inn på app.pagescms.org med GitHub, gi tilgang til repoet, ferdig.
> (Krever en liten `.pages.yml` i stedet for `admin/` – si fra, så lager jeg den.)

---

## Teste CMS-et lokalt (valgfritt)
```bash
npx @sveltia/cms-server   # kjør i én terminal
npx serve .               # kjør i en annen, åpne /admin
```
`local_backend: true` i config.yml gjør at endringer lagres rett i
filene dine mens du tester.
