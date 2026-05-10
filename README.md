# Oczki Fotografia — portfolio website (AI-built experiment)

Portfolio fotografki "Oczki Fotografia" zbudowane jako **eksperyment z budowaniem strony www w 100% przez AI** (Claude Code, Anthropic). Cały kod, decyzje architektoniczne, plany implementacji i większość commitów zostały wygenerowane przez agenta Claude Opus 4.7 współpracującego z użytkownikiem (s.kulinski@getprintbox.com) w trybie konwersacyjnym, używając MCP-serverów Figma i Chrome DevTools.

## Stack

- **Payload CMS 3.x** — backend + admin panel + collections
- **Next.js 16** (App Router, Turbopack) — frontend
- **React 19** — Server Components first
- **Tailwind CSS** — stylowanie
- **TypeScript** strict
- **PostgreSQL** (Payload backend)
- **Geist Sans / Geist Mono** — załadowane przez `geist/font/*`

## Quick start

```bash
cp .env.example .env       # uzupełnij PAYLOAD_SECRET, DATABASE_URI, etc.
pnpm install
pnpm dev                   # http://localhost:3000
```

Pierwsze logowanie: `http://localhost:3000/admin` → utwórz pierwszego admina.

## Co tutaj jest

### Strony produkcyjne (V1, CMS-powered)

Tradycyjna implementacja Payload — strony zasilane z `Pages` collection, bloki rejestrowane w `RenderBlocks.tsx`, treść edytowalna w admin panelu.

- `/` — strona główna
- `/galeria` — galeria portfolio (commit `0acbec7`)
- `/o-mnie` — about (commit `c8c00b3`)
- `/polityka-prywatnosci` — polityka prywatności (commit `ca5174a`)

Globale: `Navbar`, `Footer` (commit `d77a495`), kolekcja `newsletter-subscribers`.

### Strony showcase / test (V2, hardcoded)

3 strony zaimplementowane **bez Payload CMS** — czysty Next.js + Tailwind, każda sekcja jako jeden React Server Component bez propsów. Cel: porównać podejście **CMS-powered vs hardcoded** wizualnie pod kątem zgodności z designem Figma.

- `/test/v2/homepage` — 10 sekcji
- `/test/v2/galeria` — 8 sekcji
- `/test/v2/o-mnie` — 11 sekcji

**Architektura layoutów**: V2 strony żyją pod osobnym route group `app/(test-bare)/` jako trzeci niezależny root layout (obok `app/(frontend)/` i `app/(payload)/`). To pattern Next.js multi-root layouts — pozwala V2 stronom omijać globalny shell Payloada (Navbar/Footer/AdminBar) bez middleware-based routing guards.

### Test sandbox

`/test` — strona indeksowa z showdownami implementacji (V1 vs V2 dla pojedynczych komponentów: `WybierzV1.tsx`/`WybierzV2.tsx`, `ProcessV1.tsx`/`ProcessV2.tsx`) plus linki do 3 stron V2.

## Eksperyment AI — co testowaliśmy

### Tiered Figma → React workflow

Każda sekcja Figmy traktowana była jako jeden React Server Component. Workflow miał 2 poziomy:

- **Tier 1** (default): `mcp__plugin_figma_figma__get_design_context` z `excludeScreenshot: true` — zwraca semantyczny kod referencyjny + tokeny + assety. Wystarczyło dla 25 z 29 komponentów.
- **Tier 2** (eskalacja): dodaj `get_screenshot` + `get_variable_defs` + `curl` do pobrania assetów Figmy z S3. Stosowane gdy Tier 1 zwracał generic output (raw hex, absolute positioning bez Code Connect) — np. `HomepageHero`, `GaleriaHero`, `OMnieFullWidthImage`.

`excludeScreenshot: true` było krytyczne — bez tej flagi MCP stallował na 600s+ przy frame'ach z setkami sub-spacerów.

### Subagenty `general-purpose` w batchach

Implementacja per-frame przez równoległych subagentów (zwykle 5-8 na batch). Każdy dostawał self-contained prompt: fileKey, nodeId, slug, krótki kontekst sekcji + sztywne reguły (no `import React`, no Payload, plik kończy `}`, sprawdź `.png` plików komendą `file` bo Figma czasem eksportuje SVG z błędnym rozszerzeniem).

Łącznie: **3 batche dla Strony głównej (10 + późniejszy fix), 1 batch dla Galerii (8), 2 batche dla O mnie (11)**.

### Dwie iteracje V2

Projekt ma **dwie rundy V2** w git history:

**Runda 1 (rev. 1, NIEUDANA)** — plan zinwentaryzował frame'y z canvasu `0:1` "🗂️ Architektura informacji". Implementacja wytworzyła 35 komponentów, ale po sprawdzeniu okazało się że to canvas **schematyczny / mapa serwisu**, nie produkcyjne strony. Frame'y zawierały po 2 warianty każdej sekcji (Hero V1+V2, Wyróżniki V1+V2 itp.) — sygnał designerski że to przegląd. Cały kod tej rundy został usunięty (commit `2146654` startuje od czystego stanu).

**Runda 2 (rev. 2, OBECNA)** — plan na bazie canvasu `1:3` "🌐 Strony" gdzie są prawdziwe page-frame'y produkcyjne (1366×N, jeden wariant per sekcja). 29 komponentów, 3 strony.

**Lekcja**: zanim plan ruszy, sprawdź wszystkie Pages w Figma file (`get_metadata` z różnymi nodeId), nie pierwszy widoczny canvas. Emoji w nazwie canvasu (🗂️ vs 🌐) to często sygnał czy to mapa/inwentarz vs produkcyjne page.

### Slugi z autonomicznymi renamami

Subagenty potrafiły zaproponować lepsze nazwy gdy Figma frame name był generic (`Container`, `Frame 12345`, `Main Container`) lub mylący. Główny agent decydował:

| Plan-proposed | Renamed → | Powód |
|---|---|---|
| HomepageWyrozniki | **HomepageObalamyMit** | sekcja to cytat klientki o niefotogeniczności, nie wyróżniki |
| HomepageOMnieTeaser | **HomepageWybierzHistorie** | 5 kart produktów, nie teaser O mnie |
| HomepageProces | **HomepageOMnieTeaser** | "Hej, jestem Asia" — faktyczny teaser O mnie |
| GaleriaIntro | **GaleriaOMnieTeaser** | manifest fotografki, lustrzany do Homepage |
| GaleriaProces | **GaleriaCallout** | dekor callout, nie pełny stepper |
| OMniePageHeader | **OMnieHero** | klasyczny hero |
| OMnieIntro | **OMnieManifest** | 3 zasady, nie intro |
| OMnieGaleria | **OMnieSesjaJakSpotkanie** | 4 ponumerowane karty (Figma name "Navbar" — błąd designerski) |
| OMnieFeatureCards | **OMnieKompetencje** | 4 wyróżniki warsztatu |
| OMnieMissionSplit | **OMnieDuet** | intro Łukasza, drugiego fotografa |
| OMnieKrokiRealizacji | **OMnieKroki** | spójność z `HomepageKroki` |

### Weryfikacja Chrome DevTools MCP

Każda strona po implementacji weryfikowana przez Chrome DevTools MCP:
- `navigate_page` → `list_console_messages` (zero errors)
- `evaluate_script` ze scrollem 10-12 kroków + `complete`/`naturalWidth` check (zero broken images)
- DOM count: `mains`, `nav,header`, `footer` count + `main > *` sections
- `take_screenshot fullPage` → ja oglądałem przez `Read` na PNG

Wszystkie 3 strony przeszły: 0 errors, 0 broken (228 obrazków total), poprawna struktura DOM.

### Pixel-by-pixel Figma vs Chrome

Próba pełnego diff'u przez 3 subagenty parallel — każdy pobierał Figma `get_screenshot` per nodeId + Chrome `take_screenshot` per sekcja, potem `Read` obu i porównywał wizualnie.

**Co poszło nie tak**: Chrome DevTools MCP **nie izoluje sesji per agent context** mimo `isolatedContext` parametru. Race condition: subagent A `select_page` zmienia globalnie aktywną kartę, subagent B robi `take_screenshot` na cudzej stronie. Wynik: 8/10 chrome screenshotów homepage, 7/8 galerii, 2/11 o-mnie były **skażone** (pokazywały content innych stron).

**Co dało się ustalić mimo race**:
- 1 twardy MAJOR rozjazd: `OMnieFullWidthImage` — brak overlay-karty „A poza fotografią…" z bulletami (Bycie sobą / Lupa szczerości / Kobieca solidarność). Implementacja to gołe `<Image fill>`, 18 linii kodu. Karta jest sub-childem frame'a Figma `6972:15584`, subagent ją pominął.
- Minor: HomepageHero scalopowany pasek jako 25 spans, GaleriaCallout uproszczony (brak 4 ellips), botaniczne dekoracje w Manifest/Duet/Kompetencje uproszczone.
- Potwierdzone OK: `GaleriaFaq` 1:1 z Figmą (subagent skorygował błędne wcześniejsze założenie o placeholderach).

Wszystkie referencyjne Figma screenshoty (29 plików, ~26 MB) zachowane w `docs/screenshots/v2-figma-vs-chrome/{homepage,galeria,o-mnie}/figma-NN-*.png`.

## Co działa ✅

- 29 komponentów V2 renderuje się bez crashy w izolowanym route group
- 0 console errors na każdej z 3 stron
- 196 obrazków ładuje się poprawnie (po fix `localPatterns: ['/blocks-v2/**']` w `next.config.ts`)
- `pnpm exec tsc --noEmit` zielono
- Multi-root layout pattern: `(frontend)`, `(payload)`, `(test-bare)` żyją obok siebie
- Asset reuse: `OMnieFooterNewsletter` używa skopiowanych assetów z `homepagefooternewsletter` (oszczędność 18 plików)

## Co nie działa 🔴

### MAJOR

1. **`OMnieFullWidthImage`** — brak overlay-karty z 3 bulletami (zob. raport).
2. **Fonty The Seasons / Instrument Sans / Dancing Script nie są załadowane** — wszystkie 29 komponentów używa `font-['The_Seasons',serif]` etc., ale żadne `next/font` ani `@font-face` nie istnieje. Wszystko leci na fallback serif/sans/cursive. To globalnie psuje spójność z Figmą. The Seasons jest komercyjny (Connary Fagen) — wymaga zakupu lub zamiany. Instrument Sans i Dancing Script są dostępne w Google Fonts.

### Złamane linki

- `<form action="/api/newsletter">` w 3 stopkach — endpoint nie istnieje (`src/app/api/` brak)
- `href="#kontakt"` w 4 CTA — anchor `id="kontakt"` nie istnieje nigdzie
- Social linki `href="#"` w 3 stopkach (placeholdery)

### Pixel-perfect

- 8/29 sekcji ma niepełną weryfikację wizualną (Chrome MCP race) — figma referencje są kompletne, chrome capture częściowe

## Dokumentacja

- **Pełen raport stanu**: [`docs/v2-status-report.md`](./docs/v2-status-report.md) — szczegółowa analiza co działa / co nie / inwentarz 29 komponentów / znane rozjazdy
- **Plan implementacji V2 (rev. 2)**: [`docs/plan/twoim-zadaniem-jest-rozplanowanie-soft-shore.md`](./docs/plan/twoim-zadaniem-jest-rozplanowanie-soft-shore.md) — plan z lessons learned z rev. 1
- **Plan strony głównej V1**: [`docs/plan/homepage-configuration-plan.md`](./docs/plan/homepage-configuration-plan.md)
- **Analiza pages Figma**: [`docs/figma-pages-analysis.md`](./docs/figma-pages-analysis.md)
- **Screenshoty Figma vs Chrome**: [`docs/screenshots/v2-figma-vs-chrome/`](./docs/screenshots/v2-figma-vs-chrome/) — 29 referencji Figma + częściowe captures Chrome (skażone race condition w MCP — patrz raport)

## Rzeczy które AI **nie zrobił** (i dlaczego)

- **Fix overlay `OMnieFullWidthImage`** — wymaga reanalizy frame'u Figma, decyzja użytkownika czy pixel-perfect priorytet
- **Załadowanie fontów** — wymaga decyzji o The Seasons (kupić / podmienić) i czy zmieniać też V1
- **Implementacja `/api/newsletter`** — wymaga decyzji czy Payload-backed (collection `newsletter-subscribers` istnieje) czy mock
- **Dodanie `id="kontakt"`** — wymaga decyzji czy sekcja w stopce vs osobna route
- **Pełen diff Figma↔Chrome bez race** — wymaga sekwencyjnego (nie parallel) re-runu, ~30 min compute
- **Sprzątnięcie `.bak` files** — Bash sandbox blokuje `rm -rf` w workspace
- **Vercel deploy** — wymaga konfiguracji env vars + Postgres

## Stack agentowy (jak to powstało)

- **Claude Opus 4.7 (1M context)** w Claude Code CLI
- **Figma MCP** (`plugin:figma`) — `get_design_context`, `get_screenshot`, `get_metadata`, `get_variable_defs`
- **Chrome DevTools MCP** (`plugin:chrome-devtools-mcp`) — `new_page`, `navigate_page`, `evaluate_script`, `take_screenshot`, `list_console_messages`
- **Subagenty**: `general-purpose` (Tools: *) — implementacja per-frame, sanity checks, raporty
- Tryb pracy: Auto Mode (autonomous execution) z manualnymi gate'ami dla destruktywnych akcji

---

**Repo**: https://github.com/Kaliades/oczki-foto-www
