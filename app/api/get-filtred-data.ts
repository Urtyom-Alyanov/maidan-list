import { MaidanOrganization, MaidanUser } from "../types";

export interface UserFilter {
  search?: string;
  rating?: string;
  activity?: string;
}

export function UserFilter(
  filterData: UserFilter
): (val: MaidanUser) => boolean {
  return (val: MaidanUser) => {
    let activityFilter = false;
    (filterData?.activity || "4x_3x_2x_1x_0x").split("_").forEach(act => {
      const activ = val.Activity.split(":")[0];
      if (!activityFilter)
        activityFilter = activ.startsWith(act.replaceAll("x", ""));
      return;
    });

    const ratingFilter = (filterData?.rating || "12345")
      .split("")
      .includes(val.Rating.toString());

    const search = filterData.search || "";
    const searchFilter =
      val.MainOrganization.toLowerCase().includes(search.toLowerCase()) ||
      val.Organizations.join(", ")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      val.Names.join(", ").toLowerCase().includes(search.toLowerCase()) ||
      val.Reasons.toLowerCase().includes(search.toLowerCase());

    return !!(searchFilter && ratingFilter && activityFilter);
  };
}

export interface OrgFilter {
  search?: string;
  rating?: string;
  activity?: string;
}

export function OrgFilter(
  filterData: OrgFilter
): (val: MaidanOrganization) => boolean {
  return (val: MaidanOrganization) => {
    const activity = filterData.activity || "";
    const rating = filterData.activity || "12345";

    const activityFilter = val.Activity.some(val => val.includes(activity));
    const ratingFilter = rating.split("").includes(val.Rating.toString());

    const search = filterData.search || "";
    const searchFilter = val.Names.join(", ")
      .toLowerCase()
      .includes(search.toLowerCase());

    return !!(searchFilter && ratingFilter && activityFilter);
  };
}
