import {
  Button,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  ScrollArea,
  ScrollBar,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@meduza-bank/ui-kit";
import { InfoIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { MaidanUser } from "../types";

export const UserInfoContent = (user: MaidanUser) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <div className="flex gap-2 flex-col md:flex-row items-center">
            {user.Names[0]}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="inline-flex">
                  {Array(user.Rating).fill(
                    <StarIcon className="w-4 h-4 fill-foreground" />
                  )}
                  {Array(5 - user.Rating).fill(
                    <StarIcon className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <span className="text-sm">Рейтинг майданутости</span>
              </TooltipContent>
            </Tooltip>
          </div>
        </DialogTitle>
        <DialogDescription>Преступления: {user.Reasons}</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-2 mb-2">
        {user.Names.length > 1 && (
          <div className="border p-2 rounded-md">
            <p className="text-xs text-muted-foreground">Также известен как:</p>
            <p className="flex gap-2 items-center">
              {user.Names.slice(1).join(", ")}
            </p>
          </div>
        )}
        <div className="border p-2 rounded-md">
          <p className="text-xs text-muted-foreground">Активность:</p>
          <p className="flex gap-2 items-center">
            {user.Activity.startsWith("0")
              ? "Неизвестно"
              : user.Activity.startsWith("1")
              ? "Низкая"
              : user.Activity.startsWith("2")
              ? "Средняя"
              : user.Activity.startsWith("3")
              ? "Высокая"
              : user.Activity.split(":")[1]}
            {user.Activity.endsWith("1") && !user.Activity.startsWith("0") && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 mr-2" />
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-sm">
                    Недостаточно информации для точной оценки
                  </span>
                </TooltipContent>
              </Tooltip>
            )}
          </p>
        </div>
        <div className="border p-2 rounded-md">
          <p className="text-xs text-muted-foreground">Известные фотографии:</p>
          <div data-vaul-no-drag className="rounded-md overflow-hidden mt-2">
            <ScrollArea aria-orientation="horizontal">
              <div className="flex gap-2 rounded-md items-center">
                {typeof user.Images !== "string" &&
                  user.Images.map(src => (
                    <img
                      src={src}
                      className={
                        user.Images.length > 1
                          ? "h-96 min-w-max rounded-md"
                          : "min-h-max w-full rounded-md"
                      }
                      key={src}
                    />
                  ))}
                {user.Images.length === 0 && "Изображений нет"}
                {typeof user.Images === "string" && user.Images}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="border p-2 rounded-md">
            <p className="text-xs text-muted-foreground">
              Принадлежность к организациям:
            </p>
            <div>
              {user.Organizations.map((search, index, arr) => (
                <>
                  <Link href={{ query: { search, view: "orgs" } }}>
                    <Button
                      size="sm"
                      className="text-foreground p-0 h-auto"
                      variant="link"
                    >
                      {search}
                    </Button>
                  </Link>
                  {arr.length - 1 > index && ", "}
                </>
              ))}
            </div>
          </div>
          <Link
            href={{
              query: { view: "orgs", search: user.MainOrganization },
            }}
            className="border hover:bg-secondary p-2 rounded-md"
          >
            <p className="text-xs text-muted-foreground">
              Основная организация:
            </p>
            <p>{user.MainOrganization}</p>
          </Link>
        </div>
      </div>
    </>
  );
};
