// Note: GalleryFaqBlock will appear in payload-types after `pnpm payload generate:types`
// is run once the block is registered in Pages config. Until then, use inline type.
export const GalleryFaqSeed: {
  blockType: 'galleryFaq'
  heading: string
  lead?: string
  items: { question: string; answer: string; defaultOpen?: boolean }[]
  contactBox?: {
    heading: string
    messageLabel?: string
    submitLabel?: string
    successMessage?: string
    errorMessage?: string
  }
} = {
  blockType: 'galleryFaq',
  heading: 'Rozwiejmy ostatnie wątpliwości',
  lead: 'Wiem, że w Twojej głowie może pojawić się jeszcze kilka pytań. Spokojnie, przygotowałam na nie odpowiedzi, byś mogła podjąć decyzję z pełnym spokojem.',
  items: [
    {
      question: '„Nie mam się w co ubrać!" – czy pomożesz mi z wyborem stylizacji?',
      answer:
        'Oczywiście! To jeden z najczęstszych dylematów. Po rezerwacji otrzymasz ode mnie autorski poradnik, ale na tym nie koniec. Możesz wysłać mi zdjęcia swoich propozycji, a ja podpowiem, co najlepiej „zagra" z tłem i światłem. Pamiętaj, że czasem zwykły biały T-shirt, jeansy i Twoja ulubiona biżuteria tworzą najbardziej magiczne kadry.',
      defaultOpen: true,
    },
    {
      question: 'Czy muszę umieć pozować? Czuję się sztywno przed aparatem.',
      answer:
        'Absolutnie nie! Pozowanie to moja rola – Twoja rola to po prostu być sobą. Przez całą sesję będę Cię prowadzić: podpowiem, jak ustawić dłonie, jak odwrócić wzrok, jak się poruszyć. Większość moich klientek mówi, że po kilku minutach zupełnie zapomina o aparacie. Zaufaj mi, a zdjęcia wyjdą naturalnie.',
      defaultOpen: false,
    },
    {
      question: 'Co z makijażem i fryzurą? Muszę o to zadbać sama?',
      answer:
        'To zależy od Ciebie! Wiele klientek przychodzi z własnym makijażem – ważne, żeby był nieco intensywniejszy niż na co dzień, bo aparat lubi wyraziste rysy. Mogę też polecić sprawdzone krakowskie wizażystki i stylistki, z którymi współpracuję. Makijaż i fryzura na sesję to inwestycja, która potem widać na każdym zdjęciu.',
      defaultOpen: false,
    },
    {
      question: 'Czy retuszujesz zdjęcia?',
      answer:
        'Tak, każde zdjęcie z wybranej galerii przechodzi przez moje ręce w postprocesingu – koreguję kolory, światło i kontrast. Na życzenie retuszuję też drobne niedoskonałości skóry, zachowując przy tym naturalny wygląd. Nie stosuję agresywnych filtrów ani „plastikowego" retuszu – zależy mi, żebyś na zdjęciach rozpoznawała siebie.',
      defaultOpen: false,
    },
    {
      question: 'Co jeśli w dniu sesji będę miała gorszy humor lub źle się poczuję?',
      answer:
        'Napisz do mnie jak najszybciej! Razem ustalimy, czy przełożyć sesję, czy poprowadzić ją w spokojniejszym tempie. Zdrowie i komfort są ważniejsze niż jakikolwiek termin. Przepisanie sesji nie wiąże się z żadnymi kosztami, jeśli zostanie zgłoszone z co najmniej 48-godzinnym wyprzedzeniem.',
      defaultOpen: false,
    },
    {
      question: 'Gdzie dokładnie robimy zdjęcia? Masz swoje studio?',
      answer:
        'Pracuję głównie w plenerze – Kraków i okolice oferują niesamowite lokalizacje przez cały rok. Sesje kobiecy odbywamy w parkach, na łąkach, w starych kamienicach i przy industrialnych murach. Nie mam własnego studia, ale współpracuję ze sprawdzonymi studiami w Krakowie, gdy zależy Ci na kontrolowanym świetle lub intymnej przestrzeni.',
      defaultOpen: false,
    },
    {
      question: 'Czy moje zdjęcia trafią do sieci? Trochę się wstydzę.',
      answer:
        'Zawsze pytam o zgodę zanim cokolwiek opublikuję. Jeśli nie chcesz, żeby Twoje zdjęcia pojawiły się w mediach społecznościowych, portfolio czy materiałach promocyjnych – wystarczy, że mi o tym powiesz na etapie rezerwacji. Twoja prywatność jest dla mnie priorytetem.',
      defaultOpen: false,
    },
    {
      question: 'Ile będę czekać na gotowe zdjęcia?',
      answer:
        'Zazwyczaj gotowe zdjęcia wysyłam w ciągu 2–3 tygodni od sesji. W sezonie ślubnym (maj–październik) czas oczekiwania może wydłużyć się do 4 tygodni. Zawsze informuję o aktualnym czasie realizacji przed rezerwacją, żebyś wiedziała, czego się spodziewać.',
      defaultOpen: false,
    },
    {
      question: 'Czy dojedziesz do mnie, jeśli mieszkam poza Krakowem?',
      answer:
        'Tak! Pracuję w całej Polsce, a za granicą – na indywidualne zapytanie. Dojazd do 30 km od centrum Krakowa jest bezpłatny. Powyżej tej odległości doliczam koszt paliwa lub biletu – omówimy to dokładnie przy wycenie. Wyjazdy weekendowe do szczególnie pięknych lokalizacji (góry, morze, mazury) traktuję jako osobną przygodę – zapraszam do kontaktu!',
      defaultOpen: false,
    },
  ],
  contactBox: {
    heading: 'Nie możesz znaleźć odpowiedzi na swoje pytanie? Napisz do nas',
    messageLabel: 'Wiadomość',
    submitLabel: 'Wyślij wiadomość',
    successMessage: 'Dziękujemy! Odezwiemy się wkrótce.',
    errorMessage: 'Coś poszło nie tak.',
  },
}
