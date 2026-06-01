/* ============================================================
   UNIQUE HAIR & BEAUTY – OFFLINE-RESERVE
   ------------------------------------------------------------
   MERK: Det LIVE innholdet redigeres nå via CMS-et (/admin) og
   lagres i content/innhold.json. Denne filen brukes BARE som
   reserve hvis siden åpnes uten en server (f.eks. dobbeltklikk).
   Hold den gjerne grovt oppdatert, men den ekte sannheten er
   content/innhold.json.
   ============================================================ */

window.SALON_DATA = {

  /* ---- Generell info (vises flere steder på siden) ---- */
  info: {
    navn: "Unique Hair & Beauty",
    slagord: "Frisør · Negledesign · Vippedesign",
    kortBeskrivelse:
      "En liten, eksklusiv salong i Åmot hvor frisør, negledesign og " +
      "vippedesign møtes under ett tak. Her får du ro, kvalitet og et " +
      "resultat som føles helt deg.",

    telefon: "972 99 191",
    epost: "beautybyjcp@gmail.com",
    adresseGate: "Eikerveien 38B",
    adressePostnr: "3340 Åmot",

    // Lenke til Timma-booking:
    bookingUrl: "https://bestill.timma.no/uniquehairandbeauty",

    // Sosiale medier (la stå tom "" hvis dere ikke har):
    instagram: "https://www.instagram.com/unique.hair.and.beauty",
    facebook: "https://www.facebook.com/profile.php?id=61584111800210"
  },

  /* ---- Åpningstider ---- */
  apningstider: [
    { dag: "Mandag",  tid: "10–18" },
    { dag: "Tirsdag", tid: "10–18" },
    { dag: "Onsdag",  tid: "10–18" },
    { dag: "Torsdag", tid: "10–20" },
    { dag: "Fredag",  tid: "10–16" },
    { dag: "Lørdag",  tid: "Etter avtale" },
    { dag: "Søndag",  tid: "Stengt" }
  ],

  /* ---- Behandlinger & priser ----
     Prisene under er EKSEMPLER – bytt dem ut med salongens egne. */
  kategorier: [
    {
      tittel: "Frisør",
      ikon: "✂",
      behandlinger: [
        { navn: "Klipp dame",            pris: "fra 690" },
        { navn: "Klipp herre",           pris: "fra 490" },
        { navn: "Klipp barn (u/12 år)",  pris: "fra 350" },
        { navn: "Farge / helfarge",      pris: "fra 990" },
        { navn: "Striper / folier",      pris: "fra 1 290" },
        { navn: "Föning & styling",      pris: "fra 450" }
      ]
    },
    {
      tittel: "Negledesign",
      ikon: "✦",
      behandlinger: [
        { navn: "Nytt sett gel/akryl",   pris: "fra 750" },
        { navn: "Påfyll",                pris: "fra 590" },
        { navn: "Gellack (shellac)",     pris: "fra 450" },
        { navn: "Manikyr",               pris: "fra 490" },
        { navn: "Nail art (per negl)",   pris: "fra 30" }
      ]
    },
    {
      tittel: "Vippedesign",
      ikon: "❀",
      behandlinger: [
        { navn: "Klassiske vippeextensions",  pris: "fra 790" },
        { navn: "Volum-vipper",               pris: "fra 990" },
        { navn: "Påfyll vipper",              pris: "fra 490" },
        { navn: "Vippeløft (lash lift)",      pris: "fra 650" },
        { navn: "Bryn – farge & forming",     pris: "fra 350" }
      ]
    }
  ],

  /* ---- "Om oss"-tekst ---- */
  omOss:
    "Hos Unique Hair & Beauty møter du Celine og Janina – to dyktige " +
    "jenter med ekte lidenskap for faget sitt. Vi er opptatt av det lille " +
    "ekstra, tar oss tid til hver enkelt kunde, og kombinerer håndverk " +
    "innen frisør, negler og vipper i et lyst, rolig og elegant miljø. " +
    "Enten du skal ha en frisk farge, et nytt sett negler eller fyldige " +
    "vipper – målet vårt er at du skal gå herfra og føle deg helt unik."
};
