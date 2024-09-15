import {
  Card,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@meduza-bank/ui-kit";
import { StarIcon } from "lucide-react";
import { MaidanUser } from "../types";
import { UserInfoContent } from "./userInfoDialog";

export const UserCard = (user: MaidanUser) => {
  return (
    <Card className="sm:w-96 w-full cursor-pointer select-none group h-60 relative overflow-hidden max-w-full">
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
        {Array(user.Rating).fill(
          <StarIcon className="w-4 h-4 fill-foreground" />
        )}
        {Array(5 - user.Rating).fill(
          <StarIcon className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
      <div className="shadow-sm absolute bg-background/70 p-2 rounded-md bottom-0 left-0 m-2 text-left">
        <h4>{user.Names[0]}</h4>
        <p className="text-xs text-muted-foreground">
          {user.Names.slice(1).join(", ")}
        </p>
      </div>
    </Card>
  );
};

export const UserDialog = (user: MaidanUser) => {
  return (
    <Dialog>
      <DialogTrigger>
        <UserCard {...user} />
      </DialogTrigger>
      <DialogContent>
        <UserInfoContent {...user} />
      </DialogContent>
    </Dialog>
  );
};
