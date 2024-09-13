import NewsHeadingCard from "@/components/news/news-heading-card";
import NewsList from "@/components/news/news-list";
import News from "@/data/news";

export default function NewsPage() {
  return (
    <>
      <title>News</title>
      <div className="space-y-10">
        <section className="dynamic-hero-height grid bg-tertiary py-5">
          <div className="maximum-width flex flex-col justify-between  text-center">
            <div>
              <h1 className="main-heading">Our News</h1>
              <p>
                Get the lates updates and deeper coffee experience from
                BrewTopia
              </p>
            </div>
            <NewsHeadingCard {...News[0]} className="flex-1" />
          </div>
        </section>
        <NewsList />
      </div>
    </>
  );
}
