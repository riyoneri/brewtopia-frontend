"use client";

import Products from "@/data/products";
import { useEffect, useState } from "react";

import CategoriesList from "./categories/categories-list";
import ProductsList from "./products/products-list";

export default function CategoriesWithProducts() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return;
  return (
    <>
      <CategoriesList loading />

      <ProductsList products={Products} />
    </>
  );
}
