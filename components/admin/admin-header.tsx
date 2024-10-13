import Notifications from "@/data/notifications";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaCircleUser, FaRegBell } from "react-icons/fa6";
import { IoCloseOutline, IoLogOutOutline } from "react-icons/io5";
import { MdMenu } from "react-icons/md";

export default function AdminHeader({
  openSidebar,
}: {
  openSidebar: () => void;
}) {
  const { data: session } = useSession();
  return (
    <header className="flex items-center justify-between">
      <h3 className="hidden text-4xl font-medium sm:block">Dashboard</h3>
      <div className="flex items-center gap-1 sm:hidden">
        <MdMenu
          onClick={openSidebar}
          className="dui-drawer-button text-2xl text-primary"
        />
        <div className="text-lg font-medium">
          <span>Brew</span>
          <span className="text-primary">Topia</span>
        </div>
      </div>
      <div className="flex items-center gap-3 *:rounded-full *:border *:leading-none">
        <Menu>
          <MenuButton
            as="button"
            className="dui-indicator p-2 data-[open]:bg-tertiary"
          >
            <span className="dui-badge dui-indicator-item dui-badge-xs right-1 top-1 z-0 bg-accent-red"></span>
            <FaRegBell />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="relative z-10 mx-5 mt-2 max-w-full origin-top bg-tertiary p-1 text-sm/6 text-neutral-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] data-[closed]:scale-95 data-[closed]:opacity-0 focus:outline-none sm:mx-0"
          >
            {Notifications.map((notification) => (
              <MenuItem
                key={notification.id}
                as="span"
                className="flex items-center gap-2 px-2 py-1.5 text-neutral-900 transition data-[focus]:bg-primary data-[focus]:text-white"
              >
                <Link href={notification.link} className="line-clamp-2 flex-1">
                  {notification.message}
                </Link>
                <span className="bg-tertiary/20 *:cursor-pointer hover:scale-110">
                  <IoCloseOutline className="text-xl" />
                </span>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>

        <Menu>
          <MenuButton
            as="button"
            className="overflow-hidden data-[open]:bg-tertiary"
          >
            {session?.user.image ? (
              <Image
                src={session.user.image}
                height={50}
                width={50}
                alt={`${session.user.name} Image`}
                className="size-8"
              />
            ) : (
              <FaCircleUser className="size-8 transition" />
            )}
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom end"
            className="mt-2 grid w-40 origin-top-right border border-neutral-800 bg-tertiary p-1 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] data-[closed]:scale-95 data-[closed]:opacity-0 xs:w-52"
          >
            <MenuItem
              as="button"
              onClick={() => signOut({ callbackUrl: "/obsidian/auth/login" })}
              className="flex items-center gap-2 px-2 py-1.5 text-neutral-900 transition data-[focus]:bg-primary data-[focus]:text-white"
            >
              <IoLogOutOutline className="text-lg" />
              Sign Out
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
}
