import { type SchemaTypeDefinition } from "sanity";
import { userType } from "./userType";
import { questionType } from "./questionType";
import { answeredTestType } from "./answeredTestType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [userType, questionType, answeredTestType],
};
