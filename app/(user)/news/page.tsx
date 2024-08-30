import NewsList from "@/components/news/news-list";

import NewsHeroSection from "./_news-sections/news-hero-section";

export default function NewsPage() {
  return (
    <main className="space-y-10">
      <NewsHeroSection />
      <NewsList />
    </main>
  );
}
