import type { Metadata } from 'next'
import Link from 'next/link'
import WybierzV1 from './WybierzV1'
import WybierzV2 from './WybierzV2'

export const metadata: Metadata = {
  title: 'Test — Wybierz historię showdown V1 vs V2',
  robots: { index: false, follow: false },
}

export default function TestPage() {
  return (
    <div className="min-h-screen">
      <header className="bg-stone-900 text-white py-6 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col gap-1">
          <h1 className="text-xl font-semibold">Wybierz historię — showdown</h1>
          <p className="text-sm text-stone-400">
            V1 = simple <code>get_design_context</code> &nbsp;·&nbsp; V2 = multi-tool single-pass
            (metadata + variable_defs + screenshot + design_context + asset download)
          </p>
        </div>
      </header>

      <section className="bg-stone-100 py-6 px-6 border-b border-stone-300">
        <div className="max-w-6xl mx-auto flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-stone-900">V2 hardcoded — RUNDA 2 (canvas „🌐 Strony")</h2>
          <div className="flex gap-4 flex-wrap text-sm">
            <Link href="/test/v2/homepage" className="px-4 py-2 bg-white border border-stone-400 rounded hover:bg-stone-50">
              /test/v2/homepage
            </Link>
            <Link href="/test/v2/galeria" className="px-4 py-2 bg-white border border-stone-400 rounded hover:bg-stone-50">
              /test/v2/galeria
            </Link>
            <Link href="/test/v2/o-mnie" className="px-4 py-2 bg-white border border-stone-400 rounded hover:bg-stone-50">
              /test/v2/o-mnie
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b-4 border-rose-500/40">
        <div className="bg-rose-500 text-white py-3 px-6 text-sm font-medium tracking-wide uppercase">
          WybierzV1 — simple MCP translation (2 tool calls)
        </div>
        <WybierzV1 />
      </section>

      <section className="border-b-4 border-emerald-500/40">
        <div className="bg-emerald-500 text-white py-3 px-6 text-sm font-medium tracking-wide uppercase">
          WybierzV2 — multi-tool single-pass (8 tool calls, 12 exact tokens, 11 real assets)
        </div>
        <WybierzV2 />
      </section>
    </div>
  )
}
