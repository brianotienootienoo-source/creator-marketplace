import { Proposal } from "../proposals/proposalSchema";
import { Opportunity } from "../opportunities/opportunitySchema";

type DB = {
  proposals: Proposal[];
  opportunities: Opportunity[];
};

export const db: DB = {
  proposals: [],
  opportunities: [],
};