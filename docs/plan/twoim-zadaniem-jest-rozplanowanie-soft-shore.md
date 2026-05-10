# Plan: Implementacja Homepage / Galeria / O mnie z nowego pliku Figma (V2, hardcoded) — RUNDA 2

> **Wersja**: 2026-05-10 (rev. 2). Pierwotny plan implementacji (rev. 1) trafił w **niewłaściwy canvas** Figma — patrz „Lessons learned" niżej. Cały kod V2 (`src/blocks-v2/*`, `src/app/(frontend)/test/v2/*`, `public/blocks-v2/*`) został usunięty na zlecenie usera; zaczynamy od czystego stanu.

## Context

Mamy plik Figma (`olYfq47eVG9IV0p5Fvyme5`, „📷 Oczki fotografia (Copy)") z drugą iteracją projektu. Implementujemy 3 strony — **Strona główna**, **Galeria**, **O mnie** — w wersji **hardcoded w Next.js**, świadomie z pominięciem Payload CMS. Cel: postawić te wersje obok istniejących bloków CMS-owych i je porównać (V1 z `src/blocks/` ↔ V2 z `src/blocks-v2/`). Każdy frame top-level z Figmy traktujemy jako niezależny „section block" pełnej szerokości (1366px design width). Konfiguracja CMS, pola edytowalne i seedy są poza zakresem — liczy się sama warstwa wizualna.

**Właściwe identyfikatory frame'ów** (canvas `1:3` „🌐 Strony", desktop 1366px):

| Strona | nodeId | wymiary | wariant tablet (768) | wariant mobile (360) |
|---|---|---|---|---|
| Strona główna | `6724:13153` | 1366×8326 | `7105:10801` | `7105:13096` |
| Galeria | `6912:13127` | 1366×5272 | `7104:17970` | `7104:19171` |
| O mnie | `6972:15499` | 1366×7049 | `7092:4196` | `7093:5557` |

> Mobile/tablet poza zakresem tej iteracji (analogicznie jak w rundzie 1) — robimy tylko desktop @1366.

## Lessons learned z rundy 1

### Lesson 1 — Sprawdzaj listę Pages, nie pierwszy widoczny canvas

Rev. 1 zinwentaryzowała frame'y z canvasu `0:1` „🗂️ Architektura informacji" — to **diagram mapy serwisu z legendą**, nie produkcyjne strony. Frame'y `6541:1218`, `6592:6175`, `6593:10529` z poprzedniego planu były tylko mockupami w mapie (z wszystkimi wariantami sekcji obok siebie: Hero V1 + Hero V2, Wyróżniki V1 + V2 itp.). Plan błędnie potraktował te warianty jako „świadome porównanie" — w rzeczywistości na produkcyjnym canvasie każda sekcja występuje **tylko raz** (z wybranym wariantem).

**Sygnały które powinny były odpalić alarm w rev. 1:**
- Emoji `🗂️` (file folder) w nazwie canvasu = "to jest mapa/inwentarz", nie page produkcyjny.
- Frame'y zawierające „Hero V1" + „Hero V2" obok siebie = canvas przeglądowy.
- Wymiary frame'ów rev. 1 były **mniejsze** niż produkcyjne (np. „O mnie" 4779 vs prawdziwe 7049, +47% contentu). Designerski mockup w mapie często skraca lub kompresuje sekcje.

**Reguła na przyszłość:** zanim plan ruszy z inwentaryzacji frame'ów, najpierw zapytaj usera o URL **konkretnej strony produkcyjnej** w Figmie, albo zinwentaryzuj wszystkie Pages całego pliku (`get_metadata` z różnymi nodeId, lub użyj `use_figma` z prostym zadaniem listowania).

### Lesson 2 — `(frontend)/layout.tsx` już ma `<main>`, `<Navbar>`, `<Footer>`

W rev. 1 page.tsx 3 stron V2 owijało wszystko w `<main>`, co dało zagnieżdżony `<main><main>` (root layout `src/app/(frontend)/layout.tsx:35` już renderuje `<main>{children}</main>`). Dodatkowo: globalny Payload `<Navbar />` (linia 34) + nasz V2 `*Navbar` = 2 paski u góry; globalny `<Footer />` (linia 36) + nasza V2 `*Stopka` = 2 stopki na dole. Widoczne na każdej stronie testowej.

**Reguła na przyszłość:** każdy nowy page nested w `(frontend)/` dziedziczy globalny shell. Zanim zrobisz drugą warstwę layoutu, sprawdź co już renderuje rodzicielski layout.

### Lesson 3 — `next/image` localPatterns blokuje obrazki spoza whitelist

Rev. 1 musiała post factum rozszerzyć `next.config.ts` o `{ pathname: '/blocks-v2/**' }`, bo `<Image src="/blocks-v2/...">` wyrzucał runtime error „src does not match images.localPatterns". Fix już wprowadzony — zostaje na trwałe (niezależnie czy zachowamy katalog `public/blocks-v2/`).

### Lesson 4 — Subagenty `general-purpose` z dużymi MCP outputami stallują

Figma `get_design_context` / `get_metadata` często zwracają output > limit tokenów i zostają zapisane do pliku. Bez `excludeScreenshot: true` MCP może też stallować na 600s+ przy frame'ach z setkami sub-spacerów. Subagenty muszą mieć w prompcie: "Spodziewaj się że wynik zostanie zapisany do pliku — użyj jq + grep" oraz „NIE wywołuj `get_screenshot` jeśli niepotrzebny".

## Decyzje (potwierdzone z userem w rev. 1, nadal aktualne)

1. **Każdy frame top-level = osobny komponent** w `src/blocks-v2/<Slug>/Component.tsx` (tylko Component.tsx, bez config.ts/seed.ts). Powtórzenia (np. „Footer+Newsletter" instance reusowane między 3 stronami) i tak robimy 3x — cel to porównanie 1:1 z Figmą per-strona.
2. **Frame'y `hidden=true` / `visible=false` pomijamy.** W produkcyjnym canvasie nie znaleziono żadnych ukrytych — gdyby się pojawiły, skip.
3. **Strony żyją w** `src/app/(frontend)/test/v2/{homepage,galeria,o-mnie}/page.tsx` — każda po prostu importuje komponenty w kolejności z Figmy.
4. **Subagent implementacyjny** = `general-purpose` z custom promptem (lekki, bez balastu Payload), uruchamiany przez głównego agenta w batchach.
5. **Tiered Figma workflow** (zgodnie z istniejącą pamięcią): domyślnie `get_design_context` (Tier 1). Eskalacja do `get_screenshot` + `get_variable_defs` + `curl` assetów (Tier 2) tylko gdy frame jest dekoracyjny/precyzyjny.

## Inwentarz frame'ów do implementacji (29 sztuk vs 35 z rev. 1)

### Strona główna — `6724:13153` → `src/app/(frontend)/test/v2/homepage/page.tsx`

12 sekcji top-level. **Brak top-level Navbara** — Navbar najpewniej overlay nad Hero (sprawdzi subagent przy implementacji). **Sekcja `Warstwa_1` (#12)** to dekoracyjny blob, NIE block — pomijamy lub dorzucamy jako asset wewnątrz przyległej sekcji.

| # | Slug komponentu | Figma nodeId | Figma name | wymiary | uwagi |
|---|---|---|---|---|---|
| 1 | `HomepageHero` ⚠️ | `6730:17313` | Frame 1000006620 | 1366×640 | generic name, slug propozycyjny — subagent waliduje przez `get_design_context` |
| 2 | `HomepageWyrozniki` ⚠️ | `6794:1945` | Container | 1366×604 | generic, slug propozycyjny |
| 3 | `HomepageOMnieTeaser` ⚠️ | `6781:17283` | Main Container | 1366×1074 | generic; sekcja About-style, teaser do strony O mnie |
| 4 | `HomepageKrokiV1` ❗ | `6724:13218` | Kroki do realizacji oferty | 1366×693 | duplikat z #6 — patrz ⛓️ |
| 5 | `HomepageGaleria` | `7105:8499` | Galeria | 1366×878 | instance shared |
| 6 | `HomepageKrokiV2` ❗ | `7105:8099` | Kroki do realizacji oferty | 1366×890 | **DUPLIKAT** (instance) — implementujemy obie wersje, oznaczamy V1/V2 |
| 7 | `HomepageOpinie` | `7102:14473` | Opinie | 1366×550 | instance shared |
| 8 | `HomepageProces` | `6724:13354` | Proces | 1366×730 | |
| 9 | `HomepageInstagram` | `7105:7493` | Instagram | 1366×423 | instance shared (też O mnie #9) |
| 10 | `HomepageCtaSection` | `7105:8981` | CTA-section | 1366×594 | instance shared (też O mnie #10) |
| 11 | `HomepageFooterNewsletter` | `7102:11553` | Footer+Newsletter | 1366×1250 | instance shared (też Galeria #8, O mnie #11) |
| ~~12~~ | ~~`HomepageDecorBlob`~~ | ~~`6856:1438`~~ | ~~Warstwa_1~~ | ~~611×604 (float, x=-216)~~ | **POMIJAMY** — dekoracja, nie sekcja |

**Decyzja po inwentaryzacji**: implementujemy 11 komponentów (10 jeśli userowi wystarczy jedna wersja „Kroki" — ale domyślnie obie, dla zachowania 1:1 z Figmą).

### Galeria — `6912:13127` → `src/app/(frontend)/test/v2/galeria/page.tsx`

8 sekcji top-level. Bez duplikatów, czysta lista.

| # | Slug komponentu | Figma nodeId | Figma name | wymiary | uwagi |
|---|---|---|---|---|---|
| 1 | `GaleriaNavbar` | `7104:17640` | Navbar | 1366×68 | instance shared |
| 2 | `GaleriaBreadcrumbs` ⚠️ | `6912:16286` | Container | 1366×52 | generic name; zawiera instance „Breadcrumbs" |
| 3 | `GaleriaHero` | `6912:13147` | Herosection | 1366×354 | |
| 4 | `GaleriaGrid` ⚠️ | `6912:13163` | Galeria | 1366×1405 | wewnętrzny frame ma duplikat nazwy strony, faktycznie 4×3 grid kart + „More Photos" |
| 5 | `GaleriaIntro` ⚠️ | `6912:13184` | Container | 1366×617 | generic; sekcja typu testimonial/intro autora (Title + długi Text + dekor) |
| 6 | `GaleriaFaq` | `7104:17886` | FAQ | 1366×920 | instance shared |
| 7 | `GaleriaProces` | `6962:4025` | Proces | 1366×606 | dekoracyjna ramka z 4 ellipsami w rogach + heading + 1 CTA — to teaser callout, nie pełny stepper |
| 8 | `GaleriaFooterNewsletter` | `7102:11417` | Footer+Newsletter | 1366×1250 | instance shared |

### O mnie — `6972:15499` → `src/app/(frontend)/test/v2/o-mnie/page.tsx`

11 sekcji top-level. Bez duplikatów. **Uwaga: frame `#4` ma w Figma name „Navbar", ale to jest galeria — designerski błąd nazewnictwa.**

| # | Slug komponentu | Figma nodeId | Figma name | wymiary | uwagi |
|---|---|---|---|---|---|
| 1 | `OMnieNavbar` | `7091:5157` | Navbar | 1366×68 | instance shared |
| 2 | `OMniePageHeader` ⚠️ | `6974:19430` | Page | 1366×612 | hero z breadcrumbami + Title + Description + Button + 2 Featured Images |
| 3 | `OMnieIntro` ⚠️ | `7001:2443` | Herosection | 1366×576 | mimo nazwy „Herosection", to bardziej intro/values: Heading + 3 kolumny tekstu |
| 4 | `OMnieGaleria` ⚠️❗ | `6972:15546` | Navbar | 1366×618 | **Figma name jest błędne** (mówi „Navbar"), faktycznie galeria/portfolio z 4 zdjęciami + dekor ellipses |
| 5 | `OMnieFeatureCards` ⚠️ | `6972:15565` | Main Container | 1366×634 | generic; 4 karty z Title/Text/Vector + tło z 18 pionowych linii |
| 6 | `OMnieFullWidthImage` ⚠️ | `6972:15584` | Image | 1366×723 | pusty frame w XML — sekcja banner/parallax z jednym zdjęciem |
| 7 | `OMnieMissionSplit` ⚠️ | `6994:25998` | Main container | 1366×892 | generic; split image 683 + content 683 z Title + 3 podsekcje |
| 8 | `OMnieKrokiRealizacji` | `6994:26165` | Kroki do realizacji oferty | 1366×659 | |
| 9 | `OMnieInstagram` | `7105:7422` | Instagram | 1366×423 | instance shared (też Homepage #9) |
| 10 | `OMnieCtaSection` | `7105:8698` | CTA-section | 1366×594 | instance shared (też Homepage #10) |
| 11 | `OMnieFooterNewsletter` | `7091:5203` | Footer+Newsletter | 1366×1250 | instance shared |

**Legenda:**
- ⚠️ — Figma name jest generic (`Container`, `Frame N`, `Main Container`); slug to propozycja głównego agenta na podstawie kontekstu i sub-children. Subagent po wczytaniu `get_design_context` może zaproponować przemianowanie — wraca z propozycją w raporcie, główny agent decyduje przed dodaniem do `page.tsx`.
- ❗ — wymaga uwagi (duplikat / błąd nazewnictwa designerski).

**Łącznie do implementacji: 30 komponentów** (11 Strona główna + 8 Galeria + 11 O mnie). Po pominięciu duplikatu „Kroki" V1 lub V2 i zignorowaniu dekoracji `Warstwa_1` — **29**.

## Faza 0 — Fix layoutu (PRZED implementacją!)

Z lekcji 2: globalny `(frontend)/layout.tsx` renderuje `<Navbar />` + `<main>{children}</main>` + `<Footer />`. Nasze 3 V2 strony muszą **wyciszyć** te globalne komponenty, inaczej strony będą duplikować navbara/stopkę i zagnieżdżać `<main>`.

**Wybór: Opcja B z poprzedniej dyskusji** — warunek w `(frontend)/layout.tsx` na bazie `headers().get('next-url')`:

```tsx
// src/app/(frontend)/layout.tsx
import { headers } from 'next/headers'

export default async function RootLayout({ children }) {
  const { isEnabled } = await draftMode()
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? headersList.get('next-url') ?? ''
  const isV2Test = pathname.startsWith('/test/v2/')

  return (
    <html ...>
      <body>
        <AdminBar adminBarProps={{ preview: isEnabled }} />
        <Providers>
          {!isV2Test && <Navbar />}
          <main>{children}</main>
          {!isV2Test && <Footer />}
        </Providers>
      </body>
    </html>
  )
}
```

**Caveat:** `headers()` w Next 13/14/15 nie zawsze ma stabilny header z pathname. Dwie opcje obejścia:
- (a) Middleware (`src/middleware.ts`) który wstrzykuje `x-pathname` do nagłówków request — czysto, jednolinijkowe.
- (b) Użycie `usePathname()` w client component — wymagałoby `'use client'` w layoutie, łamie RSC.

Domyślnie (a). Plan:
1. Sprawdzić czy `src/middleware.ts` istnieje. Jeśli nie — utworzyć z minimalnym `NextResponse.next({ request: { headers: requestHeaders.set('x-pathname', request.nextUrl.pathname) } })`.
2. Dodać warunek `isV2Test` w `(frontend)/layout.tsx`.
3. **Zostawić `<main>{children}</main>`** w layoutie — page.tsx 3 stron NIE owija w `<main>`, tylko zwraca React Fragment z sekcjami.

**Sanity check po fazie 0:** odpalić `pnpm dev`, otworzyć dowolny istniejący page (np. `/galeria` V1) i sprawdzić że globalny Navbar/Footer nadal się renderuje (warunek nie odpala się dla nie-V2 ścieżek).

## Faza 1 — Setup

1. Utworzyć katalog `src/blocks-v2/` (pusty).
2. Utworzyć trzy pliki stron z **placeholderem** (komentarze TODO importów + React Fragment z `<></>` + `metadata.robots = { index: false, follow: false }`):
   - `src/app/(frontend)/test/v2/homepage/page.tsx`
   - `src/app/(frontend)/test/v2/galeria/page.tsx`
   - `src/app/(frontend)/test/v2/o-mnie/page.tsx`
3. Dopisać do `src/app/(frontend)/test/page.tsx` linki do trzech nowych podstron (sekcja „V2 hardcoded — RUNDA 2"). Należy dodać z powrotem import `Link`.

## Faza 2 — Implementacja per-frame (subagenci `general-purpose`, batchami)

### Strategia uruchamiania

- **Batch po ~5 subagentów równolegle** (jeden message → wiele `Agent` toolcall). Po batchu: główny agent czyta raporty, dopisuje 5 nowych importów do odpowiedniej `page.tsx`, weryfikuje przeglądarką (Chrome MCP — od razu, nie na końcu jak w rev. 1!), startuje kolejny batch.
- Łącznie ~6 batchów (29 frame'ów / 5).
- Po każdym batchu: `pnpm exec tsc --noEmit` + Chrome MCP screenshot 3 stron jako sanity. Błędy = poprawia główny agent przed następnym batchem.

### Prompt subagenta (szablon)

Każdy subagent dostaje pełną samodzielną instrukcję, m.in.:

- **Cel**: wygenerować JEDEN React Server Component pod ścieżką `src/blocks-v2/<Slug>/Component.tsx`.
- **Inputy**: `fileKey=olYfq47eVG9IV0p5Fvyme5`, `nodeId=<id>`, `slug=<Slug>`, krótki opis kontekstu sekcji.
- **Workflow**:
  1. `get_design_context` (Tier 1) z `excludeScreenshot: true` (zapobiega stallowaniu na dużych frame'ach).
  2. Jeśli output jest mocno generyczny (raw hex, absolute positioning, brak Code Connect) lub frame jest dekoracyjny → eskaluj do `get_screenshot` + `get_variable_defs`. Assety potrzebne w runtime → `curl` z URL z odpowiedzi do `public/blocks-v2/<slug>/<plik>`.
  3. **Jeśli slug oznaczony ⚠️ w planie** — po wczytaniu `get_design_context` zaproponuj lepszą nazwę i zwróć ją w raporcie ZAMIAST tworzenia pliku. Główny agent zatwierdza nazwę zanim wystartuje implementacja.
  4. Stylowanie: **Tailwind**, brak CSS-in-JS, brak `'use client'` chyba że konieczne (interakcja).
  5. Obrazki: `next/image` z `public/blocks-v2/<slug>/...`. Brak Payload Media. Pamiętaj: `next.config.ts` ma już `localPatterns: ['/blocks-v2/**']` — działa.
  6. Strukturalnie: jeden default export `<Slug>` (np. `export default function HomepageHero()`), brak propsów (treść hardcoded).
  7. Pełna szerokość: zewnętrzny `<section className="w-full">`, wewnętrzny kontener `max-w-[1366px] mx-auto` zgodnie z designem.
  8. Wymagana zgodność wizualna **desktop @1366**; mobile pomijamy.
  9. **NIE importuj `React`** (Next 16 / TS strict — wyrzuca TS6133).
  10. **NIE wpisuj `</content></invoke>` na końcu pliku** — kończ czystym `}` (rev. 1 miała przypadki leakage tool-call XML).
  11. **NIE modyfikuj** `page.tsx`, `next.config.ts`, ani layoutów — tylko swój komponent + assety.
- **Output (raport do głównego agenta, ≤200 słów)**:
  - Ścieżka utworzonego pliku.
  - Lista assetów pobranych do `public/blocks-v2/<slug>/`.
  - Tier (1 lub 2) i powód, jeśli Tier 2.
  - Dla slugów ⚠️ — proponowana finalna nazwa.
  - Otwarte pytania / blockery.
- **Twardy zakaz**: tworzenia `config.ts`, `seed.ts`, edycji `RenderBlocks.tsx`, `payload.config.ts`, `Pages` collection ani jakichkolwiek plików Payload.

## Faza 3 — Składanie stron (główny agent, po każdym batchu inkrementalnie)

Po każdym ukończonym komponencie aktualizujemy odpowiednią `page.tsx`. **WAŻNE: bez `<main>` wrappera — root layout już go renderuje.**

```tsx
// src/app/(frontend)/test/v2/homepage/page.tsx
import type { Metadata } from 'next'
import HomepageHero from '@/blocks-v2/HomepageHero/Component'
import HomepageWyrozniki from '@/blocks-v2/HomepageWyrozniki/Component'
// ... pozostałe w kolejności z Figmy

export const metadata: Metadata = {
  title: 'V2 — Strona główna (hardcoded)',
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <>
      <HomepageHero />
      <HomepageWyrozniki />
      {/* ... */}
    </>
  )
}
```

Kolejność komponentów = kolejność z tabel powyżej (zgodna z Y w Figmie).

## Faza 4 — Weryfikacja end-to-end (NIE pomijać jak w rev. 1!)

Po KAŻDYM batchu (a nie tylko na końcu):

1. `pnpm exec tsc --noEmit` — zielono.
2. Chrome DevTools MCP:
   - `new_page http://localhost:3000/test/v2/homepage` (i pozostałe 2)
   - `resize_page width=1366 height=900`
   - `list_console_messages types=['error', 'warn']` — zero / 0
   - `evaluate_script` — zliczyć `document.querySelectorAll('main').length` (musi być 1!), `nav, header` (≤ liczba + globalnego, jeśli na nie-V2 nie ma globalnego = N), `footer` (1).
   - `take_screenshot fullPage=true` do `/var/folders/.../T/v2-<page>.png` i porównać z Figmą.
3. Wizualne porównanie z V1 (`/`, `/galeria`, `/o-mnie`) — sanity check.
4. `pnpm lint` — zielono. (W rev. 1 `pnpm exec next lint --dir` nie działało, użyć `pnpm lint` bez flag.)

## Krytyczne pliki

- **Tworzone**: 29 × `src/blocks-v2/<Slug>/Component.tsx`, 3 × `src/app/(frontend)/test/v2/<page>/page.tsx`, assety w `public/blocks-v2/<slug>/`.
- **Modyfikowane**: 
  - `src/app/(frontend)/test/page.tsx` (dodanie linków V2 z powrotem — `Link` import też trzeba przywrócić).
  - `src/app/(frontend)/layout.tsx` (warunek `isV2Test`).
  - `src/middleware.ts` (utworzenie/edycja, dodanie nagłówka `x-pathname`).
- **Już naprawione (zostaje z rev. 1)**: `next.config.ts` z `localPatterns: ['/blocks-v2/**']`.
- **Nietykane**: `src/blocks/`, `src/collections/`, `src/payload.config.ts`, `RenderBlocks.tsx`, wszystko CMS-owe, V1 strony.

## Rzeczy świadomie poza zakresem

- Konfiguracja Payload (pola, seed, kolekcje, RenderBlocks).
- Wersja mobilna i tablet (zostawiamy desktop @1366; w Figmie istnieją osobne canvasy 768/360, ale nie są w tej iteracji).
- Strony Kontakt, Polityka prywatności, Case study (szablon), Konkretna usługa (szablon) — istnieją w canvasie `1:3`, ale poza zakresem tej iteracji.
- Refaktor instances (Footer+Newsletter / Navbar / Instagram / CTA-section reuseowane między stronami — robimy 3 osobne kopie per-strona, dla porównania 1:1 z Figmą).
- Decyzja designerska o duplikacie „Kroki do realizacji oferty" na Stronie głównej — domyślnie implementujemy obie wersje (V1 i V2), oznaczamy w slugach. Jeśli user zdecyduje że tylko jedna ma być — wykasujemy drugą.

## Otwarte pytania (do potwierdzenia przed startem implementacji)

1. **Strona główna nie ma top-level Navbara** — czy Navbar jest częścią Hero (overlay)? Subagent #1 (HomepageHero) sprawdzi przez `get_design_context` i zaraportuje. Plan B: dodać osobny `HomepageNavbar` reusowany z Galeria/O mnie, jeśli potrzeba.
2. **Czy implementujemy obie wersje „Kroki" na Stronie głównej** (#4 i #6)?
3. **Czy slugi z ⚠️ wymagają zatwierdzenia przez usera przed implementacją**, czy główny agent decyduje na podstawie raportów subagentów?
