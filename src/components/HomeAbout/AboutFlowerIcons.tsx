import Image from 'next/image'

export const AboutFlowerIcons = () => {
  return (
    <div className="flex w-full items-center gap-6 md:justify-center">
      <div className="flex h-5 w-[39.024px] items-center justify-center md:h-[25px] md:w-[48.78px]">
        <div className="-rotate-90 -scale-y-100">
          <Image
            alt=""
            aria-hidden="true"
            className="h-[39.024px] w-5 select-none md:h-[48.78px] md:w-[25px]"
            height={49}
            src="/figma/about-flower-icon.png"
            width={25}
          />
        </div>
      </div>
      <div className="flex h-5 w-[39.024px] items-center justify-center md:h-[25px] md:w-[48.78px]">
        <div className="-rotate-90">
          <Image
            alt=""
            aria-hidden="true"
            className="h-[39.024px] w-5 select-none md:h-[48.78px] md:w-[25px]"
            height={49}
            src="/figma/about-flower-icon.png"
            width={25}
          />
        </div>
      </div>
    </div>
  )
}
