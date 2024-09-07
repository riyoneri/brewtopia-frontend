"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import classNames from "classnames";
import { SessionProvider } from "next-auth/react";
import { DM_Sans } from "next/font/google";
import { MaterialDesignContent, SnackbarProvider } from "notistack";
import styled from "styled-components";

import "./globals.css";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "#A27B5C",
  },
  "&.notistack-MuiContent-error": {
    backgroundColor: "#F14C35",
  },
}));

const queryClient = new QueryClient();

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
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <SnackbarProvider
              autoHideDuration={3000}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              hideIconVariant
              preventDuplicate
              Components={{
                success: StyledMaterialDesignContent,
                error: StyledMaterialDesignContent,
              }}
            >
              {children}
            </SnackbarProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
