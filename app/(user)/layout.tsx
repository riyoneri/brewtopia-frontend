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
      <div className="min-h-dvh">{children}</div>
      <Footer />
    </main>
  );
}
