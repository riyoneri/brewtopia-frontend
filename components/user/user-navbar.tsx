"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GoHome } from "react-icons/go";
import { IoCloseOutline, IoNewspaperOutline } from "react-icons/io5";
import { MdMenu, MdOutlineRestaurantMenu } from "react-icons/md";

import Button from "../button";

const NavLinks = [
  {
    text: "Home",
    icon: GoHome,
    url: "/",
  },
  {
    text: "Menu",
    icon: MdOutlineRestaurantMenu,
    url: "/menu",
  },
  {
    text: "News",
    icon: IoNewspaperOutline,
    url: "/news",
  },
];

export default function UserNavBar() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <nav className="sticky top-0 z-50 hidden bg-white py-2 shadow-md sm:block">
        <div className="maximum-width flex items-center justify-between">
          <Link href="/" className="text-lg font-medium">
            <span>Brew</span>
            <span className="text-primary">Topia</span>
          </Link>
          <div className="flex items-center gap-4">
            {NavLinks.map((navLink) => (
              <Link
                key={navLink.text}
                href={navLink.url}
                className={classNames(
                  {
                    "after:block": pathname === navLink.url,
                    "after:hidden": pathname !== navLink.url,
                  },
                  "relative hover:after:block after:absolute after:bg-primary after:h-1 after:rounded-full after:-bottom-1 after:w-full after:left-1/2 after:-translate-x-1/2",
                )}
              >
                {navLink.text}
              </Link>
            ))}

            <Link href="/news">
              <Button>Cart (0)</Button>
            </Link>
            <Link href="/news">
              <Button variant="outline">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>
      <nav className="sticky top-0 bg-white py-2 shadow-md sm:hidden ">
        <div className="dui-drawer dui-drawer-end">
          <input
            id="my-drawer"
            type="checkbox"
            checked={isDrawerOpen}
            readOnly
            className="dui-drawer-toggle"
          />
          <div className="dui-drawer-content">
            <div className="flex items-center justify-between px-5">
              <Link href="/" className="text-lg font-medium">
                <span>Brew</span>
                <span className="text-primary">Topia</span>
              </Link>
              <MdMenu
                onClick={() => setIsDrawerOpen(true)}
                className="dui-drawer-button text-right text-2xl text-primary"
              />
            </div>
          </div>
          <div className="dui-drawer-side">
            <div onClick={closeDrawer} className="dui-drawer-overlay"></div>
            <div className="flex min-h-full w-5/6 flex-col bg-white py-3 xs:w-80 ">
              <div className="flex items-center justify-between border-b px-2 pb-1">
                <div className="font-medium">
                  <span>Brew</span>
                  <span className="text-primary">Topia</span>
                </div>
                <IoCloseOutline
                  className="cursor-pointer text-xl"
                  onClick={closeDrawer}
                />
              </div>
              <div className="flex flex-col gap-0.5 py-0.5 *:flex *:items-center *:gap-3 *:px-2 *:py-1">
                {NavLinks.map(({ icon: NavIcon, ...navLink }) => (
                  <Link
                    key={navLink.text}
                    href={navLink.url}
                    onClick={closeDrawer}
                    className={classNames("hover:bg-tertiary transition", {
                      "bg-tertiary": pathname === navLink.url,
                    })}
                  >
                    <NavIcon className="text-lg" />
                    {navLink.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
