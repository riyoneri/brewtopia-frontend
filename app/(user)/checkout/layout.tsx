"use client";

import CheckoutItem from "@/components/checkout/checkout-item";
import CartItems from "@/data/cart-items";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <div className="maximum-width dynamic-hero-height flex flex-col *:py-5 lg:flex-row lg:gap-5">
      <div className="flex-1 space-y-5">
        <h2 className="main-heading">Checkout</h2>
        <div className="dui-breadcrumbs text-neutral-400">
          <ul>
            <li
              className={classNames({
                "text-neutral-950": pathname === "/checkout",
              })}
            >
              <Link href="/checkout">Checkout</Link>
            </li>
            <li
              className={classNames({
                "text-neutral-950": pathname === "/checkout/payment",
              })}
            >
              <Link href="/checkout/payment">Payment</Link>
            </li>
          </ul>
        </div>
        {children}
      </div>
      <div className="mb-5 w-full space-y-3 bg-tertiary px-5 xs:space-y-5 lg:mb-0 lg:w-96">
        <h3 className="text-xl xs:text-3xl">Order Items</h3>
        <div className="space-y-3">
          {CartItems.map((cartItem) => (
            <CheckoutItem key={cartItem.id} {...cartItem} />
          ))}
        </div>
        <div className="flex justify-between text-lg font-medium xs:text-2xl">
          <span>Total</span>
          <span>$15.5</span>
        </div>
      </div>
    </div>
  );
}
