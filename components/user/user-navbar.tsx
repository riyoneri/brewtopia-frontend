"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Button from "../button";

export default function UserNavBar() {
  const pathname = usePathname();
  return (
    <>
      <nav className="sticky top-0 py-2">
        <div className="maximum-width flex items-center justify-between">
          <Link href="/" className="text-lg font-medium">
            <span>Brew</span>
            <span className="text-primary">Topia</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className={classNames(
                {
                  "after:block": pathname === "/",
                  "after:hidden": pathname !== "/",
                },
                "relative hover:after:block after:absolute after:bg-primary after:h-1 after:rounded-full after:-bottom-1 after:w-full after:left-1/2 after:-translate-x-1/2",
              )}
            >
              Home
            </Link>
            <Link
              href="/menu"
              className={classNames(
                {
                  "after:block": pathname === "/menu",
                  "after:hidden": pathname === "/menu",
                },
                "relative after:hidden hover:after:block after:absolute after:bg-primary after:h-1 after:rounded-full after:-bottom-1 after:w-full after:left-1/2 after:-translate-x-1/2",
              )}
            >
              Menu
            </Link>
            <Link
              href="/news"
              className={classNames(
                {
                  "after:block": pathname === "/news",
                  "after:hidden": pathname === "/news",
                },
                "relative after:hidden hover:after:block after:absolute after:bg-primary after:h-1 after:rounded-full after:-bottom-1 after:w-full after:left-1/2 after:-translate-x-1/2",
              )}
            >
              News
            </Link>
            <Link href="/news">
              <Button>Cart (0)</Button>
            </Link>
            <Link href="/news">
              <Button variant="outline">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
