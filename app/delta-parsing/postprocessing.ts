import {
  MaidanOrganization,
  MaidanOrganizationPropNameType,
  MaidanUser,
  MaidanUserPropNameType,
} from "../types";
import { prepareText, removeSuffix } from "./prepare-text";

const activityEnum: Record<string, number> = {
  высокая: 3,
  высока: 3,
  средняя: 2,
  низкая: 1,
  "?": 0,
  "(?)": 0,
};

export function postProcessingUser(
  data: Record<MaidanUserPropNameType, string | number | string[]>[]
): MaidanUser[] {
  const postData = data.map(val => {
    const question = val.Activity.toString().includes("?") ? 1 : 0;
    const activeStatus =
      activityEnum[
        val.Activity.toString().toLowerCase().split(" ")[0].trim()
      ] || 4;
    return {
      ...val,
      Activity: val.Activity
        ? `${activeStatus}${question}${
            activeStatus === 4 ? `:${val.Activity.toString()}` : ""
          }`
        : "01",
      Names: val.Names
        ? val.Names?.toString()
            .split(";")
            .map(val =>
              val
                .split(",")
                .map(val => val.split("(").join(","))
                .join(",")
            )
            .join(",")
            .split(",")
            .map(val => removeSuffix(prepareText(val), ")"))
        : [],
      Organizations: val.Organizations
        ? val.Organizations.toString()
            .split(";")
            .map(val =>
              val
                .split(",")
                .map(val => val.split("(").join(","))
                .join(",")
            )
            .join(",")
            .split(",")
            .map(val => removeSuffix(prepareText(val), ")"))
        : [],
      Rating:
        parseInt(val.Rating?.toString() || "1") > 5
          ? 5
          : parseInt(val.Rating?.toString() || "1") < 1
          ? 1
          : (parseInt(val.Rating?.toString() || "1") as 1 | 2 | 3 | 4 | 5),
      Reasons: val.Reasons ? val.Reasons.toString() : "",
      Images:
        typeof val.Images === "number"
          ? []
          : typeof val.Images === "string"
          ? val.Images === " " ||
            val.Images === "&nbsp;" ||
            val.Images === "NOT_INFO"
            ? []
            : val.Images
          : val.Images || [],
      MainOrganization: val.MainOrganization?.toString() || "",
    };
  });

  return postData;
}

export function postProcessingOrg(
  data: Record<MaidanOrganizationPropNameType, string | number | string[]>[]
): MaidanOrganization[] {
  return data.map(val => {
    return {
      ...val,
      Names: val.Names
        ? val.Names.toString()
            .split(";")
            .map(val =>
              val
                .split(",")
                .map(val => val.split("(").join(","))
                .join(",")
            )
            .join(",")
            .split(",")
            .map(val => removeSuffix(prepareText(val), ")"))
        : [],
      Rating:
        parseInt(val.Rating?.toString() || "1") > 5
          ? 5
          : parseInt(val.Rating?.toString() || "1") < 1
          ? 1
          : (parseInt(val.Rating?.toString() || "1") as 1 | 2 | 3 | 4 | 5),
      Activity: val.Activity
        ? val.Activity.toString()
            .split(";")
            .map(val => val.split(",").join(","))
            .join(",")
            .split(",")
            .map(val => prepareText(val))
        : [],
      MainOrganization: undefined,
    };
  });
}
