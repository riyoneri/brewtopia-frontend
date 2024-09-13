import Button from "../button";
import ProductCard from "./product-card";
import ProductCardSkeleton from "./product-card-skeleton";

interface ProductsListProperties {
  products?: ProductDto[];
  error?: string;
  loading?: boolean;
}

export default function ProductsList({
  error,
  loading,
  products,
}: ProductsListProperties) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {error && (
          <p className="col-span-full text-center text-red-500">{error}</p>
        )}
        {loading && (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        )}
        {products &&
          (products?.length ? (
            products.map((product) => (
              <ProductCard {...product} key={product.id} />
            ))
          ) : (
            <p className="col-span-full mt-5 sm:text-center sm:text-xl">
              No Products available.
            </p>
          ))}
      </div>
      <Button variant="outline" className="mx-auto block w-full xs:w-fit">
        Load more
      </Button>
    </div>
  );
}
