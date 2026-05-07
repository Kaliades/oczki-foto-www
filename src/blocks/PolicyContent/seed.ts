// TODO: Replace placeholder text with policy reviewed by IODO/lawyer.

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

function makeHeading(text: string) {
  return {
    type: 'heading' as const,
    tag: 'h2' as const,
    version: 1,
    children: [
      {
        type: 'text' as const,
        text,
        version: 1,
        format: 0,
        detail: 0,
        mode: 'normal' as const,
        style: '',
      },
    ],
    direction: null,
    format: '' as const,
    indent: 0,
  }
}

function makeParagraph(text: string) {
  return {
    type: 'paragraph' as const,
    version: 1,
    textFormat: 0,
    children: [
      {
        type: 'text' as const,
        text,
        version: 1,
        format: 0,
        detail: 0,
        mode: 'normal' as const,
        style: '',
      },
    ],
    direction: null,
    format: '' as const,
    indent: 0,
  }
}

const bodyContent: DefaultTypedEditorState = {
  root: {
    type: 'root',
    children: [
      // § 1
      makeHeading('§ 1. Administrator danych osobowych'),
      makeParagraph(
        'Administratorem Twoich danych osobowych jest Joanna Kulińska, prowadząca działalność fotograficzną pod nazwą Oczki Fotografia, ul. Przykładowa 1, 30-001 Kraków, NIP: 000-000-00-00 (dalej: „Administrator").',
      ),
      makeParagraph(
        'W sprawach związanych z przetwarzaniem danych osobowych możesz kontaktować się z Administratorem pod adresem e-mail: kontakt@oczkifotografia.pl lub pisemnie na powyższy adres korespondencyjny.',
      ),

      // § 2
      makeHeading('§ 2. Cele i podstawy prawne przetwarzania'),
      makeParagraph(
        'Twoje dane osobowe przetwarzamy w następujących celach: (1) zawarcia i wykonania umowy o świadczenie usług fotograficznych — podstawa prawna: art. 6 ust. 1 lit. b RODO; (2) realizacji obowiązków wynikających z przepisów prawa podatkowego i rachunkowego — art. 6 ust. 1 lit. c RODO; (3) marketingu bezpośredniego własnych usług, w tym przesyłania newslettera — art. 6 ust. 1 lit. a RODO (zgoda) lub art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes).',
      ),
      makeParagraph(
        'Podanie danych jest dobrowolne, jednak niezbędne do zawarcia umowy lub skorzystania z usług. Brak podania danych skutkuje niemożnością wykonania usługi.',
      ),

      // § 3
      makeHeading('§ 3. Odbiorcy danych'),
      makeParagraph(
        'Dane osobowe mogą być przekazywane podmiotom przetwarzającym dane w imieniu Administratora, w szczególności: dostawcom usług hostingowych i IT, biurom rachunkowym oraz operatorom płatności — wyłącznie w zakresie niezbędnym do realizacji usług.',
      ),
      makeParagraph(
        'Administrator nie przekazuje danych do państw trzecich ani organizacji międzynarodowych, za wyjątkiem sytuacji, gdy jest to konieczne do realizacji usługi i odbywa się na podstawie odpowiednich zabezpieczeń (np. standardowe klauzule umowne Komisji Europejskiej).',
      ),

      // § 4
      makeHeading('§ 4. Okres przechowywania danych'),
      makeParagraph(
        'Dane osobowe przechowywane są przez okres niezbędny do realizacji celów, dla których zostały zebrane: (1) dane związane z umową — przez czas trwania umowy, a następnie przez 5 lat od jej zakończenia (cel podatkowy i rachunkowy); (2) dane marketingowe — do momentu wycofania zgody lub wniesienia sprzeciwu; (3) dane z formularza kontaktowego — do 12 miesięcy od ostatniego kontaktu.',
      ),
      makeParagraph(
        'Po upływie okresu przechowywania dane są trwale usuwane lub anonimizowane.',
      ),

      // § 5
      makeHeading('§ 5. Prawa osoby, której dane dotyczą'),
      makeParagraph(
        'Przysługują Ci następujące prawa: prawo dostępu do treści swoich danych (art. 15 RODO), prawo do sprostowania danych (art. 16 RODO), prawo do usunięcia danych (art. 17 RODO), prawo do ograniczenia przetwarzania (art. 18 RODO), prawo do przenoszenia danych (art. 20 RODO), prawo do wniesienia sprzeciwu (art. 21 RODO) oraz prawo do cofnięcia zgody w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania dokonanego przed jej cofnięciem.',
      ),
      makeParagraph(
        'W przypadku naruszenia przepisów RODO przysługuje Ci prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa, www.uodo.gov.pl).',
      ),

      // § 6
      makeHeading('§ 6. Pliki cookies'),
      makeParagraph(
        'Strona internetowa używa plików cookies (ciasteczek) — małych plików tekstowych zapisywanych na Twoim urządzeniu. Pliki cookies stosujemy w celu: zapewnienia prawidłowego funkcjonowania serwisu, analizy ruchu (statystyki), a za Twoją zgodą — w celach marketingowych.',
      ),
      makeParagraph(
        'Możesz zarządzać plikami cookies poprzez ustawienia swojej przeglądarki internetowej. Wyłączenie cookies może ograniczyć niektóre funkcje serwisu. Więcej informacji o zarządzaniu plikami cookies znajdziesz w dokumentacji swojej przeglądarki.',
      ),

      // § 7
      makeHeading('§ 7. Kontakt'),
      makeParagraph(
        'Wszelkie pytania, żądania i wnioski dotyczące przetwarzania danych osobowych prosimy kierować na adres e-mail: kontakt@oczkifotografia.pl. Odpowiemy bez zbędnej zwłoki, nie później niż w terminie miesiąca od otrzymania żądania.',
      ),
      makeParagraph(
        'Niniejsza Polityka prywatności może być aktualizowana w związku ze zmianami w przepisach prawa lub zmianami w sposobie przetwarzania danych. O każdej istotnej zmianie poinformujemy poprzez zamieszczenie nowej wersji na tej stronie wraz z aktualną datą aktualizacji.',
      ),
    ],
    direction: null,
    format: '',
    indent: 0,
    version: 1,
  },
} as DefaultTypedEditorState

export const PolicyContentSeed = {
  blockType: 'policyContent' as const,
  body: bodyContent,
}
