# Oczki fotografia — wdrożenie CMS · instrukcja przekazania

> **Dla kogo:** osoba, która przejmie wdrożenie panelu CMS dla strony „Oczki fotografia".
> **Po co:** żebyś wszedł w projekt bez archeologii — co to jest, jak działa Payload, co już
> jest zrobione, co zostało, i na jakie pułapki uważać.
> **Status na dziś:** strona zbudowana 1:1 z projektu Figma. Część treści jedzie już z CMS,
> ale **oferta, galerie i strony „o mnie / kontakt / polityka" są zaszyte na sztywno w kodzie**
> i to jest do przeniesienia do panelu.

---

## 1. Co to za projekt

| | |
|---|---|
| **Typ** | Strona WWW studia fotograficznego (portfolio + oferta + blog) |
| **CMS** | **Payload CMS 3.84** (panel admina + API) |
| **Framework** | Next.js 16 (App Router, React 19) |
| **Baza danych** | Vercel Postgres |
| **Pliki/zdjęcia** | Vercel Blob Storage |
| **Język strony** | polski (`pl`) — przygotowane pod dodanie kolejnych języków |
| **Panel admina** | `/admin` |

Cały design powstał w **Figmie** i został odwzorowany w kodzie co do piksela. To ważne — w wielu
miejscach kod „pamięta" projekt graficzny (patrz pułapki w sekcji 8).

---

## 2. Payload CMS w pięć minut

**Payload to CMS, który żyje wewnątrz kodu aplikacji** (nie osobny serwis jak WordPress).
Definiujesz w plikach TypeScript, jakie masz typy treści, a Payload automatycznie generuje:

- **panel administracyjny** pod `/admin` (logowanie, formularze, upload zdjęć),
- **bazę danych** (tabele w Postgres),
- **API** (REST `/api/...` oraz GraphQL `/api/graphql`),
- **typy TypeScript** (`src/payload-types.ts`) — autouzupełnianie w kodzie.

Wszystko konfiguruje jeden plik wejściowy: **`src/payload.config.ts`**. To tam podpięte są
wszystkie kolekcje i globale (patrz niżej).

### Jak treść trafia na stronę
```
Edytor wpisuje treść w /admin
        ↓ (zapis do Postgres)
Strona (Next.js) pyta Payload o dane przez API
        ↓
Komponent React renderuje sekcję
```

---

## 3. Pojęcie kluczowe: Kolekcje vs Globale

To jedyne pojęcie, które MUSISZ zrozumieć, zanim cokolwiek ruszysz.

### Kolekcja (collection) — „wiele wpisów"
Lista rekordów tego samego typu. Każdy ma własną stronę / URL.
> Przykład: **Posty** na blogu — jest ich wiele, każdy ma swój slug i adres.
> W panelu widzisz listę i przycisk „Utwórz nowy".

### Global — „jeden wpis na całą stronę"
Pojedynczy zestaw treści, który występuje raz. Nie ma listy, nie ma „utwórz nowy" — wchodzisz
i edytujesz tę jedną instancję.
> Przykład: **Stopka** — jest jedna na całej stronie. **Menu nagłówka** — jedno.

**Reguła kciuka:** jeśli czegoś jest *wiele* (oferty, galerie, posty) → kolekcja.
Jeśli *jedno* na całą witrynę (stopka, ustawienia, menu) → global.

---

## 4. Co konkretnie jest w tym projekcie

### Kolekcje (`src/collections/`)
| Kolekcja | Slug | Do czego | Stan |
|---|---|---|---|
| **Pages** | `pages` | strony budowane z bloków (m.in. strona główna) | ✅ działa z CMS |
| **Posts** | `posts` | blog | ✅ działa z CMS |
| **OfferItems** „Oferty" | `offerItems` | usługi (sesje) | ⚠️ kolekcja istnieje, ale modeluje **tylko kafelek** — podstrona oferty czyta z kodu |
| **Galleries** „Galerie" | `galleries` | galerie / case studies | ⚠️ jw. — podstrona galerii czyta z kodu |
| **Media** | `media` | wszystkie zdjęcia (upload) | ✅ |
| **Categories** | `categories` | kategorie postów | ✅ |
| **Users** | `users` | konta do logowania w panelu | ✅ |

### Globale (`src/Header/`, `src/Footer/`, `src/SiteSettings/`)
| Global | Do czego |
|---|---|
| **Header** | menu nawigacji (max 6 linków) |
| **Footer** | stopka |
| **SiteSettings** „Ustawienia witryny" | kontakt (e-mail, telefon), social media, domyślne CTA „Pogadajmy", copyright |

> Wszystko to jest spięte w `src/payload.config.ts` w polach `collections: [...]` i `globals: [...]`.

---

## 5. Migracje i seed — jak treść/struktura trafia do bazy

### Co to jest migracja
Payload + Postgres trzymają strukturę bazy w **migracjach** (`src/migrations/`). Gdy zmienisz
schemat kolekcji (dodasz pole), musisz wygenerować migrację, która dopisze kolumnę w bazie.

Komendy:
```bash
pnpm payload migrate:create   # wygeneruj nową migrację po zmianie schematu
pnpm payload migrate          # zastosuj migracje do bazy
```

### „Auto-migracja" przy buildzie
W `package.json` build robi to automatycznie:
```json
"build": "pnpm payload migrate && next build"
```
Czyli **przy każdym deployu migracje odpalają się same** przed zbudowaniem strony. Nie trzeba
pamiętać o ręcznym odpaleniu na produkcji — wystarczy, że migracja jest w repo.

### Seed — wpychanie treści startowej
W `src/endpoints/seed/` jest gotowy mechanizm „zasiania" przykładowej treści (strona główna,
posty, zdjęcia). **Ten sam wzorzec wykorzystamy do automatycznego przeniesienia oferty i galerii
z kodu do bazy** — łącznie ze zdjęciami (patrz sekcja 7).

---

## 6. Mapa stron — co gotowe, co do zrobienia

### ✅ Już działa z CMS (zero roboty)
- **Strona główna `/`** — składana z bloków Payload
- **Blog** `/posts`, `/posts/[slug]`, paginacja
- **Wyszukiwarka** `/search`

### ⛔ Zaszyte na sztywno w kodzie → do przeniesienia do CMS
| Strona | Ile sekcji | Ciężar | Gdzie siedzi treść dziś |
|---|---|---|---|
| **`/oferta/[slug]`** (usługa) | 10 | 🔴 duży | `src/app/(frontend)/oferta/[slug]/constants.ts` + `constants.ts` komponentów |
| **`/galeria/[slug]`** (case study) | 9 | 🔴 duży | `src/app/(frontend)/galeria/[slug]/constants.ts` |
| **`/galeria`** (lista) | ~6 | 🟡 średni | `src/app/(frontend)/galeria/` |
| **`/o-mnie`** | 10 | 🟡 średni | `constants.ts` komponentów `About*` |
| **`/kontakt`** | 4 | 🟢 mały | komponenty `Contact*` (część danych już w SiteSettings) |
| **`/polityka-prywatnosci`** | 1 dokument | 🟢 mały | `polityka-prywatnosci/constants.ts` |

**Cały ciężar siedzi w ofercie i galerii szczegółowej** — to ~19 z ~30 sekcji. Reszta to drobnica.

---

## 7. Plan wdrożenia — pełne, docelowe rozwiązanie

> **Cel:** CMS obsługujący **wiele ofert i wiele galerii** — bo tak wygląda żywy serwis
> [oczkifotografia.pl](https://oczkifotografia.pl). To nie jest „jedna oferta na sztywno",
> tylko panel, w którym fotograf **sam dodaje kolejne usługi i realizacje bez programisty**.

### Co musi obsłużyć (na podstawie żywej strony)
Oferta — **4 rodzaje usług:**
- sesje kobiece / miłosne / rodzinne
- sesje wizerunkowe
- reportaże ślubne
- albumy i vouchery

Galerie (realizacje) — **pogrupowane w kategorie**. Co istotne, **kategorie już istnieją w kodzie**
jako filtry w `GalleryHero` (`src/components/GalleryHero/constants.ts`):
- `kobieca` — Sesja kobieca
- `wizerunkowa` — Sesja wizerunkowa
- `slubny` — Reportaż ślubny
- `narzezenska` — Sesja narzeczeńska
- `rodzinna` — Sesja rodzinna

> **Wniosek dla schematu:** kategoria galerii **najprawdopodobniej = jej oferta**. Kolekcja Galerie
> ma już pole `relatedOfferItem` (relacja do oferty) — galeria należy do usługi, a usługa definiuje
> typ. Filtry generują się z ofert, które mają galerie. Forma (relacja vs `select` vs tagi) to
> **pytanie otwarte — sekcja 10.1** (rekomendacja: relacja). Tak czy siak **trzeba podpiąć
> filtrowanie** (klik w pigułkę → zapytanie do Payload), bo dziś filtry są atrapą (pułapka 8.5).

### Dlaczego to NIE jest „przepisanie strony od zera"
Najważniejsza dobra wiadomość: **komponenty sekcji są już sterowane danymi przez props**
(`<OfferServiceHero data={...} />`). Wygląd jest oddzielony od treści. Nie ruszamy wyglądu —
podmieniamy tylko **źródło danych**: z pliku w kodzie na Payload. Dzięki temu „pełne" rozwiązanie
to nie więcej *rodzajów* roboty niż minimalne — to ta sama robota raz, a potem treść mnoży się
klikaniem w panelu.

### Architektura (na przykładzie Oferty — galeria analogicznie)
```
1. ROZSZERZYĆ kolekcję (OfferItems / Galleries)
   → OfferItems: dodać zakładki sekcji — Hero, Podejście, Pakiety, W cenie,
     Opieka, Opinie, Proces, Galeria, CTA, FAQ
   → Galleries: rozbudować o sekcje case-study + POLE KATEGORII
     (jedna zakładka = jedna sekcja; układ stron jest stały,
      więc grupy/tablice, NIE layout-builder z blokami)

2. WARSTWA MAPUJĄCA  (mapOfferItem.ts / mapGallery.ts)
   → funkcja: dokument z Payload  →  kształt, którego komponent już oczekuje
   → pola techniczne (patrz pułapki) doklejane z kodu, nie z CMS

3. PODMIANA ŹRÓDŁA w page.tsx + USUNIĘCIE starego mechanizmu
   USUNĄĆ: getOfferServiceBySlug() z jego "if (!SLUGS.includes(slug))"
           — to sztywna lista slugów w kodzie, ma zniknąć
   było:  getOfferServiceBySlug(slug)            // z constants.ts (do usunięcia)
   będzie: payload.find({ collection:'offerItems', where:{ slug }})
   → generateStaticParams ciągnie WSZYSTKIE slugi z bazy (nie z kodu)
   → strony list (/galeria, /oferta) listują wpisy z bazy

4. PODPIĄĆ FILTRY GALERII (dziś atrapa — patrz 8.5)
   → onFilterChange w GalleryHero → zapytanie do Payload
     where:{ relatedOfferItem }  (kategoria = oferta; patrz 10.1)
   → GalleryPortfolio renderuje wynik zapytania, nie statyczną listę
   → pigułki filtrów generowane z ofert, które mają galerie

5. SEED (automat)
   → skrypt bierze obecne dane z constants.ts (treść z Figmy)
   → wgrywa zdjęcia z public/figma/ do kolekcji Media
   → tworzy rekordy w bazie z poprawnymi relacjami (galerie z kategorią)
   (to wgrywa STARTOWĄ zawartość; kolejne oferty/galerie fotograf dodaje sam w panelu)

6. MIGRACJA + sprawdzenie w /admin + live preview
   → potem usunięcie starych plików constants.ts
```

**Galeria szczegółowa = ten sam wzorzec + kategoria.** Strony „o mnie / kontakt / polityka" są
prostsze (mniej tablic) i idą szybko po opanowaniu wzorca z oferty.

### Sugerowana kolejność (to faza pracy, nie ograniczenie zakresu)
Zakres jest pełny — poniżej tylko **kolejność**, żeby najpierw mieć działający, sprawdzony wzorzec:
1. **Plaster pionowy:** Oferta (cała kolekcja: wiele wpisów + mapper + render + auto-seed zdjęć).
   Po tym kroku znamy realne tempo „ile zajmuje jedna sekcja / jedna kolekcja".
2. **Galeria** — ten sam wzorzec + pole kategorii + strony list per kategoria.
3. Strony list (`/oferta`, `/galeria`), o-mnie, kontakt, polityka.
4. **Sprzątanie:** usunięcie martwych linków/stuba `/oferta` (patrz pułapka 8.2) — po CMS slugi
   będą prawdziwe, więc linki same się „naprawią", gdy treść powstanie w panelu.

---

## 8. ⚠️ Pułapki — przeczytaj zanim zaczniesz

To są rzeczy nieoczywiste, na które ktoś się nadzieje, jeśli go nie uprzedzić.

### 8.1 Rozbite nagłówki (`start` / `emphasis`) — zmiana tekstu psuje layout
Wiele sekcji ma nagłówek **pocięty na kawałki** pod design:
```ts
heading: {
  emphasis: 'Sesja kobieca',                          // wyróżniony kawałek
  start: ' w Krakowie, Przemyślu i okolicach — ...',  // reszta zdania
}
```
To **jedno zdanie**, wyświetlane dwoma różnymi czcionkami/kolorami. W panelu edytor zobaczy dwa
osobne pola i może nie wiedzieć, że to jedno zdanie ani gdzie biegnie podział.
> **Co z tym zrobić:** opisać oba pola w panelu (np. „część wyróżniona innym krojem") albo
> rozważyć scalenie w jeden richtext. Na start zostają dwa pola tekstowe z jasnym opisem.

### 8.2 Slugi są zahardkodowane — i część linków prowadzi w 404
W kodzie istnieją tylko **dwa** gotowe wpisy (po jednym z Figmy): `/oferta/sesje-kobiece`
i `/galeria/slub-justyny-i-krzysia`. Reszta to puste miejsca.

**W stopce są już linki do 4 ofert** — i co istotne, **wszystkie 4 to realne usługi z żywej
strony** (sekcja 7), więc to nie są „błędne" linki, tylko **strony jeszcze nie zbudowane**.
Dziś 3 z nich dają **404**:

| Link w stopce | Status |
|---|---|
| `/oferta/sesje-kobiece` | ✅ działa |
| `/oferta/reportaze-slubne` | ❌ 404 |
| `/oferta/sesje-wizerunkowe` | ❌ 404 |
| `/oferta/sesje-rodzinne` | ❌ 404 |

> **Co z tym zrobić:** po przejściu na CMS slugi będą pochodzić z bazy — wtedy albo dodać
> brakujące oferty, albo poprawić/ukryć martwe linki w stopce
> (`src/components/HomeFooterNewsletter/constants.ts`).

### 8.3 Wszystkie zdjęcia są z Figmy (`/figma/*.png`)
W `public/figma/` leży **211 plików (~227 MB)** — cały design wyeksportowany z Figmy. Dzielą się
na dwie kategorie:
- **~120 dekoracji** (kwiatki, ornamenty, ramki, ikony, `.svg`) → **zostają w kodzie na zawsze**,
  to element wyglądu, nie treść. Do CMS NIE idą.
- **~88 zdjęć treściowych** (duże PNG: portrety, galerie, zdjęcia pakietów) → **to one trafiają
  do CMS** jako upload do kolekcji Media.

> **Decyzja na teraz:** używamy zdjęć z Figmy jak są (to placeholdery z makiety). Dzięki temu
> migrację zdjęć da się **zautomatyzować skryptem** — wgrywa pliki z `public/figma/` do Media bez
> ręcznego klikania. Jeśli kiedyś fotograf da finalne zdjęcia — podmienia się je w panelu.

### 8.4 „Instalacja vs treść" — nie wszystko z kodu ma trafić do panelu
Połowa pól w `constants.ts` to nie treść, tylko parametry techniczne/layoutowe:
`imageCropClassName` (klasy Tailwind do kadrowania!), `figmaNodes`, `textureSrc`, `headingId`,
breadcrumbs, warianty desktop/tablet/mobile.

**DLACZEGO klasy Tailwind MUSZĄ zostać w kodzie (a nie w CMS) — to nie wybór, to ograniczenie
techniczne.** Projekt używa **Tailwind v4**, który działa w trybie JIT: przy *buildzie* skanuje
pliki źródłowe i generuje CSS **tylko dla klas, które fizycznie widzi w kodzie**. Klasa wpisana
przez klienta w panelu (np. `top-[-16.62%]`) trafia do bazy danych **po buildzie** — Tailwind nigdy
jej nie zobaczy, więc **odpowiedni CSS nie powstanie i styl po prostu nie zadziała**.
> **Wniosek:** stylowanie/layout (klasy Tailwind) musi być **zbudowane z kodu**. Dlatego pola typu
> `imageCropClassName` **zostają w kodzie** i są doklejane przez warstwę mapującą. Do CMS wystawiamy
> tylko prawdziwą treść (teksty, zdjęcia, ceny, linki CTA). Decyzję podejmuje się pole-po-polu przy
> każdej sekcji — to jest „niewidzialna" część roboty.

### 8.4a Konsekwencja: edytor rich text (WYSIWYG) to często ZŁY pomysł tutaj
Naturalny odruch przy CMS: „dajmy klientowi bogaty edytor tekstu, niech formatuje jak chce".
Dla tej strony to **pułapka** — i wynika wprost z punktu wyżej:
- Strona jest **zaprojektowana co do piksela** (konkretne kroje, rozbite nagłówki, odstępy) — to
  wszystko ubrane w **klasy Tailwind w komponentach**.
- Rich text produkuje **generyczny HTML/Lexical**, który nie zna tych klas. Efekt: albo wygląda
  „byle jak" (domyślne style), albo trzeba pisać konwertery mapujące treść na klasy — czego i tak
  nie da się sterować z bazy (patrz 8.4).
- Rich text daje też klientowi swobodę (pogrubienia, nagłówki, kolory), którą **łatwo rozjechać
  design**.
> **Reguła:** dla sekcji „designerskich" (oferta, galeria, o-mnie) → **proste pola tekstowe**, a
> wygląd narzuca komponent. Rich text zostawiamy tylko tam, gdzie treść jest naprawdę dowolną prozą
> i design nie jest krytyczny — np. **polityka prywatności** czy **treść posta na blogu**.

### 8.5 Filtry galerii to atrapa — klik nic nie filtruje
W `GalleryHero` jest pasek 5 pigułek-kategorii (`kobieca`, `wizerunkowa`, `slubny`, `narzezenska`,
`rodzinna` — plik `src/components/GalleryHero/constants.ts`). **Wyglądają jak działający filtr, ale
nie są:**
- kliknięcie tylko **podświetla** pigułkę (lokalny `useState` w `GalleryHeroFilters.tsx`),
- prop `onFilterChange` jest **opcjonalny i nigdzie nie podpięty** (`galeria/page.tsx` renderuje
  `<GalleryHero data={...} />` bez niego),
- siatka pod spodem (`GalleryPortfolio`) to **statyczna lista** — nie reaguje na wybór.

> **Co z tym zrobić:** to nie jest „bug do naprawy osobno" — to **część wdrożenia CMS**. Gdy galerie
> będą w Payload z polem `category`, podpinamy `onFilterChange` → zapytanie `where:{ category }` →
> siatka pokazuje przefiltrowane wpisy. Dopiero wtedy filtr zacznie cokolwiek robić.

### 8.6 Mechanizm ładowania oferty do usunięcia (sztywna lista slugów)
Dziś o tym, która oferta „istnieje", decyduje `if` w `oferta/[slug]/constants.ts`:
```ts
if (!OFFER_SERVICE_SLUGS.includes(slug)) return null   // → 404
return OFFER_SERVICE_PAGES[slug]                        // odczyt z obiektu w kodzie
```
To trzeba **wyrzucić w całości** i zastąpić zapytaniem do Payload. Po zmianie slugi pochodzą z bazy
(czyli z tego, co fotograf utworzył w panelu), a nie z listy w kodzie.

---

## 9. Decyzje już podjęte (żebyś nie zaczynał od zera)

- **Zakres:** pełne, docelowe rozwiązanie — **wiele ofert i wiele galerii** (jak na żywej stronie),
  fotograf dodaje kolejne wpisy sam w panelu. Startową treść (1 oferta + 1 galeria z Figmy)
  wgrywamy seedem; reszta to klikanie w panelu.
- **Kategorie galerii = oferta (rekomendacja):** zamiast osobnej listy kategorii wykorzystujemy
  istniejące pole `relatedOfferItem` — galeria należy do oferty, oferta definiuje typ, filtry
  generują się z ofert. Ostateczna forma (relacja / `select` / tagi) — **pytanie otwarte 10.1**.
- **Zdjęcia:** używamy placeholderów z Figmy; migracja zdjęć zautomatyzowana skryptem seed.
- **Modelowanie sekcji:** zakładki + grupy/tablice w kolekcji (NIE layout-builder), bo układ
  stron jest stały.
- **Kolekcja Oferty:** rozszerzamy istniejącą `OfferItems`, nie tworzymy nowej (obsłuży i kafelek
  na home, i podstronę).
- **Rozbite nagłówki:** na start dwa pola tekstowe z opisem.
- **Link CTA:** na start pole tekstowe z domyślną wartością (`/kontakt`), nie relacja.
- **Komponenty:** nie ruszamy — podmieniamy tylko źródło danych przez warstwę mapującą.

---

## 10. Pytania otwarte (do decyzji z klientem)

### 10.1 Skąd brać kategorię galerii?
Kluczowa obserwacja: **kategorie galerii pokrywają się z typami oferty** (kobieca, wizerunkowa,
ślubny, narzeczeńska, rodzinna ≈ usługi na żywej stronie). Stąd trzy podejścia:

| | Opcja A — `select` (w kodzie) | Opcja B — osobna kolekcja Kategorie | **Opcja C — kategoria = oferta (relacja)** |
|---|---|---|---|
| Źródło taksonomii | lista w kodzie | osobna kolekcja | **oferta (jedno źródło prawdy)** |
| Kto dodaje typ | programista (deploy) | klient w panelu | **klient — dodając ofertę** |
| Pigułki filtrów | sztywne w kodzie | dynamiczne z kolekcji | **dynamiczne z ofert mających galerie** |
| Duplikacja list | tak (oferty + filtry osobno) | tak (oferty + kategorie osobno) | **nie — jedna lista** |
| Dodatkowa robota | niska | wyższa | **najniższa — pole już istnieje** |

> **Rekomendacja: Opcja C.** Kolekcja Galerie **już ma pole `relatedOfferItem`** (relacja do oferty,
> opis „Galeria może być powiązana z konkretną usługą") — czyli pierwotny autor to przewidział.
> Galeria należy do oferty, a oferta definiuje kategorię. Filtry galerii generują się z ofert, które
> mają przypisane galerie. Klient dodaje nowy typ raz — dodając ofertę — i pojawia się on jako filtr.
> Dostaje elastyczność tagów bez osobnej kolekcji.
>
> **Niuans:** mapowanie nie jest idealne 1:1 (np. oferta „Albumy i vouchery" nie ma galerii — po
> prostu nic tam nie podpinamy; oferta bez galerii nie pojawia się jako filtr). To nie problem.
> **Decyzja należy do klienta**, ale C jest najczystsze i spójne z intencją kodu.

---

## 11. Mechanizmy Payload — co już działa, czego brakuje

Ważne: większość „dużych" mechanizmów CMS **jest już w projekcie** — tylko strony hardkodowane
z nich nie korzystają. Po wpięciu oferty/galerii w Payload dostajesz je w dużej części za darmo.

### 11.1 SEO i OG tagi — infrastruktura jest, strony jej nie używają
- Istnieją utility `src/utilities/generateMeta.ts` + `mergeOpenGraph.ts` — generują pełne meta
  (tytuł, opis) **oraz OpenGraph/OG tagi** (podgląd przy udostępnianiu w social media). Używają ich
  kolekcje **Pages i Posts**.
- Kolekcje **OfferItems i Galleries już mają zakładkę „SEO"** (meta title / description / image).
- **ALE** strony hardkodowane ustawiają tylko `metadata: { title }` — **bez opisu, bez OG**. Czyli
  dziś `/oferta`, `/galeria`, `/o-mnie`, `/kontakt` nie mają opisu SEO ani ładnego podglądu przy
  wrzuceniu linku na Facebooka/WhatsAppa.
> **Po wdrożeniu:** wystarczy `return generateMeta({ doc })` (tak jak w Pages/Posts) → pełne SEO + OG
> ciągnięte z zakładki SEO w panelu. Niemal darmowe — ale trzeba o tym pamiętać przy każdej stronie.

### 11.2 Rewalidacja (on-demand) — działa, trzeba rozszerzyć zakres
- Hooki rewalidacji istnieją (`revalidateOfferItem`, `revalidateGallery`, `revalidateHeader`…).
  Zmiana w panelu → odpowiednie strony odświeżają się **bez redeploya**.
- **UWAGA:** `revalidateOfferItem` dziś odświeża **tylko stronę główną `/`** — bo (cytat z kodu)
  „oferty nie mają jeszcze własnej strony". Po wdrożeniu trzeba dodać
  `revalidatePath('/oferta/[slug]')`. Galerie już odświeżają `/galeria/[slug]`.
> **Do zrobienia przy wdrożeniu:** uzupełnić hooki o ścieżki nowych stron dynamicznych, żeby zmiana
> oferty/galerii odświeżała też jej podstronę, nie tylko home.

### 11.3 Live Preview — opcjonalny, infrastruktura gotowa
- Payload ma skonfigurowany live preview (breakpoints w `payload.config.ts`, `admin.livePreview`
  w kolekcjach, komponent `LivePreviewListener`). Działa dla Pages i Posts.
- Strony hardkodowane go nie mają.
> **Decyzja:** to **miły dodatek** (klient widzi zmiany na żywo w panelu przed publikacją), ale
> **nie jest konieczny**. Można go podpiąć dla oferty/galerii (render `<LivePreviewListener>` +
> `draftMode`) od razu albo dodać później. Warto zapytać klienta, czy tego potrzebuje.

### 11.4 Wersje robocze (drafty) i planowanie publikacji
- Kolekcje OfferItems i Galleries mają włączone `versions.drafts` + autosave + `schedulePublish`.
- Czyli klient będzie mógł zapisywać szkice i planować publikację na przyszłą datę — **działa po
  wpięciu stron na Payload** (przez `draftMode`).

### 11.5 Strony statyczne vs dynamiczne — co można tworzyć
Rozróżnienie, które łatwo pomylić:
- **„Zwykłe" strony z bloków → kolekcja Pages → MOŻNA tworzyć nowe w panelu** (layout builder).
  To działa już dziś (`/[slug]`). Klient może dodać np. nową stronę informacyjną.
- **Strony z dedykowanym designem (o-mnie, kontakt, oferta, galeria) → dziś hardkod** → nie da się
  ich edytować ani utworzyć nowej tego typu, dopóki nie przejdą do CMS.
- **Po wdrożeniu:** oferty i galerie = **dynamiczne** (wiele wpisów, klient dodaje nowe wpisy).
  o-mnie / kontakt / polityka = **pojedyncze strony** (raczej jeden wpis / global, nie „twórz nowe").

---

## 12. Baza danych i środowisko — ⚠️ ważne przy migracjach

### Gdzie jest baza
- Baza to **Postgres na Neon, podpięty przez Vercel** (Vercel Postgres = Neon „pod spodem").
  Adapter w kodzie: `vercelPostgresAdapter`, connection string w zmiennej **`POSTGRES_URL`**.
- **Dane dostępowe (connection string, sekrety) są w panelu Vercel** — czyli u firmy, która hostuje
  aplikację (Vercel ≠ Next.js; Next to framework, Vercel to platforma za nim). Tam też siedzą inne
  zmienne: `BLOB_READ_WRITE_TOKEN` (zdjęcia na Vercel Blob), `PAYLOAD_SECRET`, `CRON_SECRET` itd.

### Na teraz: można pracować na produkcyjnej bazie
- Lokalnie da się połączyć **wprost z produkcyjną bazą** — wystarczy `POSTGRES_URL` z panelu Vercel
  w lokalnym `.env`. Dzięki temu **nie trzeba stawiać własnej bazy ani odtwarzać treści**, żeby
  zacząć i zobaczyć panel z realnymi danymi.

### ⚠️ Ostrzeżenie: to wygodne, ale ryzykowne
Wdrażanie nowych pól = **migracje**, a migracje **zmieniają strukturę produkcyjnej bazy**. Przy
wielu zmianach / eksperymentach łatwo **„rozjechać" produkcyjną bazę** (popsuć schemat lub dane).
Pamiętaj też, że build **odpala migracje automatycznie** (sekcja 5).

> **Zalecenie:** do developmentu i eksperymentów **postaw lokalnego Postgresa** (np. Docker, jedna
> komenda) i ustaw `POSTGRES_URL` na niego. Migracje testuj lokalnie; na produkcję wpuszczaj dopiero
> sprawdzone. Produkcyjną bazę ruszaj świadomie — w razie wpadki szybkie postawienie lokalnego
> Postgresa i przepięcie `POSTGRES_URL` jest planem awaryjnym.

---

## 13. Słowniczek

| Pojęcie | Znaczenie |
|---|---|
| **Kolekcja** | typ treści z wieloma wpisami (oferty, posty) |
| **Global** | pojedynczy wpis na całą witrynę (stopka, ustawienia) |
| **Slug** | końcówka adresu URL, np. `sesje-kobiece` w `/oferta/sesje-kobiece` |
| **Migracja** | plik opisujący zmianę struktury bazy danych |
| **Seed** | skrypt wgrywający treść startową do bazy |
| **Media** | kolekcja na wszystkie wgrane zdjęcia |
| **Mapper / warstwa mapująca** | funkcja tłumacząca dane z Payload na kształt oczekiwany przez komponent |
| **Live preview** | podgląd zmian na żywo w panelu przed publikacją |
| **Draft** | wersja robocza wpisu (niewidoczna publicznie do publikacji) |
| **Rewalidacja** | odświeżenie wygenerowanej strony po zmianie treści, bez ponownego deployu |
| **OG tagi (OpenGraph)** | metadane podglądu linku w social media (tytuł, opis, miniatura) |
| **generateMeta** | funkcja zbierająca meta + OG z zakładki SEO wpisu i podająca je stronie |
| **Tailwind / JIT** | system stylów; klasy generowane przy buildzie ze źródeł — klasa z bazy nie zadziała |
| **Rich text / WYSIWYG** | edytor „bogatego tekstu"; tu ryzykowny — patrz pułapka 8.4a |
| **Vercel** | platforma hostująca aplikację; tam są zmienne środowiskowe i dostęp do bazy |
| **Neon / Vercel Postgres** | baza danych projektu (Postgres na Neon, podpięty przez Vercel) |
| **Vercel Blob** | magazyn plików — tu trzymane są wgrane zdjęcia (kolekcja Media) |

---

### Pliki, do których najczęściej zajrzysz
```
src/payload.config.ts                      → spina wszystkie kolekcje i globale
src/collections/OfferItems/index.ts        → kolekcja oferty (do rozszerzenia)
src/collections/Galleries/index.ts         → kolekcja galerii (do rozszerzenia)
src/app/(frontend)/oferta/[slug]/           → strona oferty + jej constants.ts
src/app/(frontend)/galeria/[slug]/          → strona galerii + jej constants.ts
src/components/OfferService*/               → komponenty sekcji oferty (+ ich constants.ts)
src/components/CaseStudy*/                  → komponenty sekcji galerii
src/endpoints/seed/                         → wzorzec skryptu seed
public/figma/                              → wszystkie zdjęcia i dekoracje z Figmy
.claude/skills/payload/SKILL.md             → ściąga z Payload dla tego projektu
```
