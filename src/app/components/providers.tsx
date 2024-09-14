"use client";
import { TooltipProvider } from "@meduza-bank/ui-kit";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <TooltipProvider delayDuration={300}>{children}</TooltipProvider>;
};
