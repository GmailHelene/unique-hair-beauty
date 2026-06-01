# Sette opp CMS – steg for steg

Salongen (eller du) skal kunne logge inn og endre tekst, behandlinger og
priser i et skjema – uten å røre kode. Innholdet lagres i
`content/innhold.json`, og nettsiden leser det automatisk.

Prosjektet er klargjort for **to** CMS-er:

| | Pages CMS (anbefalt) | Sveltia CMS |
|---|---|---|
| Konfig | `.pages.yml` | `admin/` + `config.yml` |
| Innlogging | GitHub via app.pagescms.org | krever egen GitHub OAuth-app |
| Oppsett | ~2 min, ingen OAuth | mer fikling |
| Adresse | app.pagescms.org | `dittdomene.no/admin` |

Start med **Pages CMS**. Sveltia ligger klart som alternativ hvis du
heller vil ha innloggingen på ditt eget domene senere.

---

## Steg 1 – Legg prosjektet på GitHub
Se kommandoene nederst (`gh`-oppskrift). Kort fortalt:
```bash
cd unique-hair-beauty
gh repo create unique-hair-beauty --public --source=. --push
```

## Steg 2 – Publiser siden gratis (Netlify)
- Logg inn på netlify.com → **Add new site → Import an existing project** → velg repoet.
- Build command: *(tom)* · Publish directory: `.`
- Siden er live på en `*.netlify.app`-adresse. Koble eget domene under
  **Domain settings** når dere har et.

## Steg 3 – Skru på redigering med Pages CMS (anbefalt)
1. Gå til **[app.pagescms.org](https://app.pagescms.org)** og logg inn med GitHub.
2. Godkjenn Pages CMS-appen for repoet `unique-hair-beauty`.
3. Pages CMS leser `.pages.yml` automatisk → du får et skjema for å redigere
   salonginfo, åpningstider, behandlinger og priser.
4. Lagring committer til GitHub → Netlify oppdaterer siden automatisk.

> Skal salongen redigere selv, lager du en GitHub-bruker til dem og gir den
> tilgang til repoet. Da logger de inn på app.pagescms.org på samme måte.

---

## Alternativ: Sveltia CMS (innlogging på eget domene)
Hvis du heller vil ha `dittdomene.no/admin`:
1. Bytt `BRUKERNAVN/unique-hair-beauty` i `admin/config.yml` til ditt repo.
2. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**
   - Homepage URL: `https://<ditt-netlify-domene>`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
3. Netlify → siden din → **Site configuration → Access & security → OAuth →
   Install provider → GitHub** → lim inn Client ID + Secret.
4. Gå til `https://<ditt-domene>/admin` og logg inn.

Lokal test av Sveltia: `npx @sveltia/cms-server` i én terminal, `npx serve .`
i en annen, åpne `/admin`.

---

## gh-oppskrift (kjør i mappen `unique-hair-beauty`)
```bash
# 1. Er du logget inn på GitHub CLI? (hvis ikke: kjør og følg nettleseren)
gh auth status || gh auth login

# 2. Opprett repo på GitHub OG push i én kommando.
#    Repoet er allerede git-initiert og committet lokalt.
gh repo create unique-hair-beauty --public --source=. --remote=origin --push

# (Vil du heller ha privat repo: bytt --public med --private.
#  Netlify og Pages CMS funker fint med begge.)
```
Etterpå: gå til Netlify (Steg 2) og Pages CMS (Steg 3). Ferdig.
