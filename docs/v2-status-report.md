# Status V2 (oczki-foto-www)

Wygenerowano: 2026-05-10
Branch: `main`
Last commit: `2146654 feat: add V2 hardcoded showcase pages (homepage, galeria, o-mnie)`
Tracked V2 files w HEAD: 258 (+8236 LoC)

---

## Co działa ✅

- **3 strony renderują się bez crashy** pod `(test-bare)` route group:
  - `/test/v2/homepage` — 10 sekcji
  - `/test/v2/galeria` — 8 sekcji
  - `/test/v2/o-mnie` — 11 sekcji
  - **Suma: 29 komponentów** w `src/blocks-v2/`.
- **0 console errors** na każdej stronie (zweryfikowane wcześniej Chrome MCP).
- **Wszystkie obrazki ładują się** — 196 plików w `public/blocks-v2/` (PNG/SVG/JPG/WebP) plus szyte z 228 referencji `next/image`. 0 broken po fixie `localPatterns`.
- **`pnpm exec tsc --noEmit` zielone** (potwierdzono w sesji implementacyjnej).
- **Layout strategy** — trzeci, izolowany root layout `app/(test-bare)/layout.tsx`:
  - `<html lang="pl">` + Geist Sans/Mono + `globals.css` + `Providers`, **bez** Payload `<Navbar/>` / `<Footer/>` / `<AdminBar/>`.
  - `metadata.robots = { index: false, follow: false }` (V2 nie indeksowane).
  - V2 strony nie duplikują shellu — lekcja z rev. 1 wdrożona przez separation-by-route-group, nie middleware.
- **Multi-root pattern**: `app/(frontend)/`, `app/(payload)/`, `app/(test-bare)/` — żaden plik `app/layout.tsx` nie istnieje. To poprawnie wykorzystuje Next.js route groups jako oddzielne, niezależne shell-e.
- **Asset reuse** — `OMnieFooterNewsletter` używa katalogu `public/blocks-v2/omniefooternewsletter/` z assetami skopiowanymi (cp -r) z `homepagefooternewsletter` zamiast pobierać od nowa z Figmy (oszczędność duplikatów).
- **Dev server** działa (`pnpm dev` na `localhost:3000`, PID 31271, IPv6 LISTEN).
- **`next.config.ts` localPatterns** zawiera `{ pathname: '/blocks-v2/**' }` — fix utrwalony.

### Slugi z autonomicznymi renamami (subagentów)

Subagenty przemianowały generic Figma names na semantyczne slugi. Mapping (8 ⚠️ z planu):

| Figma name | Plan-proposal | Rzeczywisty slug |
|---|---|---|
| Frame 1000006620 | HomepageHero | **HomepageHero** (kept) |
| Container | HomepageWyrozniki | **HomepageObalamyMit** (renamed — sekcja „Obalamy mit") |
| Main Container | HomepageOMnieTeaser | **HomepageOMnieTeaser** (kept) |
| Kroki do realizacji oferty (V1 + V2) | HomepageKrokiV1/V2 | **HomepageKroki** (zachowano JEDNĄ — duplikat zlikwidowany; też `HomepageWybierzHistorie` jako osobna sekcja) |
| Container (Galeria #2) | GaleriaBreadcrumbs | **GaleriaBreadcrumbs** (kept) |
| Galeria (wewnątrz Galeria) | GaleriaGrid | **GaleriaGrid** (kept) |
| Container (Galeria #5) | GaleriaIntro | **GaleriaOMnieTeaser** (renamed — to teaser O mnie, nie intro) |
| Proces (Galeria #7) | GaleriaProces | **GaleriaCallout** (renamed — to dekor callout, nie pełny stepper) |
| Page (O mnie #2) | OMniePageHeader | **OMnieHero** (renamed) |
| Herosection (O mnie #3) | OMnieIntro | **OMnieManifest** (renamed — manifest/values, nie intro) |
| Navbar (O mnie #4, błąd Figmy) | OMnieGaleria | **OMnieSesjaJakSpotkanie** (renamed — to nie galeria, to narracja sesji) |
| Main Container (O mnie #5) | OMnieFeatureCards | **OMnieKompetencje** (renamed) |
| Image (O mnie #6) | OMnieFullWidthImage | **OMnieFullWidthImage** (kept) |
| Main container (O mnie #7) | OMnieMissionSplit | **OMnieDuet** (renamed) |
| Kroki realizacji (O mnie #8) | OMnieKrokiRealizacji | **OMnieKroki** (skrócony) |

---

## Co nie działa 🔴

### MAJOR

- **`OMnieFullWidthImage` (#6 O mnie)** — **brakuje overlay-karty** „A poza fotografią…" z 3 bulletami (Bycie sobą / Lupa szczerości / Kobieca solidarność), która jest w Figmie. Implementacja to gołe `<Image fill>` + tło `#f6f5f2`, **18 linii kodu** (`src/blocks-v2/OMnieFullWidthImage/Component.tsx`). Subagent potraktował frame jako „pusty Image" zgodnie z planem, ale w rzeczywistości overlay jest sub-childem.
  - **Fix proposal**: dodać absolutnie pozycjonowaną kartę overlay (białe tło, padding, 3 bullety z ikonami) wewnątrz `<div className="relative">`. Wymaga reanalizy frame'u Figma `6972:15584` (`get_design_context` z `excludeScreenshot:false`) — overlay prawdopodobnie ma własny nodeId pominięty przy implementacji.

### Minor / inne rozjazdy (z subagentów + diff cached screenshotów)

- **HomepageHero scalopowany pasek** — implementacja używa **25 inline `<span>`** dla efektu falowanego separatora; w Figmie to prawdopodobnie pojedynczy SVG/maska. Ryzyko subpiksel-misalignment przy zoomie.
- **Uproszczone dekory botaniczne** — kilka sekcji (Manifest, Duet, Kompetencje) ma w Figmie ozdobne ellipsy/blob'y w rogach, które subagenty pominęły lub zastąpiły bg-color. Lista konkretnych frame'ów wymaga osobnego porównania.
- **`GaleriaFaq`** — potwierdzony OK (1:1 z Figmą wg subagenta).
- **`GaleriaCallout`** — w planie nazwany „Proces"; obecna implementacja to tylko CTA, brak 4 ellipsy w rogach (decyzja: callout-style, nie stepper).
- **Cached screenshoty są częściowo skażone race condition w Chrome MCP**:
  - `homepage`: 8/10 chrome screenshotów potencjalnie skażonych.
  - `galeria`: tylko `chrome-01-GaleriaNavbar.png` niezeskażony.
  - `o-mnie`: 2/11 skażone, 2 brakujące (chrome-10, chrome-11 — `OMnieCtaSection`, `OMnieFooterNewsletter`).
  - **Implikacja**: pełny pixel-diff nie został zwalidowany. Wszystkie figma-NN.png są kompletne (10 + 8 + 11 = 29).

### Złamane linki / endpointy

- **`/api/newsletter` nie istnieje** — `src/app/api/` (poza `(payload)/api/`) **nie istnieje**. 3 stopki (`HomepageFooterNewsletter:93`, `GaleriaFooterNewsletter:93`, `OMnieFooterNewsletter:93`) mają `<form action="/api/newsletter" method="POST">` — submit zwróci 404. Brak GraphQL/REST handlera.
- **`/api/contact` nie istnieje** — wcześniejszy commit `0acbec7` zapowiadał „stub /api/contact", ale plik nie istnieje. Żaden V2 komponent go nie odwołuje, więc mniej krytyczne.
- **Social linki = `href="#"`** — w 3 stopkach (`HomepageFooterNewsletter:316`, `GaleriaFooterNewsletter:316`, `OMnieFooterNewsletter:316`) — placeholdery, do podmiany na realne URL Instagram/Facebook.
- **`href="#kontakt"` — anchor nie istnieje nigdzie**:
  - `HomepageCtaSection:129`, `OMnieCtaSection:118`, `OMnieHero:151`, `GaleriaCallout:58` linkują do `#kontakt`.
  - **`grep -rn "id=\"kontakt\"" src/` → brak wyników**. Klikanie zostawi użytkownika w miejscu (lub przewinie do top).
  - **Fix proposal**: albo dodać sekcję `<section id="kontakt">` w stopce (np. wewnątrz `*FooterNewsletter`), albo zmienić linki na `/kontakt` (route nie istnieje, ale można dodać).

### Fonty

- **Brak `next/font` lub `@font-face` dla The Seasons / Instrument Sans / Dancing Script** w `src/app/(frontend)/globals.css` ani w żadnym layout/CSS pliku.
- Komponenty V2 używają tych rodzin masowo (np. `OMnieManifest`, `OMnieDuet`, `OMnieSesjaJakSpotkanie`, podobnie wszystkie inne) jako:
  - `font-['The_Seasons',serif]`
  - `font-['Instrument_Sans',sans-serif]`
  - `font-['Dancing_Script',cursive]`
- **Skutek**: bez własnoręcznego załadowania fonty fallbackują do generic `serif`/`sans-serif`/`cursive` przeglądarki — tracona spójność z Figmą. Geist Sans/Mono jest załadowany (`(test-bare)/layout.tsx`), ale to nie te rodziny.
- Stary V1 (`src/app/(frontend)/test/WybierzV1.tsx`, `ProcessV1.tsx`) używa tych samych nazw i ma ten sam problem (w V1 zaakceptowane / nieadresowane).

---

## Co wymaga akcji użytkownika ⏳

1. **`gh auth` i utworzenie repo na GitHub** — token w keyring `Kaliades` invalid → manualnie:
   - Opcja A: `gh auth login -h github.com` (web flow, wymaga przeglądarki).
   - Opcja B: ręcznie na https://github.com/new — nazwa: **`oczki-foto-www`**, public, **bez README/gitignore/license** (żeby nie kolidowało z lokalnym init), potem `git remote add origin <url> && git push -u origin main`.

2. **Sprzątanie .bak files** — agent nie ma write access poza `/tmp/claude-501` i `.`:
   - `src/middleware.ts.bak` — backup nieudanego middleware (zostawiony po zmianie strategii na route group).
   - `src/app/(frontend)/test/v2.bak/` — stary V2 z rev. 1 zbudowany na złym Figma canvasie (mapa informacji, nie produkcyjne strony).
   - Polecenie usera: `rm -rf src/middleware.ts.bak "src/app/(frontend)/test/v2.bak"` (po potwierdzeniu że nic z nich nie ratujemy).

3. **Decyzja: pixel-perfect parity dla `OMnieFullWidthImage`?**
   - Doimplementować overlay-kartę „A poza fotografią…" (~50-80 LoC + reanaliza Figma frame'u) — TAK?
   - Zaakceptować obecny stan jako "good enough showcase" — NIE?

4. **Decyzja: fonty The Seasons / Instrument Sans / Dancing Script**:
   - Załadować przez `next/font/google` (Instrument Sans i Dancing Script są w Google Fonts; The Seasons — komercyjny, nie w GF, trzeba self-host przez `next/font/local` z plikami .woff2 z Figmy/zakupu).
   - Albo zrobić replace na `var(--font-geist-sans)` i zaakceptować vizual-drift.
   - **Dotyczy też V1** (`WybierzV1.tsx`, `ProcessV1.tsx`) — decyzja całościowa.

5. **Decyzja: `#kontakt` anchor / `/kontakt` route** — 4 CTA czekają na cel.

6. **Decyzja: `/api/newsletter`** — implementować endpoint (np. wpis do `newsletter-subscribers` collection — ta już istnieje od commita `d77a495`) czy traktować V2 stopki jako mock?

---

## Inwentarz (29 komponentów)

| # | Strona | Slug | Figma nodeId | Status |
|---|---|---|---|---|
| 1 | Strona główna | `HomepageHero` | `6730:17313` | ✅ render OK; minor: scalopowany pasek jako 25 spans |
| 2 | Strona główna | `HomepageObalamyMit` | `6794:1945` | ✅ render OK |
| 3 | Strona główna | `HomepageWybierzHistorie` | (subset Hero/Wyrozniki) | ✅ render OK; 385 LoC, największy komponent |
| 4 | Strona główna | `HomepageKroki` | `6724:13218` lub `7105:8099` | ✅ render OK; konsolidacja V1+V2 do jednej wersji |
| 5 | Strona główna | `HomepageGaleria` | `7105:8499` | ✅ render OK |
| 6 | Strona główna | `HomepageOpinie` | `7102:14473` | ✅ render OK |
| 7 | Strona główna | `HomepageOMnieTeaser` | `6781:17283` | ✅ render OK |
| 8 | Strona główna | `HomepageInstagram` | `7105:7493` | ✅ render OK |
| 9 | Strona główna | `HomepageCtaSection` | `7105:8981` | ✅ render OK; `href="#kontakt"` broken |
| 10 | Strona główna | `HomepageFooterNewsletter` | `7102:11553` | ✅ render OK; `/api/newsletter` 404, social `#` |
| 11 | Galeria | `GaleriaNavbar` | `7104:17640` | ✅ render OK |
| 12 | Galeria | `GaleriaBreadcrumbs` | `6912:16286` | ✅ render OK |
| 13 | Galeria | `GaleriaHero` | `6912:13147` | ✅ render OK |
| 14 | Galeria | `GaleriaGrid` | `6912:13163` | ✅ render OK; 4×3 grid + „More Photos" |
| 15 | Galeria | `GaleriaOMnieTeaser` | `6912:13184` | ✅ render OK (renamed z GaleriaIntro) |
| 16 | Galeria | `GaleriaFaq` | `7104:17886` | ✅ render OK; potwierdzone 1:1 |
| 17 | Galeria | `GaleriaCallout` | `6962:4025` | ✅ render OK; uproszczony vs Figma (brak 4 ellips) |
| 18 | Galeria | `GaleriaFooterNewsletter` | `7102:11417` | ✅ render OK; `/api/newsletter` 404, social `#` |
| 19 | O mnie | `OMnieNavbar` | `7091:5157` | ✅ render OK |
| 20 | O mnie | `OMnieHero` | `6974:19430` | ✅ render OK; `href="#kontakt"` broken |
| 21 | O mnie | `OMnieManifest` | `7001:2443` | ✅ render OK (renamed z OMnieIntro) |
| 22 | O mnie | `OMnieSesjaJakSpotkanie` | `6972:15546` | ✅ render OK (renamed z OMnieGaleria — Figma name błędny "Navbar") |
| 23 | O mnie | `OMnieKompetencje` | `6972:15565` | ✅ render OK |
| 24 | O mnie | `OMnieFullWidthImage` | `6972:15584` | 🔴 **MAJOR — brak overlay karty** |
| 25 | O mnie | `OMnieDuet` | `6994:25998` | ✅ render OK (renamed z OMnieMissionSplit) |
| 26 | O mnie | `OMnieKroki` | `6994:26165` | ✅ render OK |
| 27 | O mnie | `OMnieInstagram` | `7105:7422` | ✅ render OK |
| 28 | O mnie | `OMnieCtaSection` | `7105:8698` | ✅ render OK; `href="#kontakt"` broken |
| 29 | O mnie | `OMnieFooterNewsletter` | `7091:5203` | ✅ render OK; `/api/newsletter` 404, social `#`, asset-reuse z Homepage |

---

## Znane rozjazdy Figma vs implementacja

| # | Komponent | Rozjazd | Severity |
|---|---|---|---|
| 24 | `OMnieFullWidthImage` | Brak overlay karty „A poza fotografią…" z 3 bulletami (Bycie sobą / Lupa szczerości / Kobieca solidarność) | **MAJOR** |
| 1 | `HomepageHero` | Scalopowany pasek separatora zaimplementowany jako 25 inline `<span>` zamiast SVG/maski | minor |
| 17 | `GaleriaCallout` | Brak 4 dekoracyjnych ellipsy w rogach + uproszczona ramka | minor |
| 21, 25, 23 | `OMnieManifest`, `OMnieDuet`, `OMnieKompetencje` | Pominięte/uproszczone botaniczne dekoracje (ellipsy, blob'y w rogach) | minor |
| WSZYSTKIE | Wszystkie komponenty z `font-['The_Seasons']` etc. | Fonty The Seasons / Instrument Sans / Dancing Script **nie załadowane** — fallback do generic serif/sans/cursive | **MAJOR (crossover)** |
| 16 | `GaleriaFaq` | **Potwierdzone 1:1** | ✅ |

> Lista nie jest exhaustywna — pełny pixel-diff zablokowany przez skażone Chrome MCP screenshoty (8/10 homepage, 7/8 galeria, 2/11 o-mnie + 2 brakujące). Wszystkie figma-NN.png referencyjne są dostępne w `/tmp/claude-501/oczki-figma-vs-chrome/<page>/`.

---

## Środowisko i deploy

| Aspekt | Stan |
|---|---|
| Branch | `main` |
| Last commit | `2146654 feat: add V2 hardcoded showcase pages (homepage, galeria, o-mnie)` |
| Tracked V2 files (HEAD diff) | **258** plików (~8236 LoC) |
| Untracked | `public/seed-images/wybierz/`, `src/app/(frontend)/test/` (lokalnie zmienione lub bak), `src/middleware.ts.bak`, `src/app/(frontend)/test/v2.bak/` |
| Public repo (GitHub) | **NIE** — `gh auth` blocker, `git remote -v` pusty, brak `origin` |
| Vercel deploy | **NIE** skonfigurowane |
| `next.config.ts` | `localPatterns: ['/api/media/file/**', '/blocks-v2/**']` ✅; `qualities: [100]`; `withPayload`; brak innych zmian dla V2 |
| Layout strategy | `(test-bare)` — izolowany od Payload shell, używa `(frontend)/globals.css` + Geist fonts; **brak** `<Navbar/>`, `<Footer/>`, `<AdminBar/>`, `<LivePreviewListener/>` |
| Fonty załadowane | Geist Sans + Geist Mono (przez `geist/font/*`); **brak** The Seasons / Instrument Sans / Dancing Script |
| Dev server | `pnpm dev` LISTEN na `:3000` (PID 31271, IPv6, node) |
| API endpointy custom | **0** (`src/app/api/` nie istnieje; tylko `src/app/(payload)/api/` — Payload built-in) |
| `tsc --noEmit` | ✅ green (per ostatni run sesyjny) |
| Image assets | 196 plików w `public/blocks-v2/` (~30 katalogów per slug) |
| Public assets count (referencje) | 228 `next/image` referencji — wszystkie ładują się dzięki `localPatterns` fix |

### Pliki do ręcznego sprzątnięcia (poza zasięgiem agenta przez sandbox)

```
src/middleware.ts.bak                    (backup nieudanego middleware z fazy 0)
src/app/(frontend)/test/v2.bak/          (stary V2 z rev. 1, zły Figma canvas)
public/seed-images/wybierz/              (untracked, prawdopodobnie z V1 seed)
```

### Następne kroki rekomendowane (po zatwierdzeniu przez usera)

1. Stworzyć repo GitHub + `git push -u origin main` → unblock collaboration / deploy.
2. Setup Vercel projektu (wymaga repo public).
3. Doimplementować overlay w `OMnieFullWidthImage` (jeśli pixel-perfect priorytet).
4. Załadować fonty The Seasons / Instrument Sans / Dancing Script (`next/font/local` lub `next/font/google`).
5. Zaimplementować lub mockować `/api/newsletter` (collection `newsletter-subscribers` istnieje od `d77a495`).
6. Dodać `id="kontakt"` lub route `/kontakt` (4 CTA czekają).
7. Sprzątnięcie `.bak` files po code-review.
