"use server";

import { promises as fs } from "fs";
import path from "path";
import {
  MaidanOrganization,
  MaidanOrganizationPropNames,
  MaidanUser,
  MaidanUserPropNames,
} from "../types";
import { getDataFromDeltaStreaming } from "./get-data";
import { getPropertyNames } from "./get-property-names";
import { getTableDataOrg, getTableDataUser } from "./get-table-data";
import { getTablesFromDocument } from "./get-tables";
import { postProcessingOrg, postProcessingUser } from "./postprocessing";
import { structureData } from "./structure-data";

export async function getAndParseData(): Promise<
  readonly [MaidanUser[], MaidanOrganization[]]
> {
  try {
    const doc = await getDataFromDeltaStreaming();

    const [orgTable, userTable] = getTablesFromDocument(doc);

    const userPropNames = getPropertyNames(userTable, MaidanUserPropNames);
    const orgPropNames = getPropertyNames(
      orgTable,
      MaidanOrganizationPropNames
    );

    const userPropData = getTableDataUser(userTable);
    const orgPropData = getTableDataOrg(orgTable);

    const userRawData = structureData(userPropData, userPropNames);
    const orgRawData = structureData(orgPropData, orgPropNames);

    const orgs = postProcessingOrg(orgRawData);
    const users = postProcessingUser(userRawData);

    return [users, orgs] as const;
  } catch (error) {
    const orgs: MaidanOrganization[] = JSON.parse(
      await fs.readFile(path.join(process.cwd(), "/app/orgs.json"), "utf-8")
    );
    const users: MaidanUser[] = JSON.parse(
      await fs.readFile(path.join(process.cwd(), "/app/users.json"), "utf-8")
    );

    return [users, orgs] as const;
  }
}
