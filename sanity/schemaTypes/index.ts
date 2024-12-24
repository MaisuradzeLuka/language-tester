import { type SchemaTypeDefinition } from "sanity";
import { userType } from "./userType";
import { questionType } from "./questionType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [userType, questionType],
};
