type FaqItem = {
  question: string
  answer: string
  defaultOpen?: boolean
}

const faqs: FaqItem[] = [
  {
    question: '„Nie mam się w co ubrać!” – czy pomożesz mi z wyborem stylizacji?',
    answer:
      'Oczywiście! To jeden z najczęstszych dylematów. Po rezerwacji otrzymasz ode mnie autorski poradnik, ale na tym nie koniec. Możesz wysłać mi zdjęcia swoich propozycji, a ja podpowiem, co najlepiej "zagra" z tłem i światłem. Pamiętaj, że czasem zwykły biały T-shirt, jeansy i Twoja ulubiona biżuteria tworzą najbardziej magiczne kadry.',
    defaultOpen: true,
  },
  {
    question: 'Czy muszę umieć pozować? Czuję się sztywno przed aparatem',
    answer:
      'Nie musisz nic umieć — moja rola to poprowadzić Cię przez całą sesję. Pokażę Ci proste pozy, podpowiem, jak ułożyć dłonie, gdzie skierować wzrok i jak oddychać, żeby ciało się rozluźniło.',
  },
  {
    question: 'Co z makijażem i fryzurą? Muszę o to zadbać sama?',
    answer:
      'Możesz przyjechać już gotowa albo skorzystać z mojej zaufanej ekipy makijażystki i fryzjerki — chętnie polecę sprawdzonych specjalistów i pomogę umówić termin.',
  },
  {
    question: 'Czy retuszujesz zdjęcia?',
    answer:
      'Tak. Każde wybrane zdjęcie przechodzi delikatną korektę barw, kontrastu i drobnych niedoskonałości skóry. Zawsze tak, byś czuła się ze sobą dobrze, ale nadal wyglądała jak Ty.',
  },
  {
    question: 'Co jeśli w dniu sesji będę miała gorszy humor lub źle się poczuję?',
    answer:
      'Nic się nie stanie — w takich sytuacjach przekładamy termin na inny dogodny dzień. Twoje samopoczucie ma realny wpływ na efekt zdjęć i to jest dla mnie priorytet.',
  },
  {
    question: 'Gdzie dokładnie robimy zdjęcia? Masz swoje studio?',
    answer:
      'Pracuję głównie w plenerze oraz w wybranych lokalizacjach w Krakowie i okolicach. Po rozmowie wspólnie wybierzemy miejsce, które najlepiej oddaje Twój klimat.',
  },
  {
    question: 'Ile będę czekać na gotowe zdjęcia?',
    answer:
      'Gotową galerię otrzymasz w ciągu 3–4 tygodni od dnia sesji. Wcześniej, w ciągu kilku dni, dostaniesz kilka zapowiedzi.',
  },
  {
    question: 'Czy moje zdjęcia trafią do sieci? Trochę się wstydzę',
    answer:
      'Publikuję wyłącznie zdjęcia, na które wyrazisz zgodę. Możesz spokojnie zatrzymać całą sesję dla siebie — Twoja prywatność jest święta.',
  },
  {
    question: 'Czy dojedziesz do mnie, jeśli mieszkam poza Krakowem?',
    answer:
      'Tak, pracuję na terenie całej Polski. Koszt dojazdu ustalamy indywidualnie w zależności od odległości.',
  },
]

export default function GaleriaFaq() {
  return (
    <section className="w-full bg-[#f6f5f2]">
      <div className="max-w-[1366px] mx-auto flex items-start justify-between px-[32px] py-[80px]">
        {/* Left: header */}
        <div className="flex flex-col gap-[16px] items-start w-[438px]">
          <h2
            className="font-['The_Seasons',serif] text-[32px] leading-[1.04] tracking-[-0.32px] text-[#4f3a26] w-full"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          >
            <span
              className="italic"
              style={{ fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1" }}
            >
              Rozwiejmy
            </span>
            <span>{' ostatnie wątpliwości'}</span>
          </h2>
          <p
            className="font-['Instrument_Sans',sans-serif] font-normal text-[16px] leading-[1.48] tracking-[-0.24px] text-[#6b5947] w-full"
            style={{
              fontVariationSettings: "'wdth' 100",
              fontFeatureSettings:
                "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
            }}
          >
            Wiem, że w Twojej głowie może pojawić się jeszcze kilka pytań. Spokojnie,
            przygotowałam na nie odpowiedzi, byś mogła podjąć decyzję z pełnym spokojem.
          </p>
        </div>

        {/* Right: accordion list */}
        <div className="flex flex-col gap-[8px] items-start w-[663px]">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              open={faq.defaultOpen}
              className="group w-full rounded-tr-[12px] rounded-br-[12px] border border-[#e7ded4] open:border-transparent open:bg-[#e7ded4] [&_summary]:list-none [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-start gap-[10px] px-[16px] pt-[14px] pb-[16px] group-open:pb-[10px] cursor-pointer group-open:border-b group-open:border-[#f1eee8] group-open:mx-[16px] group-open:px-0">
                <p
                  className="flex-1 min-w-0 font-['Instrument_Sans',sans-serif] font-normal text-[20px] leading-[1.48] tracking-[-0.3px] text-[#6b5947] group-open:text-[#4f3a26]"
                  style={{
                    fontVariationSettings: "'wdth' 100",
                    fontFeatureSettings:
                      "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                  }}
                >
                  {faq.question}
                </p>
                <span className="flex items-center justify-center w-[16px] h-[20px] pt-[6px] shrink-0">
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-transform duration-200 -rotate-90 group-open:rotate-90"
                    aria-hidden="true"
                  >
                    <path
                      d="M11 6L7 10L11 14"
                      stroke="#4f3a26"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-[16px] pb-[28px] pt-0 pr-[64px]">
                <p
                  className="font-['Instrument_Sans',sans-serif] font-normal text-[16px] leading-[1.48] tracking-[-0.24px] text-[#6b5947]"
                  style={{
                    fontVariationSettings: "'wdth' 100",
                    fontFeatureSettings:
                      "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
