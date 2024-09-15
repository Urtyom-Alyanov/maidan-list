import { Button } from "@meduza-bank/ui-kit";
import { Building2Icon, UserIcon } from "lucide-react";
import Link from "next/link";
import { MaidanCount } from "../types";

export const MainPageHeader = ({
  count,
  view,
}: {
  view: "users" | "orgs";
  count: MaidanCount;
}) => {
  return (
    <>
      <div>
        <h1 className="text-center max-w-[500px] mx-auto text-xl font-semibold font-vksans">
          <p>
            Официальный список лиц, принимавших участие в деятельности, так или
            иначе направленной на дискредитацию Еремея Ульянова
          </p>
          <p>(Майдан-список)</p>
        </h1>
        <p className="text-center text-sm font-semibold text-muted-foreground font-vksans">
          Редакция от 13 сентября 2024 года
        </p>
        <p className="text-center text-sm font-semibold text-muted-foreground font-vksans">
          <Button variant="link" asChild size="sm">
            <a
              href="https://delta-streaming.neocities.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground"
            >
              Все данные взяты с https://delta-streaming.neocities.org/
            </a>
          </Button>
        </p>
      </div>
      <div className="flex gap-2 justify-center mt-3 flex-wrap">
        <Link href={{ query: { view: "users" } }}>
          <Button
            size="sm"
            variant={view !== "users" ? "outline" : "ghost"}
            className={
              view !== "users"
                ? "hover:shadow border border-transparent"
                : "shadow border border-border hover:bg-background"
            }
          >
            <UserIcon className="mr-2 h-4 w-4" />
            Пользователи
            <span className="text-muted-foreground ml-2">({count.Users})</span>
          </Button>
        </Link>
        <Link href={{ query: { view: "orgs" } }}>
          <Button
            size="sm"
            variant={view !== "orgs" ? "outline" : "ghost"}
            className={
              view !== "orgs"
                ? "hover:shadow border border-transparent"
                : "shadow border border-border hover:bg-background"
            }
          >
            <Building2Icon className="mr-2 h-4 w-4" />
            Организации
            <span className="text-muted-foreground ml-2">
              ({count.Organizations})
            </span>
          </Button>
        </Link>
      </div>
    </>
  );
};
