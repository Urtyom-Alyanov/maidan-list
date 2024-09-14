"use client";
import { Header, Layout, ScrollArea } from "@meduza-bank/ui-kit";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import icon from "../icon-maidan.svg";

export const LayoutComponent: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { setTheme, forcedTheme } = useTheme();
  const { push } = useRouter();

  return (
    <div className="ms-min-h-[100vh] ms-bg-background" vaul-drawer-wrapper="">
      <ScrollArea className="as-w-screen as-h-screen">
        <div className="as-max-w-[100vw] as-max-h-[100vh] as-px-2.5">
          <Header
            homePage={() => push("/")}
            logo={{
              superscriptLogo: "maidan",
              logoSrc: icon.src,
            }}
            search={text => push(`/?search=${text}`)}
            themeSwitch={forcedTheme ? undefined : theme => setTheme(theme)}
          />
          <Layout>
            {children}
            {/* <Toaster /> */}
          </Layout>
        </div>
      </ScrollArea>
    </div>
  );
};
