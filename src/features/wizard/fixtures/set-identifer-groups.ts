import {ISetIdentifierGroup} from "../interfaces/ISetIdentiferGroup";

export const SetIdentifierGroups: ISetIdentifierGroup[] = [
  {
    label: "Standard Sets",
    items: [
      {
        key: "$",
        label: "the current selection"
      },
      {
        key: "1",
        label: "all values"
      },
      {
        key: "1-$",
        label: "everything that the current selection excludes"
      }
    ]
  },
  {
    label: "Set Based on Previous/Next Selections",
    items: [
      {
        key: "$1",
        label: "the previous selection"
      },
      {
        key: "$_1",
        label: "the next selection"
      }
    ]
  }
]