import {IExampleItem} from "./IExampleItem";

export interface IExampleList {
  sort: number;
  key: string;
  level: number;
  title: string;
  navTitle: string;
  description?: string;
  items?: IExampleItem[];
}
