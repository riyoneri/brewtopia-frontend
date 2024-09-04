"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import classNames from "classnames";
import { DM_Sans } from "next/font/google";

import "./globals.css";

const queryClient = new QueryClient();

const dmSans = DM_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
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
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </body>
      </html>
    </QueryClientProvider>
  );
}
