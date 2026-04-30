import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Creator Marketplace",
  description: "Connect creators with brands",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

        {/* Navbar is now separate */}
        <Navbar />

        {children}

      </body>
    </html>
  );
}