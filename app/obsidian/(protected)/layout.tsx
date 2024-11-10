"use client";

import AdminHeader from "@/components/admin/admin-header";
import AuthLoading from "@/components/auth-loading";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import classNames from "classnames";
import { AnimatePresence, easeOut, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { Fragment, useEffect, useState } from "react";
import { AiOutlineMenuFold, AiOutlineProduct } from "react-icons/ai";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { FaGear, FaUsers } from "react-icons/fa6";
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
        url: "/obsidian/products/categories",
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
  {
    text: "Customers",
    icon: FaUsers,
    url: "/obsidian/customers",
  },
  {
    text: "Settings",
    icon: FaGear,
    url: "/obsidian/settings",
  },
];

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status, data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const redirectUrl = pathname === "/obsidian" ? "" : `?redirect=${pathname}`;

  useEffect(() => {
    if (
      status === "unauthenticated" ||
      (session && session.user.role !== "admin")
    ) {
      enqueueSnackbar("Login first", { variant: "error", key: "login" });

      router.replace(`/obsidian/auth/login${redirectUrl}`);
    }
  }, [status, router, session, redirectUrl]);

  // useEffect(() => {
  //   if (session) connectSocketServer(session?.user.token, session?.user.role);
  // }, [session]);

  if (status === "loading") return <AuthLoading />;

  if (
    status === "unauthenticated" ||
    (session && session.user.role !== "admin")
  ) {
    signOut({ redirect: false });
    return;
  }

  const closeSidebar = () => setSidebarOpen(false);
  return (
    <main className="dui-drawer mx-auto h-full max-w-screen-2xl sm:dui-drawer-open">
      <input
        checked={sidebarOpen}
        readOnly
        type="checkbox"
        className="dui-drawer-toggle"
      />
      <div className="dui-drawer-content flex min-h-dvh flex-col gap-5 p-5">
        <AdminHeader openSidebar={() => setSidebarOpen(true)} />
        <div className="flex-1 *:h-full">{children}</div>
      </div>
      <div className="dui-drawer-side z-20 sm:text-lg">
        <label onClick={closeSidebar} className="dui-drawer-overlay"></label>
        <div className="relative flex min-h-full w-5/6 flex-col bg-white p-3 xs:w-80 sm:bg-tertiary">
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
                        "text-white bg-primary":
                          navLink.url === pathname ||
                          pathname.includes(navLink.text.toLowerCase()),
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
                  className={classNames(
                    "group flex items-center gap-3 p-2 transition hover:bg-primary/40",
                    {
                      "bg-primary/40": subMenu.url === pathname,
                    },
                  )}
                >
                  <span className="size-2 rounded-full bg-primary"></span>
                  {subMenu.text}
                </Link>
              ));

              return (
                <Disclosure
                  key={navLink.text}
                  as="div"
                  className="space-y-1 *:space-y-1"
                >
                  {({ open }) => (
                    <>
                      <DisclosureButton
                        className={classNames(
                          "group hover:bg-primary py-2 px-3 hover:text-white transition flex w-full items-center justify-between",
                          {
                            "text-white bg-primary": pathname.includes(
                              navLink.text.toLowerCase(),
                            ),
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
  );
}
