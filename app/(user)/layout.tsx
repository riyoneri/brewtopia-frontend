import Footer from "@/components/footer";
import UserNavBar from "@/components/user/user-navbar";

export default function UserRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <UserNavBar />
      <main className="min-h-dvh">{children}</main>
      <Footer />
    </main>
  );
}
