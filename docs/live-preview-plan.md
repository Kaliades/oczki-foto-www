# Live Preview — Plan implementacji

## Co to jest i po co?

Live Preview to tryb Payload CMS, w którym edytor widzi zmiany treści na żywo
w panelu administracyjnym — bez konieczności zapisywania i odświeżania strony.
Zmiany pojawiają się w wbudowanym podglądzie od razu, gdy edytor modyfikuje pola.

Bez Live Preview: edytor wypełnia pola → klika „Save" → otwiera stronę w
przeglądarce → widzi zmiany. Z Live Preview: edytor modyfikuje pole → widzi
zmianę natychmiastowo w panelu obok.

---

## Zakres

| Kolekcja / Global              | Priorytet | Uwagi                              |
| ------------------------------ | --------- | ---------------------------------- |
| `pages` (strona główna)        | wysoki    | 9 bloków, najbardziej złożona      |
| `offerItems`                   | wysoki    | Strony `/oferta/[slug]`            |
| `galleries` (case studies)     | średni    | Strony `/galeria/[slug]`           |
| `AboutPage` (global)           | średni    | Strona `/o-mnie`                   |
| `ContactPage` (global)         | niski     | Treść rzadko się zmienia           |
| `PrivacyPolicyPage` (global)   | niski     | Treść rzadko się zmienia           |
| `Header` (global)              | niski     | Linki nawigacji zmieniają się rzadko |
| `SiteSettings` (global)        | niski     | Stopka / newsletter                |

---

## Zmiany wymagane po stronie Payload

### 1. Włączyć `livePreview` w `payload.config.ts`

```ts
// src/payload.config.ts
livePreview: {
  url: ({ data, collectionConfig, locale }) => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

    if (collectionConfig?.slug === 'pages') {
      const slug = data?.slug === 'home' ? '' : (data?.slug ?? '')
      return `${baseUrl}/${slug}`
    }
    if (collectionConfig?.slug === 'offerItems') {
      return `${baseUrl}/oferta/${data?.slug ?? ''}`
    }
    if (collectionConfig?.slug === 'galleries') {
      return `${baseUrl}/galeria/${data?.slug ?? ''}`
    }

    return baseUrl
  },
  collections: ['pages', 'offerItems', 'galleries'],
  globals: ['aboutPage', 'contactPage', 'privacyPolicyPage', 'header', 'siteSettings'],
},
```

### 2. Włączyć `versions.drafts` tam gdzie ich nie ma

Live Preview działa optymalnie z trybem wersji/draft. Collections `offerItems`
i `galleries` powinny mieć:

```ts
versions: {
  drafts: { autosave: { interval: 375 } },
},
```

Globals (`AboutPage`, `ContactPage`, `PrivacyPolicyPage`) już mają `versions`
z `drafts` — wystarczy dodać `autosave`.

---

## Zmiany wymagane po stronie Next.js

### 1. Dodać `LivePreviewListener` do root layoutu

```tsx
// src/app/(frontend)/layout.tsx
import { LivePreviewListener } from '@payloadcms/live-preview-react'

// wewnątrz <body>:
<LivePreviewListener />
```

### 2. Każda strona musi wywołać `draftMode()`

Strony, które mają obsługiwać live preview, muszą:

```ts
import { draftMode } from 'next/headers'

// w generateMetadata / page function:
const { isEnabled: isDraft } = await draftMode()
```

i przy fetchu danych przekazywać `draft: isDraft` do Payload Local API:

```ts
const data = await payload.findGlobal({
  slug: 'aboutPage',
  draft: isDraft,
  depth: 2,
})
```

### 3. Dodać Draft Preview endpoint

Payload wymaga route `/api/draft` który ustawi cookie `draftMode`:

```ts
// src/app/(frontend)/api/draft/route.ts
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  const url = searchParams.get('url') ?? '/'

  if (secret !== process.env.DRAFT_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()
  redirect(url)
}
```

I odpowiadający endpoint wyłączania draftu:

```ts
// src/app/(frontend)/api/disable-draft/route.ts
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url') ?? '/'

  const draft = await draftMode()
  draft.disable()
  redirect(url)
}
```

### 4. Dodać `DRAFT_SECRET` do `.env`

```
DRAFT_SECRET=twoj-tajny-string-min-32-znaki
```

---

## Kolejność implementacji

1. `payload.config.ts` — dodać `livePreview` block (30 min)
2. `.env` + draft endpoints (30 min)
3. `LivePreviewListener` w layout (5 min)
4. Strona główna (`pages`, slug `home`) — `draftMode()` + `draft` w fetchu (1 godz)
5. `/oferta/[slug]` — analogicznie (1 godz)
6. `/galeria/[slug]` — analogicznie (30 min)
7. Globals (`o-mnie`, `kontakt`, `polityka`) — analogicznie (1 godz)
8. Testy w panelu (30 min)

**Szacowany czas łączny: ~5 godzin.**

---

## Znane ograniczenia

- Live Preview działa tylko dla zalogowanych redaktorów przez Payload Admin.
- Wymaga, żeby serwer Next.js był dostępny pod adresem widocznym z panelu
  (lokalnie `http://localhost:3000`, produkcyjnie publiczna domena).
- Strony z `force-static` lub agresywnym cache (`unstable_cache` / `fetch` z
  `cache: 'force-cache'`) wymagają dodatkowej obsługi — przy trybie draft należy
  ominąć cache (`cache: 'no-store'`).
- Payload `autosave` generuje wiele małych requestów — należy sprawdzić czy nie
  powoduje problemów z wydajnością bazy lokalnie.
