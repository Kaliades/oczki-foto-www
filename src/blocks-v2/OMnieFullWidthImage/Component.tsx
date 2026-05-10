import Image from 'next/image'

export default function OMnieFullWidthImage() {
  return (
    <section className="w-full">
      <div className="relative w-full h-[723px] overflow-hidden bg-[#f6f5f2]">
        <Image
          src="/blocks-v2/omniefullwidthimage/image.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  )
}
