# Oczki fotografia — Analiza stron z Figmy

**Plik Figma:** [📷 Oczki fotografia (Copy)](https://www.figma.com/design/olYfq47eVG9IV0p5Fvyme5/%F0%9F%93%B7-Oczki-fotografia--Copy-)
**File key:** `olYfq47eVG9IV0p5Fvyme5`
**Data analizy:** 2026-05-06

---

## Spis treści

1. [Podsumowanie skali projektu](#-podsumowanie-skali-projektu)
2. [Globalne komponenty powtarzalne](#-globalne-komponenty-powtarzalne)
3. [Sugerowane kolekcje Payload CMS](#%EF%B8%8F-sugerowane-kolekcje-payload-cms)
4. [Specyfika designu — uwagi](#-specyfika-tego-designu)
5. [Sugerowana kolejność implementacji](#%EF%B8%8F-sugerowana-kolejność-implementacji)
6. [Estymacja skali](#-estymacja-skali)
7. **Szczegółowe raporty per strona:**
   - [1. Strona główna](#1-strona-główna--desktop-1366×8326px)
   - [2. O mnie](#2-o-mnie--desktop-1366×7049px)
   - [3. Galeria](#3-galeria--desktop-1366×5272px)
   - [4. Konkretna usługa (szablon)](#4-konkretna-usługa-szablon--desktop-1366×11545px)
   - [5. Case study (szablon)](#5-case-study-szablon--desktop-1366×8023px)
   - [6. Kontakt](#6-kontakt--desktop-1366×3731px)
   - [7. Polityka prywatności](#7-polityka-prywatności--desktop-1366×4406px)

---

## 📊 Podsumowanie skali projektu

| # | Strona | Wysokość | Sekcje | Złożoność | Workload | Link Figma |
|---|---|---|---|---|---|---|
| 1 | **Strona główna** | 8326px | 11 | wysoka | 🔴 wysoka | [Otwórz](https://www.figma.com/design/olYfq47eVG9IV0p5Fvyme5/?node-id=6724-13153) |
| 2 | **O mnie** | 7049px | 11 | wysoka | 🔴 wysoka | [Otwórz](https://www.figma.com/design/olYfq47eVG9IV0p5Fvyme5/?node-id=6972-15499) |
| 3 | **Galeria** | 5272px | 8 | średnia | 🟡 średnia | [Otwórz](https://www.figma.com/design/olYfq47eVG9IV0p5Fvyme5/?node-id=6912-13127) |
| 4 | **Konkretna usługa** (szablon) | 11545px | 12 | wysoka | 🔴 wysoka | [Otwórz](https://www.figma.com/design/olYfq47eVG9IV0p5Fvyme5/?node-id=6986-20106) |
| 5 | **Case study** (szablon) | 8023px | 11 | śr.-wysoka | 🟡 średnia | [Otwórz](https://www.figma.com/design/olYfq47eVG9IV0p5Fvyme5/?node-id=6952-17088) |
| 6 | **Kontakt** | 3731px | 5 | śr.-wysoka | 🟡 średnia | [Otwórz](https://www.figma.com/design/olYfq47eVG9IV0p5Fvyme5/?node-id=6884-13540) |
| 7 | **Polityka prywatności** | 4406px | 3 unikalne | niska | 🟢 niska | [Otwórz](https://www.figma.com/design/olYfq47eVG9IV0p5Fvyme5/?node-id=3668-4957) |
| **Σ** | | **48 352px** | **~61** | | | |

> Plus 14 layoutów responsywnych (tablet 768 + mobile 360 dla każdej strony) = **21 layoutów łącznie**.

---

## 🧩 Globalne komponenty powtarzalne

To są kandydaci do zbudowania **najpierw** — uderzą wszędzie:

| Komponent | Występuje na |
|---|---|
| **Navbar** | wszystkie 7 stron |
| **Footer + Newsletter** | wszystkie 7 stron |
| **Breadcrumbs** | 6/7 stron (oprócz strony głównej) |
| **Button** (primary/secondary) | wszystkie |
| **FAQ** (sekcja) | Galeria, Konkretna usługa, Kontakt |
| **CTA-section** | Strona główna, O mnie, Konkretna usługa |
| **Instagram** | Strona główna, O mnie |
| **Opinie / Testimonials** | Strona główna, Konkretna usługa, Case study |
| **Kroki do realizacji** | Strona główna, O mnie, Konkretna usługa, Case study |
| **Galeria** (component) | Strona główna, Galeria, Case study |
| **Accordion** | Konkretna usługa, Kontakt, FAQ |

---

## 🗄️ Sugerowane kolekcje Payload CMS

**Główne kolekcje:**
- `Pages` — strony statyczne (Strona główna, O mnie, Galeria) z block builderem
- `Services` — szablon "Konkretna usługa" (block builder + pricing packages)
- `CaseStudies` — szablon case study (block builder + galeria mozaikowa)
- `GalleryPhotos` — pojedyncze zdjęcia z relacją do kategorii
- `SessionCategories` — taksonomia (newborn, ślubne, ciążowe, biznesowe...)
- `Reviews` — opinie klientów (z relacją do usługi)
- `FAQ` — pytania (z relacją do kontekstu/usługi)
- `LegalPages` — polityka, regulamin, cookies (jeden szablon)
- `ContactSubmissions` — zapytania z formularza
- `Media` — biblioteka assetów

**Globals:**
- `Navigation` — menu top
- `Footer` — kolumny linków
- `ContactInfo` — dane kontaktowe, social
- `ProcessSteps` — kroki współpracy (jeśli te same wszędzie)

---

## 🎨 Specyfika tego designu

1. **Bardzo dużo dekoracyjnego SVG** — botaniczne "OBJECTS", perforacje filmu, kolaże, ozdobne ramki. Wszystko **eksportować jako gotowe SVG**, nie odtwarzać w DOM (np. perforacja filmu = ~270 elips, render byłby śmiercią).
2. **Mozaikowa galeria** w Case study (zdjęcia o różnych rozmiarach: small/wide/tall) — wymaga pola `layout` na każdym zdjęciu w block builderze.
3. **3 breakpointy** (1366/768/360) — desktop najbogatszy, mobile uproszczony. Mobile-first podczas budowania.
4. **Statyczne tła z teksturą** (np. brown-paper na Kontakt) — raster, nie generuj.
5. **8326px+ stron** — performance budget musi uwzględniać lazy loading + virtualizację sekcji poniżej fold.

---

## 🛣️ Sugerowana kolejność implementacji

```
Faza 0: Setup
  └─ Next.js + Payload + Tailwind + design tokens (z Figma variables)

Faza 1: Atomic foundation (1-2 tyg)
  └─ Atomy: Button, Input, Pill, Badge, Checkbox, Accordion
  └─ Code Connect mapping dla atomów
  └─ Globalne: Navbar, Footer+Newsletter

Faza 2: Globalne sekcje (1 tydz)
  └─ FAQ, CTA-section, Instagram, Opinie, Kroki, Galeria-component
  └─ Code Connect dla nich

Faza 3: Strony statyczne (1-2 tyg)
  └─ Polityka prywatności (LegalPages template)
  └─ Kontakt (formularz + integracja maila)
  └─ Galeria (filtry + lightbox)

Faza 4: Strony content-heavy (2 tyg)
  └─ Strona główna
  └─ O mnie

Faza 5: Szablony CMS (2-3 tyg) — najbardziej skomplikowane
  └─ Services (block builder)
  └─ CaseStudies (block builder + galeria mozaikowa)
```

---

## 💰 Estymacja skali

To jest projekt **średniej-dużej skali**:
- **~60-80h** czystej implementacji frontendu (przy znajomości stacka)
- **+20-30h** na konfigurację Payload (kolekcje, bloki, access control, formularze)
- **+10-20h** na assety, optymalizację obrazów, SEO, accessibility
- **+10h** na 3 breakpointy

**Łącznie: ~100-140h pracy** (może mniej z dobrym wykorzystaniem `get_design_context` + Code Connect).

---
---

# Szczegółowe raporty per strona

---

## 1. Strona główna — Desktop (1366×8326px)

**Node ID:** `6724:13153`
**Link Figma:** https://www.figma.com/design/olYfq47eVG9IV0p5Fvyme5/?node-id=6724-13153

### Rola strony
Główne wejście do portfolio fotografa Oczki — buduje pierwsze wrażenie, prezentuje ofertę usług, najlepsze prace, dowody społeczne (opinie, Instagram) i prowadzi użytkownika do kontaktu/rezerwacji sesji.

### Sekcje (od góry do dołu)
1. **Hero / Navbar (0–640px)** — pełnoekranowy banner ze zdjęciem tła, navbar (logo + linki menu) na górze, główny nagłówek, podtytuł i prawdopodobnie CTA. Rola: pierwsze wrażenie wizualne.
2. **Sekcja "O mnie" / Intro z cytatem (640–1244px)** — układ dwukolumnowy: blok tekstowy po lewej (nagłówek + akapit, ~514px szerokości) oraz "Image and Quote Container" po prawej (zdjęcie portretowe + cytat, ~533px). Krótkie przedstawienie fotografa.
3. **Wyróżniki / Oferta — karty usług (1244–2233px)** — siatka kart z "Product Title" i "Text" (powtarzający się wzorzec ~258–278px szerokości). Co najmniej 5–6 kart prezentujących typy sesji (np. ślubne, rodzinne, plenerowe).
4. **Kroki do realizacji oferty #1 (2318–3011px)** — sekcja procesu/kroków: nagłówek (~535px) + kontener 1302×301px z poziomym wierszem kroków (numerowane karty z opisem).
5. **Galeria (3011–3889px)** — sekcja prezentacji prac (878px wys.); prawdopodobnie masonry/grid lub slider z większymi zdjęciami portfoliowymi.
6. **Kroki do realizacji oferty #2 (3889–4779px)** — druga, większa sekcja procesowa (890px wys.) — może to być rozszerzona prezentacja workflow lub pakiety/cennik.
7. **Opinie / Testimonials (4779–5329px)** — sekcja opinii klientów (550px wys.), zwykle slider/karuzela z kilkoma cytatami.
8. **Proces (5329–6059px)** — sekcja "OBJECTS" (543×617 po prawej) + lewa kolumna z tekstem; prezentacja workflow z grafiką dekoracyjną.
9. **Instagram (6059–6482px)** — feed/kafelki z najnowszych postów IG (423px wys.), 4–6 miniatur w rzędzie.
10. **CTA-section (6482–7076px)** — duża sekcja konwersyjna (594px wys.) z mocnym wezwaniem do działania (formularz lub przycisk kontaktowy).
11. **Footer + Newsletter (7076–8326px)** — zapis na newsletter, kolumny linków, dane kontaktowe, social media, copyright (1250px — wysoki, rozbudowany).

### Powtarzalne komponenty
- **Karta usługi/produktu** ("Product Title" + "Text", ~278×140px) — wielokrotnie w sekcji Wyróżniki
- **Krok procesu** — numerowana karta w sekcjach "Kroki do realizacji"
- **Karta opinii** — w sekcji Opinie (slider/grid)
- **Kafelek galerii / Instagram** — miniatura zdjęcia z hover
- **Przycisk CTA** (primary + secondary)
- **Navbar** (logo + menu)
- **Formularz newslettera** (input + button)
- **Para Title + Paragraph** — wielokrotnie używany blok tekstowy

### Typy treści
- **Statyczne**: nawigacja, nagłówki sekcji, etykiety przycisków, copyright
- **Dynamiczne (CMS)**:
  - lista usług/ofert (kolekcja Services)
  - kroki procesu (kolekcja lub repeater w globalnym Settings)
  - galeria portfolio (kolekcja Photos / Projects)
  - opinie klientów (kolekcja Testimonials)
  - feed Instagram (integracja API lub ręczna kolekcja)
  - hero (global lub field na Homepage)
  - formularz newslettera (integracja np. Mailerlite/Resend)
  - dane kontaktowe + social (global Settings)
- **Zdjęcia**: 1 hero (1366×648), 1 portretowe w intro, ~6+ w galerii, 4–6 w feedzie IG, dekoracyjne w sekcji Proces — łącznie 15–25+ zdjęć

### Ocena złożoności
- **Liczba sekcji**: 11
- **Złożoność wizualna**: wysoka — strona ma 8326px wysokości, dwie podobne sekcje "Kroki", sekcję "Proces" z dekoracyjnym OBJECTS, oraz heavy footer
- **Specjalne efekty / interakcje**: hero z dużym zdjęciem (lazy loading, LCP), galeria (lightbox/slider), karuzela opinii, hover-states na kafelkach IG i kartach usług, prawdopodobnie scroll-reveal/parallax, formularz newslettera z walidacją
- **Estymacja workload**: wysoka — 11 sekcji, dużo dynamicznej treści wymagającej kolekcji w Payload, integracja IG, optymalizacja obrazów

### Uwagi do implementacji
- Dwie sekcje "Kroki do realizacji oferty" — sprawdzić czy to świadome powtórzenie czy dwie różne sekcje (oferta vs proces). Warto zrobić jeden reużywalny block.
- Hero 1366×648 — kluczowe dla LCP, użyć `next/image` z `priority` i `fetchPriority="high"`
- Galeria + Instagram + sekcja Proces — wszystkie wymagają integracji z assetami; rozważyć Payload + Cloudflare Images / Vercel Blob
- Feed Instagram — wybrać strategię: Graph API (wymaga tokena) lub manualna kolekcja w CMS
- Footer (1250px) jest bardzo wysoki — prawdopodobnie zawiera duży newsletter + pełną mapę strony — można wynieść jako globalny komponent
- Strona idealnie pasuje do architektury blocks/layout w Payload (każda sekcja jako block z własnymi polami)

---

## 2. O mnie — Desktop (1366×7049px)

**Node ID:** `6972:15499`
**Link Figma:** https://www.figma.com/design/olYfq47eVG9IV0p5Fvyme5/?node-id=6972-15499

### Rola strony
Strona prezentacyjna fotografa: buduje zaufanie poprzez biografię, podejście do pracy, statystyki doświadczenia, wartości, proces współpracy oraz społeczny dowód słuszności (Instagram, CTA, newsletter).

### Sekcje (od góry do dołu)
1. **Navbar** (instancja, 1366×68) — globalna nawigacja.
2. **Page / Header + Hero wprowadzający** (1366×612) — Breadcrumbs (32,4), tytuł (496×74) + opis (496×96) + przycisk CTA (121×44) wycentrowane; po lewej duży obraz portretowy (364×478, zaokrąglony), po prawej mniejszy obraz (411×251), dekoracyjna ikona (96×96) oraz złożona dekoracyjna grafika "OBJECTS" (227×328, ~30 zagnieżdżonych grup wektorów — prawdopodobnie ilustracja botaniczna/aparat).
3. **Herosection — statystyki/wartości** (1366×576, y=680) — nagłówek (subheading 514×66 + tekst 442×72) i 3 karty w rzędzie (3×297×~150) z subtytułem i opisem (np. "lat doświadczenia / sesji / klientów").
4. **"Navbar" — Galeria zdjęć z dekoracjami** (1366×618, y=1256) — sekcja z tytułem (530×37 + tekst 442×24) i 4 polaroidowymi miniaturami (~294×245) ułożonymi poziomo. Otoczona dekoracyjnymi ramkami z **siatką ~22×6 = ~132 elipsy 64×64** (dziurkowanie filmu fotograficznego po obwodzie).
5. **Main Container — Wartości/Filary** (1366×634, y=1874) — nagłówek (442×154) + 4 karty (4×~320×219) z dekoracyjnym tłem złożonym z ~18 pionowych pasków, tytułem, opisem i wektorową strzałką.
6. **Image — duży banner zdjęciowy** (1366×723, y=2508) — pełnoszerokościowy fotograficzny separator.
7. **Main container — sekcja "obraz + lista"** (1366×892, y=3231) — po lewej duży obraz (555×764 w ramce 683×892), po prawej tytuł (523×74) + tekst wprowadzający (523×120) + subtytuł oraz 3 bloki listy (każdy z subtytułem 491×24 i tekstem 491×63–84) — np. "moje podejście / styl / specjalizacje".
8. **Kroki do realizacji oferty** (1366×659, y=4123) — nagłówek (442×178) + 3 karty kroków (~420×257) z numerem (elipsa 25×25), subtytułem, opisem i ikoną/grafiką "OBJECTS"; obok dekoracyjny rendered obraz (193×242 — Gemini-generated).
9. **Instagram** (instancja, 1366×423, y=4782) — sekcja społecznościowa.
10. **CTA-section** (instancja, 1366×594, y=5205) — wezwanie do działania.
11. **Footer + Newsletter** (instancja, 1366×1250, y=5799) — stopka z formularzem zapisu.

### Powtarzalne komponenty
- **Navbar** (instancja `7091:5157`)
- **Breadcrumbs** (instancja `7105:15357`)
- **Button** (instancja `7063:14497`)
- **Instagram**, **CTA-section**, **Footer+Newsletter** (instancje globalne)
- **Karta wartości** (×4, sekcja 5) z dekoracyjnymi paskami
- **Karta statystyki** (×3, sekcja 3)
- **Karta kroku** (×3, sekcja 8) z numerem w elipsie
- **Polaroid/Miniatura zdjęcia** (×4, sekcja 4)
- **Element dekoracyjny "elipsa 64×64"** (perforacja filmu, ~270 instancji łącznie)

### Typy treści
- **Statyczne**: tytuły sekcji, opisy biograficzne, kroki współpracy, dekoracje wektorowe.
- **Dynamiczne (CMS — Payload)**: bio fotografa, statystyki (rok startu / liczba sesji), lista wartości (4 karty), lista kroków (3 karty), lista podejść/specjalizacji (3 bloki), feed Instagram (auto), newsletter.
- **Zdjęcia**: ~7 miejsc na zdjęcia — 2 portretowe w hero (sekcja 2), 4 miniatury w galerii (sekcja 4), 1 banner pełnoszerokościowy (sekcja 6), 1 duży portret (sekcja 7), 1 generatywny obraz dekoracyjny (sekcja 8).

### Ocena złożoności
- **Liczba sekcji**: 11 (w tym 5 instancji współdzielonych)
- **Złożoność wizualna**: **wysoka** — bogata warstwa dekoracyjna (perforacja filmu z setek elips, ilustracja "OBJECTS" złożona z ~30 grup wektorów, paski w kartach wartości, asymetryczny hero), wiele wariantów kart (statystyki / wartości / kroki / lista).
- **Specjalne efekty**: dekoracje SVG (perforacja filmu, paski, strzałki), zaokrąglone obrazy, prawdopodobny scroll/parallax na bannerze, hover na kartach.
- **Estymacja workload**: **wysoka** — najobszerniejsza strona portfolio (7049 px), 4 unikalne typy kart, dużo precyzyjnej grafiki dekoracyjnej.

### Uwagi do implementacji
- Wyodrębnij komponenty kart: `<StatCard>`, `<ValueCard>`, `<StepCard>`, `<PolaroidThumb>`, `<ApproachListItem>` — każdy zasilany z osobnej kolekcji/array w globalu CMS.
- Dekoracyjne perforacje filmu (sekcja 4) zaimplementuj jako pojedynczy SVG pattern lub `repeating-radial-gradient` — nie renderuj 270 osobnych elips.
- Dekoracja "OBJECTS" (hero, sekcja 8) — eksportuj jako pojedynczy zoptymalizowany SVG; nie odtwarzaj ręcznie.
- Sekcja "O mnie" (treść biograficzna, sekcja 7) powinna być Rich Text z Payload (zachować formatowanie).
- Pełnoszerokościowy banner (sekcja 6) — kandydat do `next/image` z `priority={false}`, `sizes="100vw"`, lazy loading.
- Hero (sekcja 2): asymetryczny układ — użyj CSS Grid 12-kolumnowego, breadcrumbs sticky pod navbarem.
- Reużyj wspólnych instancji (Navbar, Breadcrumbs, Button, Instagram, CTA, Footer+Newsletter) z istniejących komponentów strony głównej.
- Rozważ wirtualizację/lazy mount sekcji poniżej fold (strona ma 7049 px wysokości).

---

## 3. Galeria — Desktop (1366×5272px)

**Node ID:** `6912:13127`
**Link Figma:** https://www.figma.com/design/olYfq47eVG9IV0p5Fvyme5/?node-id=6912-13127

### Rola strony
Strona portfolio z galerią prac fotografa, podzielona na kategorie/typy sesji (filtrowanie pigułkami), z lightboxem i sekcjami wspierającymi (FAQ, proces współpracy, CTA). Pełni rolę głównego "showcase'u" stylu i zakresu usług.

### Sekcje (od góry do dołu)
1. **Navbar** (1366×68) — globalna nawigacja (instancja komponentu).
2. **Breadcrumbs** (1366×52, 32px padding) — okruszki nawigacyjne (Strona główna / Galeria).
3. **Herosection** (1366×354) — nagłówek H1 + podtytuł (547px szer., wycentrowany), dekoracyjne grafiki/ilustracje po bokach, oraz **kontener filtrów typu sesji** (5 pigułek: 113/144/127/149/118 px — np. "Newborn", "Rodzinne", "Ciążowe", "Dzieci", "Pary").
4. **Galeria zdjęć** (1366×1405) — siatka 4 kolumn × 3 rzędy (12 kart 318×395 px, gap 10/10) + przycisk **"Więcej zdjęć"** (143×44) na dole. Klasyczny grid, nie masonry.
5. **Sekcja CTA / informacyjna** (1366×617) — ilustracja po lewej (~691px), tekstowy blok po prawej (460×263: tytuł + akapit), dodatkowa grafika dekoracyjna w prawym górnym rogu.
6. **FAQ** (1366×920) — instancja globalnego komponentu FAQ.
7. **Proces** (1366×606) — sekcja z dekoracyjną ramką (zaokrąglona, 4 ozdobne elipsy w narożnikach, ikony wektorowe), nagłówek + tekst (502px) + przycisk CTA (148×44).
8. **Footer + Newsletter** (1366×1250) — instancja globalna.

### Powtarzalne komponenty
- `Navbar` (instancja globalna)
- `Breadcrumbs`
- `Pill` ×5 (filtry kategorii sesji)
- `Card` ×12 (karty galerii 318×395, jednolite)
- `Button` ×2 ("Więcej zdjęć", CTA w sekcji Proces)
- `FAQ` (instancja globalna)
- `Footer+Newsletter` (instancja globalna)

### Typy treści
- **Statyczne**: nagłówki sekcji, opisy (FAQ, proces, sekcja CTA), tekst hero, etykiety pigułek filtrów, dekoracyjne ilustracje/wektory.
- **Dynamiczne (CMS)**: zdjęcia w galerii (kolekcja `Photos`/`GalleryItems` z relacją do kategorii sesji), kategorie sesji (taksonomia), pytania FAQ, ewentualnie kroki procesu.
- **Zdjęcia**: 12 widocznych miniatur w siatce 4×3 (318×395, proporcja ~4:5 portretowa) + przycisk doładowania kolejnych. Układ: regularna siatka CSS Grid (nie masonry), wszystkie karty identyczne.

### Ocena złożoności
- **Liczba sekcji**: 8
- **Złożoność wizualna**: średnia — układ siatki jest prosty, ale dochodzi sporo dekoracji wektorowej (hero, sekcja CTA, ramka procesu z 4 elipsami i ikonami w narożnikach).
- **Specjalne efekty**: filtrowanie po kategoriach (pigułki), lightbox/modal po kliknięciu w kartę, lazy loading miniatur, paginacja/load-more przyciskiem ("Więcej zdjęć"), hover na kartach, prawdopodobnie animacje wejścia (fade-in przy scrollu).
- **Estymacja workload**: średnia — galeria + filtrowanie + lightbox + integracja z CMS to gros pracy; reszta sekcji to instancje istniejących komponentów.

### Uwagi do implementacji
- **Układ galerii**: CSS Grid `grid-template-columns: repeat(4, 1fr)` z gapem ~10px, kafle o stałej proporcji (aspect-ratio 318/395 ≈ 4:5). Na mniejszych breakpointach przejść na 3/2/1 kolumny.
- **Filtrowanie**: 5 pigułek w hero (Session type options container) — stan aktywnej pigułki + filtr kliencki lub server-side (Payload query po `category`). Rozważyć "Wszystkie" jako pierwszą pigułkę (w metadanych jest 5 sztuk — sprawdzić czy odpowiada to liczbie kategorii bez "wszystkie").
- **Lightbox**: kliknięcie karty otwiera modal z pełnowymiarowym zdjęciem + nawigacja (poprzednie/następne, klawiatura, swipe).
- **Load more**: przycisk "Więcej zdjęć" — preferować paginację (np. po 12) lub infinite scroll. Payload `limit`+`page` w Local API.
- **CMS**: kolekcja `GalleryPhotos` z polami: `image` (upload), `category` (relationship → `SessionCategories`), `order`, `featured`. Strona `/galeria` jako Page z relacją do kategorii.
- **Performance**: `next/image` z `sizes="(max-width:768px) 50vw, 25vw"`, blur placeholdery, eager dla pierwszych 4-8 kafli, lazy dla reszty.
- **Hero ozdoby**: złożone wektory (Group 6950:16699, 6950:16783) — wyeksportować jako SVG, nie odtwarzać w CSS.
- **Sekcja Proces**: dekoracyjna ramka z 4 elipsami w rogach i ikonami — wyeksportować całość jako jedno SVG tło zamiast kompozycji w DOM.

---

## 4. Konkretna usługa (szablon) — Desktop (1366×11545px)

**Node ID:** `6986:20106`
**Link Figma:** https://www.figma.com/design/olYfq47eVG9IV0p5Fvyme5/?node-id=6986-20106

### Rola strony
To uniwersalny SZABLON strony konkretnej usługi (np. sesja kobieca, ślubna, biznesowa, rodzinna), używany dla wielu instancji. Strona sprzedażowa: prezentuje ofertę, pakiety cenowe, proces, FAQ i CTA — celem jest konwersja użytkownika na zapytanie/rezerwację.

### Sekcje (od góry do dołu)
1. **Navbar** (h=68) — globalna nawigacja.
2. **Hero z breadcrumbs i głównym zdjęciem** (h=569) — lewa kolumna 598px: breadcrumbs (Home › Oferta › Sesje kobiece), tytuł usługi (H1), lead, CTA Button, pasek "Image list" z 14 okrągłymi miniaturkami (galeria sygnalizacyjna). Prawa kolumna 768px: duże zdjęcie usługi.
3. **Sekcja Intro/USP** (h=864) — tytuł sekcji + tekst wprowadzający, poniżej 3 bloki contentu (po 346px) z subtitle, ikoną ozdobną (OBJECTS) i opisem, oraz 1 obraz (241px) wpleciony pomiędzy.
4. **Cennik / Pakiety** (h=2204) — nagłówek "Header" z tytułem sekcji i CTA "Download" (PDF/Pricelist). 3 RZĘDY pakietów (po 640px), każdy: lewa kolumna z heading (z dekoracyjnym vector/numerem), 4 wiersze "tick + tekst" (cechy pakietu), cena (Heading) + Button "Wybierz/Zarezerwuj"; prawa kolumna — duże zdjęcie 683×640. W rzędzie 2 jest dodatkowo "Badge" (np. "Najpopularniejszy").
5. **Co zawiera / Checklist + FAQ-mini** (h=1721) — pasek dekoracyjny (14 rounded rectangles) na górze i dole. Lewa kolumna 650px: główne zdjęcie + zdjęcie owalne z dekoracyjnymi kropkami (OBJECTS). Prawa kolumna 538px: tytuł + lead, **6 punktów checklisty** (tytuł + opis + checkbox), oraz blok "Additional Information" z **4 rozwijanymi pozycjami** (accordion) — dodatkowe info / mini-FAQ.
6. **Sekcja "O fotografce / Process"** (h=1005) — duże zdjęcie po lewej (512px) + prawa kolumna z 3 sekcjami "Heading + tekst" (np. zalety, podejście, gwarancje) + 1 dodatkowa sekcja + Button CTA.
7. **Opinie** (h=587) — instance komponentu Opinie/Reviews (slider/grid).
8. **Kroki do realizacji oferty** (h=890) — instance, prezentacja procesu krok-po-kroku.
9. **Galeria** (h=905) — instance, galeria realizacji dla danej usługi.
10. **Proces / CTA z dekoracją** (h=562) — beżowe tło z dużymi grafikami dekoracyjnymi (OBJECTS — kwiaty/liście), kontener z głównym komunikatem, podtytułem i Button CTA (210×44), znaczek/odznaka (134×77).
11. **FAQ** (h=920) — instance, pełna sekcja Q&A.
12. **Footer + Newsletter** (h=1250) — instance globalna.

### Powtarzalne komponenty
- Navbar, Footer+Newsletter, Opinie, Kroki do realizacji oferty, Galeria, FAQ — wszystkie jako instancje globalne.
- Button (warianty primary/secondary, 121×44 i 210×44).
- Breadcrumbs, Tick icon, Checkbox, Chevron, Badge.
- "Pricing row" (3× powtórzony układ pakietu) — kandydat na komponent.
- "Checklist item" (6× w sekcji 5).
- "Accordion item" (4× w Additional Information).
- "Intro block" (3× w sekcji 3).

### Typy treści
- **Statyczne**: nawigacja, footer, ikony, dekoracje (OBJECTS — grafiki kwiatowe/listki, paski rounded-rectangles).
- **Dynamiczne (CMS)** — wszystko, co różni instancje:
  - **Tytuł usługi** (H1), slug, breadcrumb label, **lead/krótki opis**.
  - **Hero image** (główne) + **Image list** (14 miniatur okrągłych — galeria sygnalizacyjna).
  - **Intro section**: tytuł + opis + 3 bloki (subtitle, opis, ikona/grafika dekoracyjna) + 1 zdjęcie pomocnicze.
  - **Pakiety (repeater, min 3, dowolnie wiele)**: nazwa pakietu, ikona/numer, opcjonalny badge ("Polecany"), 4+ cechy (lista checked items), cena (string lub liczba + waluta), CTA label + link, zdjęcie pakietu, kolejność.
  - **Co zawiera (repeater)**: 6 pozycji checklisty (tytuł + opis), 2 zdjęcia (główne + dodatkowe), wstęp.
  - **Additional info (repeater accordion)**: tytuł + treść (richtext), n elementów.
  - **Sekcja "O usłudze / podejście"**: zdjęcie + 3-4 bloki tekstowe + CTA.
  - **Powiązane**: opinie filtrowane po usłudze, kroki procesu (mogą być globalne lub per-usługa), galeria realizacji (relacja do kolekcji Realizacje filtrowanych po usłudze), FAQ (relacja many-to-many lub per-usługa).
  - **CTA bottom**: tytuł, podtytuł, label, link.
  - **SEO**: meta title, meta description, OG image.
- **Zdjęcia**: ~6-10 unikalnych ról + 14 miniatur + 3 zdjęcia pakietów = łącznie ~25+ assetów.

### Ocena złożoności
- **Liczba sekcji**: 12 (najdłuższa strona w projekcie).
- **Złożoność wizualna**: WYSOKA — bogate dekoracje (OBJECTS — grafiki kwiatowe), paski rounded-rect, owalne kadrowanie zdjęć, badges, accordeony, repeater pakietów.
- **Specjalne efekty**: dekoracyjne grafiki SVG (OBJECTS), accordion dla "Additional Info", potencjalny lightbox dla galerii, sticky/scroll behaviors w hero.
- **Estymacja workload**: WYSOKA — najbardziej złożona strona projektu ze względu na liczbę unikalnych sekcji + 6 instancji globalnych komponentów + repeatery.

### Uwagi do implementacji
- **Modelowanie w CMS (Payload)**: kolekcja `Services` z polami statycznymi (title, slug, hero, lead, breadcrumbLabel, SEO) ORAZ **block builder (`layout` field)** dla powtarzalnych sekcji. Kluczowe bloki:
  - `IntroBlock` (tytuł + lead + array of 3 features + 1 image)
  - `PricingBlock` (array of packages — nazwa, badge, cechy[], cena, CTA, image)
  - `ChecklistWithImageBlock` (2 obrazy + array of items + accordion items)
  - `AboutBlock` (zdjęcie + array of text sections + CTA)
  - `CTABlock` z dekoracją (tytuł, podtytuł, button, badge)
  - Bloki-relacje: `RelatedReviewsBlock`, `ProcessStepsBlock`, `RelatedGalleryBlock`, `FAQBlock` (relationship do kolekcji `FAQ` / `Reviews` / `ProcessSteps` z opcją filtrowania per-service).
- Dzięki block builderowi każda usługa może mieć inną kolejność/zestaw sekcji (np. szybka usługa bez "kroków procesu").
- **Hero "Image list"** (14 miniatur) — array relacji do `media` z animowanym karuzelem; warto wyodrębnić jako pole top-level `heroThumbnails`.
- **Pricing**: rozważ osobną kolekcję `PricingPackages` z relacją back-ref do Service, aby umożliwić ponowne użycie pakietów lub porównywanie.
- **Performance**: 25+ obrazów, lazy-load + responsywne sizes obowiązkowe; strona 11545px = wysokie LCP risk dla hero.
- **i18n-ready**: wszystkie pola tekstowe w localized mode (PL/EN gdyby kiedyś).
- **Walidacja**: minimum 1 hero image, minimum 1 pakiet, slug unique.
- **Preview**: Live Preview Payload zalecany ze względu na wielość bloków.

---

## 5. Case study (szablon) — Desktop (1366×8023px)

**Node ID:** `6952:17088`
**Link Figma:** https://www.figma.com/design/olYfq47eVG9IV0p5Fvyme5/?node-id=6952-17088

### Rola strony
Szablon strony pojedynczego case study (np. konkretna sesja ślubna, plenerowa, biznesowa) — storytelling realizacji z dużą ilością zdjęć, opisem etapów współpracy oraz cross-sellingiem innych usług. Powtarzalny wzorzec dla wielu instancji generowanych z CMS.

### Sekcje (od góry do dołu)
1. **Navbar** (instance, h=68) — globalny komponent.
2. **Header z breadcrumbs i tłem** (h=631, y=68) — duże tło z obrazem (1366×648), breadcrumbs (Home / Kategoria / Tytuł), tytuł case study na obrazie.
3. **Sekcja "Kroki do realizacji oferty"** (h=415, y=699) — 4 kolumny "Section" (Subtitle + ikona/numerek), prawdopodobnie etapy realizacji: kontakt → planowanie → sesja → dostarczenie.
4. **Container — Intro/Story z dużym zdjęciem** (h=814, y=1114) — Image Container po lewej (768×638), Section Intro po prawej (Title + 2 podsekcje z Subtitle). Wprowadzenie do realizacji.
5. **Container — Hero wewnętrzny** (h=716, y=1928) — wewnętrzna Herosection (h=620): kompozycja 2 obrazów (470×287 i 256×319) + Title (515×74). Sekcja narracyjna/cytat/wyróżnienie.
6. **Galeria** (h=1960, y=2644) — Heading (480×66) + Image Gallery (1302×1698) z mozaiką 12 zdjęć w mieszanym układzie (małe 318×395 i szerokie 646×395) + przycisk "Pokaż więcej" w stopce galerii.
7. **Opinie** (instance Testimonial, h=550, y=4604) — globalny komponent z opiniami.
8. **Herosection — sekcja kontaktowa/CTA** (h=596, y=5154) — Heading (Title + Description 591×132) + Image Container (280×331) + Button. Prawdopodobnie "Zarezerwuj swoją sesję" / kontakt.
9. **Card Container — wyróżnione zdjęcia** (h=436, y=5750) — 3 zdjęcia 318×395 w rzędzie obok Heading (292×99). Cross-promocja.
10. **Inne usługi** (h=587, y=6186) — sekcja powiązanych ofert.
11. **Footer + Newsletter** (instance, h=1250, y=6773) — globalny komponent.

### Powtarzalne komponenty
- Navbar, Footer+Newsletter, Opinie (Testimonials), Button, Breadcrumbs, Card zdjęcia (318×395), Section Header z numerem/ikoną i Subtitle.

### Typy treści
- **Statyczne**: Navbar, Footer+Newsletter, breadcrumbs (auto z hierarchii), Opinie (jeśli globalne), bloki "Inne usługi".
- **Dynamiczne (CMS)** — MUSI być edytowalne:
  - Tytuł case study, slug, kategoria/usługa, klient, data realizacji, lokalizacja
  - Obraz hero (1366×648) + alt
  - Lista "Kroków realizacji" (4 elementy: ikona/numer + tytuł + opis) — najlepiej array
  - Sekcja Intro: tytuł + 2 podsekcje tekstowe + zdjęcie boczne
  - Sekcja narracyjna: tytuł + 2 zdjęcia kompozycyjne (block)
  - Galeria zdjęć (12+ w mozaice mieszanej; różne rozmiary — small/wide/tall) — array obrazów z polem "rozmiar/układ"
  - Sekcja CTA: tytuł, opis, obraz, label przycisku, link
  - Powiązane realizacje / inne usługi (relacja).
- **Zdjęcia**: ~18+ na stronę. Role: hero (1×), intro (1×), narracyjne (2×), galeria mozaikowa (12×), CTA (1×), card row (3×).

### Ocena złożoności
- **Liczba sekcji**: 11 (z czego 3 globalne).
- **Złożoność wizualna**: średnio-wysoka — mozaika z mieszanymi rozmiarami zdjęć, kilka wariantów layoutów obraz/tekst, dwa wewnętrzne "hero".
- **Specjalne efekty**: lazy-load galerii, lightbox/modal dla zdjęć, "Pokaż więcej", potencjalne parallax na hero.
- **Estymacja workload**: średnia (galeria mozaikowa + block builder podnoszą czas).

### Uwagi do implementacji
- **Modelowanie w CMS (Payload)**: kolekcja `CaseStudies` z polami top-level (tytuł, slug, klient, kategoria-relacja, data, hero image, intro). Główna treść jako **block builder** z blokami: `StoryBlock` (tekst + zdjęcie boczne), `NarrativeBlock` (tytuł + 2 zdjęcia), `GalleryBlock` (array zdjęć z polem `layout: small|wide|tall`), `StepsBlock` (lista kroków), `CtaBlock`. Sekcje "Opinie" i "Inne usługi" jako globalne komponenty / relacje.
- Galeria mozaikowa: rozważyć grid 4-kolumnowy z `colSpan` na zdjęcie zamiast sztywnych pozycji.
- "Kroki realizacji" mogą być globalne (te same dla każdej kategorii usługi) — warto sparametryzować przez relację do kategorii.
- SEO: pola `seoTitle`, `seoDescription`, `ogImage`. Strukturalne dane `CreativeWork`/`Article`.
- Zdjęcia: wymagane `alt`, warianty rozmiarów (Sharp/Next Image), focal point dla cropowania mozaiki.

---

## 6. Kontakt — Desktop (1366×3731px)

**Node ID:** `6884:13540`
**Link Figma:** https://www.figma.com/design/olYfq47eVG9IV0p5Fvyme5/?node-id=6884-13540

### Rola strony
Strona kontaktowa z formularzem zapytania o sesję, sekcją informacji organizacyjnych (cennik/przygotowania w formie FAQ), pełnym blokiem FAQ i stopką z newsletterem. Główny cel konwersji: wysłanie zapytania przez formularz.

### Sekcje (od góry do dołu)
1. **Navbar** (1366×68) — globalny komponent nawigacji.
2. **Hero z formularzem** (1366×688, tło "brown-paper-texture") — Topbar z breadcrumbs ("Strona główna / Kontakt"), po lewej tytuł sekcji + akapit wprowadzający, w centrum duża dekoracyjna ilustracja (kolaż wektorowych obiektów/ikon — ok. 20 grup), po prawej karta formularza kontaktowego otoczona dekoracyjnymi kropkami (ellipses) z czterech stron.
3. **Sekcja "O sesji"/Informacje** (1366×897) — duży nagłówek wyśrodkowany, dwukolumnowy układ: ilustracja po lewej (boolean-operation/SVG), po prawej blok tekstu (nagłówek + akapit) oraz dwa rozwijane akordeony (Expandable Section z ikoną strzałki) + tekst zamykający z przyciskiem CTA.
4. **FAQ** (1366×828) — instancja wspólnego komponentu FAQ.
5. **Footer + Newsletter** (1366×1250) — wspólny komponent stopki z newsletterem.

### Powtarzalne komponenty
- `Navbar`, `Footer+Newsletter`, `FAQ` (instancje globalne)
- `Breadcrumbs`
- `Pill` (×7 — opcje typu sesji)
- `Input` (×3), `Checkbox` (×1), `Button` (×2)
- `Expandable Section` (akordeon) — używana w FAQ i sekcji informacyjnej

### Typy treści
- **Statyczne**: tytuł sekcji, akapit wprowadzający, etykiety formularza, teksty CTA, dekoracje (ilustracja kolażowa, kropki).
- **Dynamiczne (CMS)**: opcje typu sesji (lista pillów), akordeony informacyjne, FAQ — wszystko warte wyniesienia do Payload (kolekcja `faq` + global `contactPage` z polami: heading, intro, sessionTypes[], infoSections[]).
- **Formularz**: 7 pillów wyboru typu sesji (toggle/multi-select), 2 inputy jednoliniowe (najpewniej imię + email/telefon), 1 textarea (wiadomość), 1 checkbox (RODO/zgoda), przycisk wyślij. W designie nie widać widocznych komunikatów walidacji.
- **Zdjęcia/grafiki**: brak fotografii — strona oparta na ilustracjach wektorowych (kolaż obiektów w hero, ilustracja w sekcji informacyjnej) i teksturze tła brown-paper.

### Ocena złożoności
- **Liczba sekcji**: 5 (3 unikalne + 2 współdzielone).
- **Złożoność wizualna**: średnio-wysoka — bogata dekoracyjna ilustracja w hero (ok. 20 grup wektorowych), ramki kropek wokół formularza z 4 stron, tekstura tła.
- **Specjalne efekty**: akordeony (animacja rozwijania), interakcja pill-toggle, layered SVG, możliwy parallax/floating elementów.
- **Estymacja workload**: średnia — formularz + walidacja + integracja maila to główny koszt; dekoracje to głównie statyczne SVG.

### Uwagi do implementacji
- **Backend formularza**: rekomendowana integracja z Payload CMS — kolekcja `contactSubmissions` (przechowywanie zapytań w panelu) + plugin `@payloadcms/plugin-form-builder` lub własny endpoint POST. Wysyłka maila przez `payload.sendEmail` (Resend/SMTP) — powiadomienie do fotografa + auto-odpowiedź dla klienta. Ochrona: honeypot + rate limit; opcjonalnie hCaptcha/Turnstile.
- Pillsy typu sesji jako multi-select lub single-select — sprecyzować z designerem.
- Wyeksportować ilustracje hero i sekcji "O sesji" jako zoptymalizowane SVG (jedno spłaszczone ID, lazy-load poniżej fold).
- Akordeony i FAQ powinny dzielić ten sam komponent `Accordion`.
- Tło brown-paper jako CSS background-image (raster) z `image-rendering: optimizeQuality`.
- Brak mapy w designie — nie implementować, mimo wstępnej sugestii w briefie.
- Breadcrumbs zasilane automatycznie z routingu Next.js.

---

## 7. Polityka prywatności — Desktop (1366×4406px)

**Node ID:** `3668:4957`
**Link Figma:** https://www.figma.com/design/olYfq47eVG9IV0p5Fvyme5/?node-id=3668-4957

### Rola strony
Strona prawna prezentująca politykę prywatności / RODO. Treść tekstowa w układzie dwukolumnowym z bocznym spisem treści (ToC) ułatwiającym nawigację po długim dokumencie.

### Sekcje (od góry do dołu)
1. **Navbar** (1366×68) — globalny komponent nawigacji.
2. **Header z Breadcrumbs** (1366×52) — okruszki nawigacyjne (np. Home / Polityka prywatności).
3. **Privacy-policy** (1366×3036) — główna sekcja w kontenerze 1206px:
   - **Lewa kolumna — ToC** (398×340): 7 pozycji "Section Title", pierwsza z ikoną (aktywna), wskazuje sticky spis treści.
   - **Prawa kolumna — treść** (670×2872): tytuł sekcji + opis, następnie 7 numerowanych bloków "Text+Header" z ikoną/numerem, tytułem, opisem oraz listami pod-sekcji (bullet z ikoną + tytuł + opis).
4. **Footer + Newsletter** (1366×1250) — globalny komponent stopki z newsletterem.

### Powtarzalne komponenty
- `Navbar`, `Footer+Newsletter`, `Breadcrumbs` — instancje globalne.
- `TocItem` (Header Container z ikoną i tytułem) — 7x.
- `Section` (Text+Header z numerowaną ikoną w "pill", tytułem i opisem) — 7x.
- `Subsection` (bullet/check + tytuł + opis) — wielokrotnie wewnątrz sekcji.

### Typy treści
- **Statyczne**: layout, ikony, breadcrumbs, struktura ToC.
- **Dynamiczne (CMS)**: cała treść (sekcje, opisy, listy, ToC) powinna być edytowalna w Payload — najlepiej jako kolekcja `LegalPages` z polem `richText` (Lexical) lub strukturalnym array `sections[{ title, description, items[] }]`. Alternatywnie MDX, ale CMS daje większą elastyczność dla nietechnicznego edytora.
- **Czy jest spis treści (ToC)**: TAK — lewa kolumna (398px) z 7 pozycjami, generowana automatycznie z nagłówków sekcji.

### Ocena złożoności
- **Liczba sekcji**: 7 numerowanych sekcji + nagłówek + ToC.
- **Złożoność wizualna**: niska — głównie typografia, brak grafik/galerii, jeden powtarzalny wzorzec wizualny (numer w pillu + tekst + lista bulletów).
- **Specjalne efekty**: sticky ToC, scroll-spy (podświetlanie aktywnej pozycji — pierwsza pozycja ma wyróżnioną ikonę), smooth-scroll do anchorów (`#section-1`...`#section-7`).
- **Estymacja workload**: niska — po wykonaniu komponentu `LegalPageTemplate` kolejne strony prawne są praktycznie darmowe.

### Uwagi do implementacji
- **Reużywalność templatki**: TAK — ten sam `LegalPageTemplate` (ToC + numerowane sekcje + bullety) obsłuży **regulamin** i **politykę cookies**. Wystarczy jedna kolekcja `LegalPages` w Payload ze slugiem (`polityka-prywatnosci`, `regulamin`, `polityka-cookies`) i strukturą `sections[]`.
- ToC generowany z `sections[].title` — automatyczne anchory ze slugifikacji.
- Scroll-spy w komponencie kliencie (IntersectionObserver) — ToC sticky `top-24`.
- Breadcrumbs dynamiczne na podstawie `title` strony.
- Ikony numerów w pillu i bullet ikony — zestaw lucide-react lub własne SVG z design system.
- Layout: na mobile ToC chowany w `<details>` lub na górze strony.
