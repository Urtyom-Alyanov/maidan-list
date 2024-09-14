"use client";

import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea,
  ScrollBar,
} from "@meduza-bank/ui-kit";
import { Building2Icon, InfoIcon, StarIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { v7 } from "uuid";
import { MaidanCount, MaidanOrganization, MaidanUser } from "../types";

export const MainPage = ({
  count,
  currentView,
  orgs,
  users,
}: {
  count: MaidanCount;
  currentView: "users" | "orgs";
  search?: string;
  users: MaidanUser[];
  orgs: MaidanOrganization[];
}) => {
  return (
    <div className="w-full">
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
      </div>
      <div className="flex gap-2 justify-center mt-3 flex-wrap">
        <Link href={{ query: { view: "users" } }}>
          <Button
            size="sm"
            variant={currentView === "users" ? "outline" : "ghost"}
            className={
              currentView === "users"
                ? "hover:shadow border border-transparent"
                : "shadow hover:bg-background"
            }
          >
            <UserIcon className="mr-2 h-4 w-4" />
            Пользователи{" "}
            <span className="text-muted-foreground ml-2">({count.Users})</span>
          </Button>
        </Link>
        <Link href={{ query: { view: "orgs" } }}>
          <Button
            size="sm"
            variant={currentView === "orgs" ? "outline" : "ghost"}
            className={
              currentView === "orgs"
                ? "hover:shadow border border-transparent"
                : "shadow hover:bg-background"
            }
          >
            <Building2Icon className="mr-2 h-4 w-4" />
            Организации{" "}
            <span className="text-muted-foreground ml-2">
              ({count.Organizations})
            </span>
          </Button>
        </Link>
      </div>
      <div className="flex gap-2 justify-center mt-5 flex-wrap">
        {users.map(user => {
          return (
            <Dialog key={v7()}>
              <DialogTrigger>
                <Card className="w-96 cursor-pointer select-none group h-60 relative overflow-hidden max-w-full">
                  {typeof user.Images !== "string" ? (
                    <img
                      src={user.Images[0] || "https://placehold.co/500"}
                      className="aspect-[6/4] group-hover:blur-sm duration-150 left-0 top-0 object-center w-full object-cover"
                      alt={user.Names.join(", ")}
                    />
                  ) : (
                    <div className="aspect-[6/4] left-0 top-0 w-full flex justify-center items-center">
                      {user.Images}
                    </div>
                  )}
                  <div className="shadow-sm absolute bg-background/70 p-2 rounded-md top-0 left-0 m-2">
                    {Array(user.Rating).fill(<StarIcon className="w-4 h-4" />)}
                  </div>
                  <div className="shadow-sm absolute bg-background/70 p-2 rounded-md bottom-0 left-0 m-2 text-left">
                    <h4>{user.Names[0]}</h4>
                    <p className="text-xs text-muted-foreground">
                      {user.Names.slice(1).join(", ")}
                    </p>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <div className="flex gap-2 flex-col md:flex-row items-center">
                      {user.Names[0]}
                      <div className="inline-flex">
                        {Array(user.Rating).fill(
                          <StarIcon className="w-4 h-4 md:w-5 md:h-5" />
                        )}
                      </div>
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    Преступления: {user.Reasons}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2 mb-2">
                  {user.Names.length > 1 && (
                    <div className="border p-2 rounded-md">
                      <p className="text-xs text-muted-foreground">
                        Также известен как:
                      </p>
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
                      {user.Activity.endsWith("1") &&
                        !user.Activity.startsWith("0") && (
                          <InfoIcon className="h-4 w-4 mr-2" />
                        )}
                    </p>
                  </div>
                  <div className="border p-2 rounded-md">
                    <p className="text-xs text-muted-foreground">
                      Известные фотографии:
                    </p>
                    <div
                      data-vaul-no-drag
                      className="rounded-md overflow-hidden mt-2"
                    >
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
                      <p>
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
                      </p>
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
              </DialogContent>
            </Dialog>
          );
        })}
        {orgs.map(org => {
          return (
            <Dialog key={v7()}>
              <DialogTrigger>
                <Card className="w-96 cursor-pointer select-none group h-24 relative overflow-hidden max-w-full">
                  <div className="shadow-sm flex absolute bg-background/70 p-2 rounded-md top-0 left-0 m-2">
                    {Array(org.Rating).fill(<StarIcon className="w-4 h-4" />)}
                  </div>
                  <div className="shadow-sm absolute bg-background/70 p-2 rounded-md bottom-0 left-0 m-2 text-left">
                    <h4>{org.Names[0]}</h4>
                    <p className="text-xs text-muted-foreground">
                      {org.Names.slice(1).join(", ")}
                    </p>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <div className="flex gap-2 flex-col md:flex-row items-center">
                      {org.Names[0]}
                      <div className="inline-flex">
                        {Array(org.Rating).fill(
                          <StarIcon className="w-4 h-4 md:w-5 md:h-5" />
                        )}
                      </div>
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    Активность: {org.Activity.join(", ")}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </div>
  );
};
