"use client";

import Button from "@/components/button";
import CartItem from "@/components/cart/cart-item";
import CartItems from "@/data/cart-items";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return;

  return (
    <>
      <title>Cart</title>
      <div className="maximum-width dynamic-hero-height flex flex-col gap-5 *:py-5 lg:flex-row">
        <div className="flex flex-1 flex-col">
          <h2 className="main-heading">My Cart</h2>
          <div className="mt-5 flex-1 overflow-x-auto">
            <table className="dui-table dui-table-lg [&_tr]:border-b-2 [&_tr]:border-secondary/20">
              <thead className="text-lg text-black">
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {CartItems.map((cartItem) => (
                  <CartItem key={cartItem.id} {...cartItem} />
                ))}
              </tbody>
            </table>
          </div>
          <Link href="/menu" className="mt-5 block">
            <Button variant="outline" className="flex items-center gap-2">
              <FaArrowLeft />
              Back to Shop
            </Button>
          </Link>
        </div>
        <div className="mx-auto mb-5 w-full space-y-5 bg-tertiary px-5 sm:w-96 lg:mb-0">
          <div className="flex justify-between text-xl font-medium xs:text-2xl">
            <span>Total</span>
            <span>$15.5</span>
          </div>
          <Link href="/checkout" className="grid">
            <Button>Checkout</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
