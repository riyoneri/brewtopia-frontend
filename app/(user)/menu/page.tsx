"use client";

import CategoriesWithProducts from "@/components/categories-with-products";
import SearchInputLabel from "@/components/input-labels/search-input-label";
import SelectInputLabel from "@/components/input-labels/select-input-label";
import {
  productsPriceRanges,
  productsSorts,
} from "@/utils/constants/sort-filter-options";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryState } from "nuqs";
import { Suspense, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const inputsSchema = z.object({
  searchKey: z.string(),
  priceRangeId: z.string(),
  sortId: z.string(),
});

type InputsType = z.infer<typeof inputsSchema>;

function MenuPage() {
  const [, setPrice] = useQueryState("price", {
    defaultValue: "0",
    clearOnDefault: true,
  });
  const [, setSort] = useQueryState("sort", {
    defaultValue: "0",
    clearOnDefault: true,
  });

  const methods = useForm<InputsType>({
    resolver: zodResolver(inputsSchema),
    defaultValues: {
      priceRangeId: "0",
      sortId: "0",
    },
  });

  useEffect(() => {
    setPrice("0");
    setSort("0");
  }, [setPrice, setSort]);

  const priceRangeIdWatcher = methods.watch("priceRangeId");
  const sortIdWatcher = methods.watch("sortId");

  useEffect(() => {
    setPrice(priceRangeIdWatcher);
    setSort(sortIdWatcher);
  }, [priceRangeIdWatcher, setPrice, setSort, sortIdWatcher]);

  const clearSearchInput = () => {
    methods.resetField("searchKey");
  };

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

        <div className="flex flex-col flex-wrap gap-5 sm:flex-row">
          <FormProvider {...methods}>
            <SearchInputLabel
              className="flex-1"
              name="searchKey"
              register={methods.register("searchKey")}
              hasHeader
              resetInput={clearSearchInput}
            />
            <SelectInputLabel
              name="priceRangeId"
              selectOptions={productsPriceRanges}
              hasHeader
              title="Price"
              resetInput={() => {
                methods.resetField("priceRangeId");
              }}
            />
            <SelectInputLabel
              name="sortId"
              selectOptions={productsSorts}
              className="md:w-52"
              hasHeader
              title="Sort By"
              resetInput={() => {
                methods.resetField("sortId");
              }}
            />
          </FormProvider>
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
