import Image from "next/image";

import home1Image from "../../../assets/images/home-1.jpg";
import home2Image from "../../../assets/images/home-2.avif";
import home3Image from "../../../assets/images/home-3.jpg";

export default function HomeHeroSection() {
  return (
    <section className="hero-height maximum-width grid grid-cols-5 grid-rows-5 gap-5 *:row-span-full">
      <div className="col-span-full grid grid-rows-5 gap-5 overflow-hidden sm:gap-10 lg:col-span-3">
        <div className="row-span-1 flex flex-col justify-evenly gap-5 sm:gap-10 sm:pt-5 md:row-span-2 lg:justify-start">
          <h1 className="main-heading">Choose your Coffee & Space</h1>
          <p className="text-balance sm:text-pretty">
            BrewTopia has been serving 20,0000+ cups of coffee and providing a
            comfortable place for our customers to work since 2010.
          </p>
        </div>
        <div className="row-span-4 grid grid-rows-2 gap-5 *:h-full md:row-span-3">
          <Image
            className="object-cover"
            src={home1Image}
            alt="Home 1 image"
            height={1000}
            width={1000}
          />
          <Image
            className="object-cover"
            src={home2Image}
            alt="Home 1 image"
            height={1000}
            width={1000}
          />
        </div>
      </div>
      <Image
        className="col-span-2 hidden h-full object-cover lg:block"
        src={home3Image}
        alt="Home 2 image"
        height={1000}
        width={1000}
      />
    </section>
  );
}
