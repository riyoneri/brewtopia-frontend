import classNames from "classnames";
import { DM_Sans } from "next/font/google";

import "./globals.css";
import Providers from "./providers";

const dmSans = DM_Sans({ subsets: ["latin"] });

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
