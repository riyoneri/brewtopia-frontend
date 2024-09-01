"use client";

import AdminHeader from "@/components/admin/admin-header";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import classNames from "classnames";
import { AnimatePresence, easeOut, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import { AiOutlineMenuFold, AiOutlineProduct } from "react-icons/ai";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { PiShippingContainerFill } from "react-icons/pi";

const NavLinks = [
  {
    text: "Dashboard",
    icon: BiSolidBarChartAlt2,
    url: "/obsidian",
  },
  {
    text: "Products",
    icon: AiOutlineProduct,
    "sub-menu": [
      {
        text: "Product List",
        url: "/obsidian/products",
      },
      {
        text: "Categories",
        url: "/obsidian/categories",
      },
    ],
  },
  {
    text: "Orders",
    icon: PiShippingContainerFill,
    url: "/obsidian/orders",
  },
  {
    text: "Promotions",
    icon: HiOutlineReceiptPercent,
    url: "/obsidian/promotions",
  },
];

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);
  return (
    <main>
      <main className="dui-drawer h-full sm:dui-drawer-open">
        <input
          checked={sidebarOpen}
          readOnly
          type="checkbox"
          className="dui-drawer-toggle"
        />
        <div className="dui-drawer-content p-5">
          <AdminHeader openSidebar={() => setSidebarOpen(true)} />
          {children}
        </div>
        <div className="dui-drawer-side xs:text-lg">
          <label onClick={closeSidebar} className="dui-drawer-overlay"></label>
          <div className="flex min-h-full w-5/6 flex-col bg-tertiary p-3 xs:w-80">
            <div className="flex items-center justify-between border-b border-b-secondary pb-3">
              <div className="text-lg font-medium">
                <span>Brew</span>
                <span className="text-primary">Topia</span>
              </div>
              <span className="bg-primary/30 p-1 text-primary sm:hidden">
                <AiOutlineMenuFold onClick={closeSidebar} className="text-xl" />
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-1 text-secondary/70">
              {NavLinks.map((navLink) => {
                const Icon = navLink.icon;

                if (!navLink["sub-menu"]) {
                  return (
                    <Link
                      href={navLink.url}
                      key={navLink.text}
                      className={classNames(
                        "flex items-center gap-3 hover:bg-primary py-2 px-3 hover:text-white transition",
                        {
                          "text-white bg-primary": navLink.url === pathname,
                        },
                      )}
                    >
                      <Icon className="text-lg" />
                      {navLink.text}
                    </Link>
                  );
                }

                const subMenu = navLink["sub-menu"].map((subMenu) => (
                  <Link
                    href={subMenu.url}
                    key={subMenu.text}
                    className="group flex items-center gap-3 p-2 transition hover:bg-primary/40"
                  >
                    <span className="size-2 rounded-full bg-primary"></span>
                    {subMenu.text}
                  </Link>
                ));

                return (
                  <Disclosure key={navLink.text} as="div">
                    {({ open }) => (
                      <>
                        <DisclosureButton
                          className={classNames(
                            "group hover:bg-primary py-2 px-3 hover:text-white transition flex w-full items-center justify-between",
                            {
                              "text-white bg-primary": navLink.url === pathname,
                            },
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="text-lg" />
                            {navLink.text}
                          </div>
                          <FaChevronDown className="text-sm transition-transform group-data-[open]:rotate-180" />
                        </DisclosureButton>
                        <AnimatePresence>
                          {open && (
                            <DisclosurePanel as={Fragment}>
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.1, ease: easeOut }}
                                className="grid origin-top pl-4 xs:pl-8"
                              >
                                {subMenu}
                              </motion.div>
                            </DisclosurePanel>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </Disclosure>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}
