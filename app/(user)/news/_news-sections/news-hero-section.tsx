import NewsHeadingCard from "@/components/news/news-heading-card";
import News from "@/data/news";

export default function NewsHeroSection() {
  return (
    <section className="dynamic-hero-height grid bg-tertiary pb-5">
      <div className="maximum-width flex flex-col justify-between  text-center">
        <div>
          <h1 className="main-heading">Our News</h1>
          <p>
            Get the lates updates and deeper coffee experience from BrewTopia
          </p>
        </div>
        <NewsHeadingCard {...News[0]} className="flex-1 bg-red-500" />
      </div>
    </section>
  );
}
