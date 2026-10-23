import {ISetAnalysisDefinitionProps} from "../../wizard/interfaces/ISetAnalysisDefinitionProps";

export interface IExampleItem {

  // Sort order within the group, nothing else
  sort: number;

  // A unique key for the example
  key: string;

  // The title of the example, formatted in Html
  formattedTitle: string;

  // The resulting formula
  formattedExpression: string;

  // Some notes about the example
  formattedNotes?: string;

  props: ISetAnalysisDefinitionProps
}
