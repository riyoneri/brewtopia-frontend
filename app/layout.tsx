import Footer from "@/components/footer";
import classNames from "classnames";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brewtopia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scrollbar-thin scrollbar-track-neutral-200 scrollbar-thumb-primary/50"
    >
      <body
        className={classNames(
          dmSans.className,
          "text-sm sm:text-base leading-none",
        )}
      >
        <main className="min-h-dvh">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
