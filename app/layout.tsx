import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Westside Soccer Club — Snack Sign-Up",
  description: "Sign up to bring post-game snacks for the Westside Soccer Club 1st grade team.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
