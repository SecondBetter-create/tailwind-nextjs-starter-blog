# PensioenWijzer

PensioenWijzer is een Nederlandstalige leeromgeving die stap voor stap uitlegt
hoe AOW, werkgeverspensioen, aanvullend pensioen en bijbehorende geldstromen
samenhangen. De informatie is algemene uitleg en geen persoonlijk pensioen- of
belastingadvies.

## Lokaal starten

Vereist Node.js en npm.

```bash
npm install
npm run dev
```

Open daarna [http://localhost:3000](http://localhost:3000).

## Leerroute

- `/leren/` — elf interactieve lessen met quizzen, simulaties, sector-oefening en voortgang
- `/pensioen/` — wie betaalt, int, beheert en voert pensioen uit
- `/pensioen/pijlers/` — de drie bronnen van pensioeninkomen
- `/pensioen/opbouw/` — salaris, franchise en premie in pijler 2
- `/pensioen/loonstrook/` — pensioen en inhoudingen op de loonstrook
- `/pensioen/aanvullen/` — zelf pensioen aanvullen
- `/blog/` — artikelen en achtergrond

## Artikelen beheren

Artikelen staan als MDX-bestanden onder `data/blog/`. Gebruik frontmatter zoals
`title`, `date`, `tags`, `summary` en `draft`. Artikelen met `draft: true` worden
niet opgenomen in de openbare artikelpagina's, tags of zoekindex.

## Canonieke website-URL

Stel `NEXT_PUBLIC_SITE_URL` in op de openbare basis-URL van de productiewebsite,
bijvoorbeeld `https://www.example.nl`. Deze waarde wordt gebruikt voor canonieke
URL's, sitemap- en social metadata. Op Vercel kan de URL ook worden afgeleid van
de Vercel-omgevingsvariabelen.

## Techniek

Gebouwd met Next.js, React, Tailwind CSS en Contentlayer2.
