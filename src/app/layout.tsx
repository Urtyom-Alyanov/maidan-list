import icon from "@/app/icon-maidan.svg";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { LayoutComponent } from "./components/layoutComp";
import { Providers } from "./components/providers";

import "@meduza-bank/ui-kit/sf-ui-stylesheet.css";
import "@meduza-bank/ui-kit/src-style.css";
import "@meduza-bank/ui-kit/style.css";
import "@meduza-bank/ui-kit/vk-sans-stylesheet.css";

export const metadata: Metadata = {
  title: "Список майдана | НБМ Maidan",
  description: "Стилизованный список майдана под НБМ",
  icons: icon.src,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="ru">
      <body className={`antialiased`}>
        <ThemeProvider
          enableColorScheme={false}
          enableSystem
          attribute="data-mode"
          themes={["light", "dark"]}
        >
          <Providers>
            <LayoutComponent>{children}</LayoutComponent>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
