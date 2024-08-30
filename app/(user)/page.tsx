import HomeFavoriteSection from "./_home-sections/home-favorite.section";
import HomeHeroSection from "./_home-sections/home-hero-section";
import HomeWorkspaceSection from "./_home-sections/home-workspace.section";

export default function HomePage() {
  return (
    <main className="space-y-5">
      <HomeHeroSection />
      {/* <HomeBackgroundSection /> */}
      <HomeFavoriteSection />
      <HomeWorkspaceSection />
    </main>
  );
}
