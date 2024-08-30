import News from "@/data/news";

import Button from "../button";
import NewsCard from "./news-card";

export default function NewsList() {
  return (
    <div className="maximum-width flex flex-col gap-10 py-5 xs:border-t xs:py-10">
      <div className="grid gap-5 xl:grid-cols-2">
        {News.map((news) => (
          <NewsCard {...news} key={news.id} />
        ))}
      </div>
      <Button variant="outline" className="mx-auto w-full xs:w-fit">
        Load more
      </Button>
    </div>
  );
}
