import React, { Fragment } from 'react'

const blockComponents: Record<string, React.FC<any>> = {}

export const RenderBlocks: React.FC<{
  blocks: unknown[]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const b = block as Record<string, unknown>
          const blockType = b?.blockType as string | undefined

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  <Block {...b} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
