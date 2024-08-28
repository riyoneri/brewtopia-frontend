import UserNavBar from "@/components/user/user-navbar";

export default function UserRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <UserNavBar />
      {children}
    </main>
  );
}
