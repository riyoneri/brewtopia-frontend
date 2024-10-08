import Button from "@/components/button";
import ProductCard from "@/components/products/product-card";
import Products from "@/data/products";
import Link from "next/link";

export default function HomeFavoriteSection() {
  return (
    <section className="maximum-width space-y-5 py-8 sm:py-10">
      <div className="flex flex-col gap-1 xs:flex-row xs:items-center xs:gap-5">
        <h1 className="main-heading flex-1"> Find your favorite menu</h1>
        <Link href="/menu"></Link>
        <Button>Explore Other Menu</Button>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {Products.slice(0, 3).map((product) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
    </section>
  );
}
