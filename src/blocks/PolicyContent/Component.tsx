import React from 'react'
import type { PolicyContentBlock } from '@/payload-types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import RichText from '@/components/RichText'

type PolicyContentProps = PolicyContentBlock

export const PolicyContent: React.FC<PolicyContentProps> = ({ body }) => {
  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-[768px] px-4">
        <RichText data={body as DefaultTypedEditorState} enableProse enableGutter={false} />
      </div>
    </section>
  )
}
