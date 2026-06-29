import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://orabthic.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
