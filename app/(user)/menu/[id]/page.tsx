"use client";

import Button from "@/components/button";
import ProductsList from "@/components/products/products-list";
import Products from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { useDocumentTitle } from "usehooks-ts";

export default function ProductDetails() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);
  useDocumentTitle(`${Products[2]?.name} | Details`);

  if (!isMounted) return;

  return (
    <div className="space-y-10">
      <section className="maximum-width grid gap-5 pt-5 sm:grid-cols-2 md:gap-10">
        <div className="dui-breadcrumbs block py-0 text-sm text-secondary/50 sm:hidden">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href=".">Menu</Link>
            </li>
            <li className="text-secondary">Detail</li>
          </ul>
        </div>
        <Image
          src={Products[2].imageUrl}
          height={500}
          width={500}
          alt={Products[2].imageUrl}
          className="size-full object-cover"
        />

        <div className="flex flex-col justify-between gap-5">
          <div className="sm:space-y-3">
            <div className="dui-breadcrumbs hidden py-0 text-secondary/50 sm:block">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href=".">Menu</Link>
                </li>
                <li className="text-secondary">Detail</li>
              </ul>
            </div>

            <h2 className="text-lg xs:text-xl sm:text-2xl md:line-clamp-1 md:text-3xl lg:text-4xl">
              {Products[2].name}
            </h2>

            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <div className="flex items-center gap-2">
                <span className="text-xl font-medium sm:text-2xl">
                  ${Products[2].price}
                </span>
                {Products[2].previousPrice && (
                  <span className="line-through">
                    ${Products[2].previousPrice}
                  </span>
                )}
              </div>
              {Products[2].hasDiscountInApp && (
                <>
                  <GoDotFill className="hidden text-xs md:block" />
                  <p className="text-sm text-primary xs:text-base">
                    Get 20% Off in App
                  </p>
                </>
              )}
            </div>

            <div className="mt-5 xs:space-y-3">
              <h4 className="text-lg font-medium">Description:</h4>
              <p className="text-neutral-400">{Products[2].description}</p>
            </div>
          </div>
          <div className="space-y-5">
            <div className="flex flex-col gap-5 xs:flex-row">
              <Button className="flex-1" variant="outline">
                Add to Cart
              </Button>
              <div className="flex border-2 border-primary/50 p-1 *:h-full *:px-1">
                <button className="transition-colors hover:bg-tertiary">
                  <FaPlus />
                </button>
                <input
                  type="number"
                  name=""
                  className="w-10 flex-1 text-center outline-none"
                  id=""
                  value={1}
                  max="999"
                />
                <button className="transition-colors hover:bg-tertiary">
                  <FaMinus />
                </button>
              </div>
            </div>
            <Button className="w-full">Buy it Now</Button>
          </div>
        </div>
      </section>

      <section className="bg-tertiary py-8 sm:py-10">
        <div className="maximum-width space-y-5 sm:space-y-8">
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            You May Also Like
          </h2>
          <ProductsList loading />
        </div>
      </section>
    </div>
  );
}
