import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@meduza-bank/ui-kit";
import { StarIcon } from "lucide-react";
import { MaidanOrganization } from "../types";

export const OrgInfoContent = (org: MaidanOrganization) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <div className="flex gap-2 flex-col md:flex-row items-center">
            {org.Names[0]}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="inline-flex">
                  {Array(org.Rating).fill(
                    <StarIcon className="w-4 h-4 fill-foreground" />
                  )}
                  {Array(5 - org.Rating).fill(
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
        <DialogDescription>
          Активность: {org.Activity.join(", ")}
        </DialogDescription>
        {org.Names.length > 1 && (
          <div className="border p-2 rounded-md">
            <p className="text-xs text-muted-foreground">Также известна как:</p>
            <p className="flex gap-2 items-center">
              {org.Names.slice(1).join(", ")}
            </p>
          </div>
        )}
      </DialogHeader>
    </>
  );
};
