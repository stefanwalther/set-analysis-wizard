export interface IExample {
  // Sort order within the group, nothing else
  sort: number;

  // A unique key for the example
  key: string;

  // The title of the example, formatted in Html
  formattedTitle: string;

  // The resulting formula
  expression: string;
}
