import Button from "@/components/button";

export default function HomeNewsSection() {
  return (
    <section className="bg-tertiary py-8 sm:py-10">
      <div className="maximum-width">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="main-heading">Latest News</h3>
            <p>
              Get the latest updates and deeper coffee experience from BrewTopia
            </p>
          </div>
          <Button>See All News</Button>
        </div>
      </div>
    </section>
  );
}
