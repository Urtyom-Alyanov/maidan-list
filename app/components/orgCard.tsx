import {
  Card,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@meduza-bank/ui-kit";
import { StarIcon } from "lucide-react";
import { MaidanOrganization } from "../types";
import { OrgInfoContent } from "./orgInfoDialog";

export const OrgCard = (org: MaidanOrganization) => {
  return (
    <Card className="sm:w-96 w-full cursor-pointer select-none group h-24 relative overflow-hidden max-w-full">
      <div className="shadow-sm flex absolute bg-background/70 p-2 rounded-md top-0 left-0 m-2">
        {Array(org.Rating).fill(
          <StarIcon className="w-4 h-4 fill-foreground" />
        )}
        {Array(5 - org.Rating).fill(
          <StarIcon className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
      <div className="shadow-sm absolute bg-background/70 p-2 rounded-md bottom-0 left-0 m-2 text-left">
        <h4>{org.Names[0]}</h4>
        <p className="text-xs text-muted-foreground">
          {org.Names.slice(1).join(", ")}
        </p>
      </div>
    </Card>
  );
};

export const OrgDialog = (org: MaidanOrganization) => {
  return (
    <Dialog>
      <DialogTrigger>
        <OrgCard {...org} />
      </DialogTrigger>
      <DialogContent>
        <OrgInfoContent {...org} />
      </DialogContent>
    </Dialog>
  );
};
