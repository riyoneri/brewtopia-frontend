import Button from "@/components/button";
import NewsHeadingCard from "@/components/news/news-heading-card";
import News from "@/data/news";

export default function HomeNewsSection() {
  return (
    <section className="bg-tertiary py-8 sm:py-10">
      <div className="maximum-width space-y-5">
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <div className="space-y-1">
            <h3 className="main-heading">Latest News</h3>
            <p>
              Get the latest updates and deeper coffee experience from BrewTopia
            </p>
          </div>
          <Button className="w-full xs:w-fit">See All News</Button>
        </div>
        <NewsHeadingCard {...News[0]} />
      </div>
    </section>
  );
}
