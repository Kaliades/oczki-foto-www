import type { ProcessStepsBlock as ProcessStepsBlockProps } from '@/payload-types'

import { HomeProcessSteps } from '@/components/HomeProcessSteps/HomeProcessSteps'
import {
  getStepDecoration,
  homeProcessStepsDefaults,
  type HomeProcessStepsData,
  type ProcessStepItem,
} from '@/components/HomeProcessSteps/constants'

export const ProcessStepsBlock: React.FC<ProcessStepsBlockProps> = (props) => {
  const fromCms: ProcessStepItem[] = (props.items ?? []).map((item, index) => ({
    title: item.title,
    paragraphs: [item.paragraphOne, item.paragraphTwo] as const,
    ...getStepDecoration(index),
  }))

  const data: HomeProcessStepsData = {
    heading: {
      italicOne: props.heading?.italicOne ?? homeProcessStepsDefaults.heading.italicOne,
      plainOne: props.heading?.plainOne ?? homeProcessStepsDefaults.heading.plainOne,
      italicTwo: props.heading?.italicTwo ?? homeProcessStepsDefaults.heading.italicTwo,
      plainTwo: props.heading?.plainTwo ?? homeProcessStepsDefaults.heading.plainTwo,
    },
    intro: {
      paragraphOne:
        props.intro?.paragraphOne ?? homeProcessStepsDefaults.intro.paragraphOne,
      paragraphTwo:
        props.intro?.paragraphTwo ?? homeProcessStepsDefaults.intro.paragraphTwo,
    },
    items: fromCms.length > 0 ? fromCms : homeProcessStepsDefaults.items,
    showWaxStamp: props.showWaxStamp ?? homeProcessStepsDefaults.showWaxStamp,
  }

  return <HomeProcessSteps data={data} />
}
