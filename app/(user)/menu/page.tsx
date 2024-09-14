"use client";

import CategoriesWithProducts from "@/components/categories-with-products";
import PriceFilterInput from "@/components/filter/price-filter-input";
import SearchFilterInput from "@/components/filter/search-filter-input";
import SortFilterInput from "@/components/filter/sort-filter-input";
import { parseAsInteger, useQueryStates } from "nuqs";
import { Suspense, useEffect } from "react";

function MenuPage() {
  const [, setQueries] = useQueryStates({
    price: parseAsInteger.withDefault(0),
    sort: parseAsInteger.withDefault(0),
  });

  useEffect(() => {
    setQueries(Object.create(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <title>Menu</title>
      <div className="maximum-width space-y-5 py-5">
        <h2 className="main-heading">Our Menu</h2>
        <p className="text-balance lg:w-4/5">
          BrewTopia provides a variety of high quality coffee and drinks and
          flavors that are suitable for you to support and cheer up you day. We
          also supply coffee to a company you at home along with the equipment
        </p>

        <div className="flex flex-col gap-5 sm:flex-row">
          <SearchFilterInput />
          <PriceFilterInput />
          <SortFilterInput />
        </div>

        <CategoriesWithProducts />
      </div>
    </>
  );
}

export default function WrappedMenuPage() {
  return (
    <Suspense>
      <MenuPage />
    </Suspense>
  );
}
