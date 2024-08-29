import HomeBackgroundSection from "./_home-sections/home-background-section";
import HomeFavoriteSection from "./_home-sections/home-favorite.section";
import HomeHeroSection from "./_home-sections/home-hero-section";

export default function HomePage() {
  return (
    <main className="space-y-5">
      <HomeHeroSection />
      <HomeBackgroundSection />
      <HomeFavoriteSection />
    </main>
  );
}
