"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaCircleUser, FaLocationDot } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { GrDeliver } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { IoCloseOutline, IoNewspaperOutline } from "react-icons/io5";
import { MdEvent, MdMenu, MdOutlineRestaurantMenu } from "react-icons/md";

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
  {
    text: "Events",
    icon: MdEvent,
    url: "/events",
  },
];

const DropDownNavLinks = [
  {
    text: "Orders",
    icon: GrDeliver,
    url: "/orders",
  },
  {
    text: "Address List",
    icon: FaLocationDot,
    url: "/addresses",
  },
  {
    text: "Account Settings",
    icon: IoMdSettings,
    url: "/account",
  },
];

export default function UserNavBar() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAuth] = useState(true);

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
                    "after:w-full": pathname === navLink.url,
                    "after:w-0": pathname !== navLink.url,
                  },
                  "relative hover:after:w-full after:absolute after:bg-primary after:h-1 after:rounded-full after:-bottom-1 after:transition-all after:left-1/2 after:-translate-x-1/2",
                )}
              >
                {navLink.text}
              </Link>
            ))}

            <Link href="/cart">
              <Button>Cart (0)</Button>
            </Link>
            {!isAuth && (
              <Link href="/auth/login">
                <Button variant="outline">Sign In</Button>
              </Link>
            )}
            {isAuth && (
              <Menu>
                <MenuButton className="box-border flex self-stretch border-2 border-primary/50 p-1 data-[open]:bg-primary data-[focus]:outline-1 data-[focus]:outline-white">
                  {({ open }) => (
                    <FaCircleUser
                      className={classNames("text-2xl transition", {
                        "text-primary": !open,
                        "text-white": open,
                      })}
                    />
                  )}
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom end"
                  className="z-50 mt-2 w-52 origin-top space-y-1 bg-primary p-2 text-start text-sm/6 text-white transition duration-100 ease-out *:block *:px-1 *:py-1.5 *:transition data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                  {DropDownNavLinks.map((navLink) => (
                    <MenuItem key={navLink.text}>
                      <Link
                        href={navLink.url}
                        className="data-[focus]:bg-white/30"
                      >
                        {navLink.text}
                      </Link>
                    </MenuItem>
                  ))}

                  <MenuItem>
                    <button className="block w-full bg-accent-red/40 text-start data-[focus]:bg-white/30">
                      Sign Out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </nav>
      <nav className="sticky top-0 z-50 bg-white py-2 shadow-md sm:hidden ">
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
            <div className="flex min-h-full w-5/6 flex-col space-y-1 bg-white py-3 xs:w-80 ">
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
              <Disclosure as="div" className="flex flex-col" defaultOpen={true}>
                <DisclosureButton className="group flex w-full items-center justify-between px-2 py-1 transition data-[open]:bg-tertiary hover:bg-tertiary">
                  <div className="flex items-center gap-3">
                    <FaCircleUser className="text-lg" />
                    <span>Profile</span>
                  </div>
                  <FaChevronDown className="text-lg transition group-data-[open]:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel
                  transition
                  className="origin-top space-y-1 py-2 text-sm/5 duration-200 ease-out data-[closed]:-translate-y-6 data-[open]:bg-tertiary/50 data-[closed]:opacity-0"
                >
                  {DropDownNavLinks.map((navLinks) => (
                    <Link
                      key={navLinks.text}
                      href={navLinks.url}
                      onClick={closeDrawer}
                      className={classNames(
                        "hover:bg-tertiary flex gap-2 py-1 pl-5 items-center transition",
                        {
                          "bg-tertiary": pathname === navLinks.url,
                        },
                      )}
                    >
                      <navLinks.icon className="text-lg" />
                      {navLinks.text}
                    </Link>
                  ))}
                </DisclosurePanel>
              </Disclosure>
              <button className="block w-full bg-accent-red/20 px-2 py-1 text-start transition hover:bg-neutral-200">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
