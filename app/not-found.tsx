"use client";

import { Button, PageBlock } from "@meduza-bank/ui-kit";
import { Frown, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-96 mx-auto max-w-full">
      <PageBlock className="relative overflow-hidden">
        <div className="flex items-center justify-center mt-3">
          <SearchX className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-bold">Не найдено</h1>
        </div>
        <p className="mt-5 p-2 text-sm">
          Приносим свои глубочайшие извинения, но на этой странице нет ==НИХУЯ==
        </p>
        <div className="flex mt-5 items-center gap-2 justify-center">
          <Link href={"/"}>
            <Button variant={"outline"}>Вернуться на главную</Button>
          </Link>
        </div>
        <Frown className="absolute opacity-25 -bottom-6 -right-6 w-24 h-24" />
      </PageBlock>
    </div>
  );
}
