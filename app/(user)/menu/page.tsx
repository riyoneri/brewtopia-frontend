"use client";

import CategoriesWithProducts from "@/components/categories-with-products";
import PriceFilterInput from "@/components/filter/price-filter-input";
import SearchFilterInput from "@/components/filter/search-filter-input";
import SortInput from "@/components/filter/sort-input";
import { useEffect } from "react";

export default function MenuPage() {
  useEffect(() => {
    window.history?.replaceState(undefined, "", "/menu");
  }, []);

  return (
    <>
      <title>Menu</title>
      <main className="maximum-width mt-5 space-y-5">
        <h2 className="main-heading">Our Menu</h2>
        <p className="text-balance lg:w-4/5">
          BrewTopia provides a variety of high quality coffee and drinks and
          flavors that are suitable for you to support and cheer up you day. We
          also supply coffee to a company you at home along with the equipment
        </p>

        <div className="flex flex-col gap-5 sm:flex-row">
          <SearchFilterInput />
          <PriceFilterInput />
          <SortInput />
        </div>

        <CategoriesWithProducts />
      </main>
    </>
  );
}
