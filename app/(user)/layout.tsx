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
      <div className="dynamic-hero-height">{children}</div>
      <Footer />
    </main>
  );
}
