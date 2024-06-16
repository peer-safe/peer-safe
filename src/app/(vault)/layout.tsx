import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Providers from "~/components/Providers";
import { headers } from "next/headers";
import { Toaster } from "~/components/ui/sonner";

export const metadata = {
  title: "Peersafe",
  description: "Secure decentralized file storage from the future.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = headers().get("cookie");

  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <Providers cookie={cookie}>
            <Toaster />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
