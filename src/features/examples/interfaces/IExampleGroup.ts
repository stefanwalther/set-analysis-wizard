import {IExample} from "./IExample";

export interface IExampleGroup {
  sort: number;
  key: string;
  title: string;
  navTitle: string;
  description?: string;
  exampleGroups?: IExampleGroup[];
  examples?: IExample[];
}
